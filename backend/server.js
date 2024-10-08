import * as dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import fs from "fs";
import { data } from "./data.js";
import isOnline from "is-online";
import mongoose from "mongoose";
import Credit from "./models/credit.js";
import cors from "cors";

const app = express();
const port = 3000;

//! MiddleWare
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let previousNetworkStatus = null; // Başlangıçta boş
const checkNetworkStatus = async () => {
  const currentNetworkStatus = await isOnline(); // Ağ durumunu kontrol et
  // Durum değişikliği varsa işlem yap
  if (currentNetworkStatus !== previousNetworkStatus) {
    if (currentNetworkStatus) {
      console.log("Online Mode");
    } else {
      console.log("Offline Mode");
    }
    // Ağ durumunu güncelle
    previousNetworkStatus = currentNetworkStatus;
  }
};
setInterval(async () => {
  await checkNetworkStatus();
}, 10000);

//! Find CustomerName
app.post("/findCustomerName", async (req, res) => {
  const { word } = req.body;

  // word'ü büyük harfe dönüştür
  const upperWord = word.toUpperCase();

  // Müşteri isimleri içinde word ile eşleşenleri bul
  const uniqueCustomerNames = [
    ...new Set(
      data
        .filter((item) => item.customerName.toUpperCase() === upperWord)
        .map((item) => item.customerName)
    ),
  ];

  // Sonuçları json olarak döndür
  res.status(200).json(uniqueCustomerNames);
});

//! Get Special Credits
app.post("/getCreditsSpecial", async (req, res) => {
  const { word } = req.body;

  const uniqueCustomerNames = [
    ...new Set(
      data
        .filter((item) =>
          item.customerName.toUpperCase().startsWith(word.toUpperCase())
        )
        .map((item) => item.customerName)
    ),
  ];

  // Sonuçları json olarak döndür
  res.status(200).json(uniqueCustomerNames);
});

//! Get All Credits
app.get("/getCredits", async (req, res) => {
  const uniqueCustomerNames = [
    ...new Set(data.map((item) => item.customerName)),
  ];
  res.json(uniqueCustomerNames);
});

//! New Credit Save
app.post("/saveNewCredit", async (req, res) => {
  const { customerName, selectedDate, inputPrice, comment } = req.body;

  const newData = new Credit({
    customerName: customerName.toUpperCase(),
    date: selectedDate ? selectedDate : Date.now(),
    price: inputPrice,
    type: "Veresiye",
    comment: comment ? comment : "",
  });

  //! Internet Status Check
  const networkStatus = (await isOnline()) ? true : false;

  if (networkStatus === true) {
    newData.offlineStorage = 0;

    await newData.save();
    res.status(201).json({
      message: "Yeni Veresiye Sunucuya Başarıyla Kaydedildi ",
      newData,
    });
    console.log("sunucuya kaydolundu");
  } else if (networkStatus === false) {
    newData.offlineStorage = 1;
    res.status(404).json({
      message: "Yeni Veresiye Sunucuya Kaydedilemedi",
      newData,
    });
    console.log("sunucuya kaydolunamadı");
  }

  // Yeni veriyi data dizisine ekleyin
  data.push(newData);

  // data.js dosyasını güncelleyin
  const updatedData = `const data = ${JSON.stringify(
    data,
    null,
    2
  )};\n\nexport { data };`;

  await fs.writeFile("./data.js", updatedData, (err) => {
    if (err) throw err;
    console.log("Data saved!");
  });
});

const start = async () => {
  if (!process.env.MONGO_URL) throw new Error("MONGO_URL is required!");
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    throw new Error("Database error!" + err);
  }
  app.listen(port, () => console.log("server is up and running on port 3000"));
};

start();
