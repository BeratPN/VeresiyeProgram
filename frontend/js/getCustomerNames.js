const customerDropdownContent = document.getElementById(
  "dropdown-menuCustomerNameContent"
);

const customerSearchInput = document.getElementById("customerNameInput");
const customerDropdownBtn = document.getElementById("customerDropdownBtn");
const customerListWrapper = document.getElementById(
  "dropdown-menuCustomerNameContent"
);

window.addEventListener("load", function () {
  fetch("http://localhost:3000/getCredits", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      customerListWrapper.innerHTML = "";
      data.map((item) => {
        const span = document.createElement("span");
        span.id = "customerNameSpan";
        span.setAttribute("data-value", item);
        span.textContent = item;
        span.className = "px-2 customerNameSpan";
        span.onclick = function () {
          const customerTextName = this.textContent;
          document.getElementById("customerDropdownBtn").textContent =
            customerTextName;
          document.getElementById("customerDropdownBtn").value =
            customerTextName;
        };

        customerListWrapper.appendChild(span);
      });
      console.log(data);
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
});

customerNameInput.addEventListener("change", function () {
  customerListWrapper.innerHTML = "";
});
