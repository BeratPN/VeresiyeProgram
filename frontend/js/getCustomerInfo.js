const getCustomerBtn = document.getElementById("getCustomerInformationBtn");

getCustomerBtn.addEventListener("click", function () {
  const customerName = document.getElementById("customerDropdownBtn").innerText;
  if (customerName !== "Müşteri Seçiniz") {
    console.log("tıklandı: " + customerName);
    fetch("http://localhost:3000/getSingleCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: customerName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }

        return response.json();
      })
      .then((customerData) => {
        console.log(customerData);

        const tableBody = document.getElementById("ControlContent");
        tableBody.innerHTML = "";

        customerData.forEach((item, index) => {
          // Yeni bir <tr> oluştur
          const row = document.createElement("tr");

          // Sıra numarası için <th> oluştur
          const th = document.createElement("th");
          th.setAttribute("scope", "row");
          th.innerHTML = index + 1; // Sıra numarası
          row.appendChild(th);

          // Müşteri ismi için <td> oluştur
          const tdName = document.createElement("td");
          tdName.innerHTML = customerData[index].customerName;
          row.appendChild(tdName);

          // Type için <td> oluştur
          const tdType = document.createElement("td");
          tdType.innerHTML = customerData[index].type;
          row.appendChild(tdType);

          // Tarih için <td> oluştur
          const tdDate = document.createElement("td");
          tdDate.innerHTML = customerData[index].date;
          row.appendChild(tdDate);

          // Miktar için <td> oluştur
          const tdPrice = document.createElement("td");
          tdPrice.innerHTML = customerData[index].price;
          row.appendChild(tdPrice);

          // Açıklama için <td> oluştur
          const tdComment = document.createElement("td");
          tdComment.className = "d-flex flex-wrap";
          tdComment.innerHTML = customerData[index].comment;
          row.appendChild(tdComment);

          // Aksiyonlar (düzenleme/silme) için <td> oluştur
          const tdActions = document.createElement("td");
          tdActions.innerHTML = `
              <i class="bi bi-pen-fill"></i>
              <i class="bi bi-x-circle"></i>
            `;
          row.appendChild(tdActions);

          // <tr> elementini tabloya ekle
          tableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }
});
