document.addEventListener("DOMContentLoaded", () => {
  const calculateButton = document.getElementById("calculate");
  const amountInput = document.getElementById("amount");
  const fromCurrency = document.getElementById("from");
  const toCurrency = document.getElementById("to");
  const output = document.getElementById("output");

  calculateButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    const url = `https://v6.exchangerate-api.com/v6/814385ebe55498d47ded4e4f/latest/${from}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const rate = data.conversion_rates[to];
        if (rate) {
          const converted = (amount * rate).toFixed(2);
          output.textContent = `${amount} ${from} = ${converted} ${to}`;
          output.style.display = "block";
        } else {
          alert("Conversion rate not found");
        }
      })
      .catch((error) => {
        alert("Error fetching exchange rates");
        console.error(error);
      });
  });
});
