const registerNewCustomerBtn = document.getElementById(
  "registerNewCustomerBtn"
);

registerNewCustomerBtn.addEventListener("click", function () {
  const getRegisterCustomerName = document
    .getElementById("registerNewCustomerInput")
    .value.toUpperCase();

  fetch("http://localhost:3000/findCustomerName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: getRegisterCustomerName }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (Array.isArray(data) && data.length > 0) {
        Swal.fire({
          title: "Hata!",
          text: "Bu Müşteri Zaten Kayıtlı.",
          icon: "error",
          confirmButtonText: "Tamam",
        });
      } else {
        fetch("http://localhost:3000/saveNewCredit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: getRegisterCustomerName,
            inputPrice: 0,
            comment: "Müşteri Kayıt",
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not ok: " + response.statusText
              );
            }
          })
          .then(function () {
            Swal.fire({
              title: "Başarılı!",
              text: "Bu Müşteri kayıt edildi.",
              icon: "success",
              confirmButtonText: "Tamam",
            }).then((result) => {
              document.getElementById("registerNewCustomerInput").value = "";
              if (result.isConfirmed) {
                window.location = "./VeresiyeGiris.html";
              }
            });
          })
          .catch((error) => {
            console.error("Hata:", error);
          });
      }
    })
    .catch((err) => {
      console.error("Hata:", err);
    });
  console.log(getRegisterCustomerName);
});
