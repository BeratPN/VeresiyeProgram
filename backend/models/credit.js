import mongoose from "mongoose";

const creditSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offlineStorage: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

const Credit = mongoose.model("Credit", creditSchema);

export default Credit;
