const customerNameInput = document.getElementById("customerNameInput");

const customerNameContent = document.getElementById(
  "dropdown-menuCustomerNameContent"
);
customerNameInput.addEventListener("input", function (e) {
  const customerNameInputValue =
    document.getElementById("customerNameInput").value;
  console.log("değişti");
  customerNameContent.innerHTML = "";
  fetch("http://localhost:3000/getCreditsSpecial", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: customerNameInputValue }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }

      return response.json();
    })
    .then((newdata) => {
      console.log(newdata);
      customerListWrapper.innerHTML = "";
      newdata.map((item) => {
        const span = document.createElement("span");
        span.id = "customerNameSpan";
        span.setAttribute("data-value", item);
        span.textContent = item;
        span.className = "px-2 customerNameSpan";
        span.onclick = function () {
          const hiddenInput =
            document.getElementById("customerDropdownHiddenInput") || null;

          const customerTextName = this.textContent;
          hiddenInput ? (hiddenInput.value = customerTextName) : null;
          document.getElementById("customerDropdownBtn").textContent =
            customerTextName;
          document.getElementById("customerDropdownBtn").value =
            customerTextName;
        };
        customerListWrapper.appendChild(span);
      });
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
});
