document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const customerName = document.getElementById("customerDropdownBtn").value;
  const selectedDate = document.getElementById("selectDate").value;
  const inputPrice = document.getElementById("numberInput").value;
  const comment = document.getElementById("creditComment").value;
  if (customerName !== "" && selectedDate !== "" && inputPrice !== "") {
    fetch("http://localhost:3000/saveNewCredit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName,
        selectedDate,
        inputPrice,
        comment,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        document.getElementById("customerDropdownBtn").value = "";
        document.getElementById("selectDate").value = "";
        document.getElementById("numberInput").value = "";
        document.getElementById("creditComment").value = "";
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          title: "Başarılı!",
          text: "Kayıt başarıyla eklendi.",
          icon: "success",
          confirmButtonText: "Tamam",
        }).then((result) => {
          if (result.isConfirmed) {
            // Butona basıldığında yönlendirme işlemi
            window.location.href = "./AnaSayfa.html";
          }
        });
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  } else {
    Swal.fire({
      title: "Hata!",
      text: "Kırmızıyla işaretli alanları lütfen doldurunuz.",
      icon: "error",
      confirmButtonText: "Tamam",
    });
  }
});
