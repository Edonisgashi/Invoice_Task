"use strict";

const container = document.querySelector(".container");
const form = document.querySelector("form");
const btn = document.querySelector("button");
const table = document.querySelector("table");
const tBody = document.querySelector("tbody");
const tFoot = document.querySelector("tfoot");
const subTotal = document.querySelector(".subtotal");
const totalVAT = document.querySelector(".totalVAT");
const total = document.querySelector(".total");
const nameInput = document.querySelector("#name");
const qtyInput = document.querySelector("#qty");
const VATInput = document.querySelector("#VAT");
const priceInput = document.querySelector("#price");
const discountInput = document.querySelector("#discount");

const array = [];
const VATarr = [];

const correctInputs = () => {
  return (
    (nameInput.value.length > 0 &&
      Number(qtyInput.value) > 0 &&
      Number(priceInput.value) > 0 &&
      Number(VATInput.value) === 8) ||
    Number(VATInput.value) === 18
  );
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (correctInputs()) {
    console.log("All conditions have been met");
    const newTR = document.createElement("tr");
    const firstTR = document.createElement("td");
    const secondTR = document.createElement("td");
    const thirdTR = document.createElement("td");
    const fourthTR = document.createElement("td");
    const fifthTR = document.createElement("td");
    const sixthTR = document.createElement("td");
    firstTR.textContent = nameInput.value;
    secondTR.textContent = qtyInput.value;
    thirdTR.textContent = priceInput.value;
    fourthTR.textContent = discountInput.value;
    fifthTR.textContent = `${VATInput.value}%`;

    if (!Number(discountInput.value)) {
      const price = (qtyInput.value * priceInput.value).toFixed(2);
      const VAT = (price * (VATInput.value / 100)).toFixed(2);
      const pricePlusVAT = (Number(price) + Number(VAT)).toFixed(2);
      sixthTR.textContent = `${price} + ${VAT} = ${pricePlusVAT}`;
      array.push(Number(price));
      VATarr.push(Number(VAT));
      console.log(array);
      console.log(VATarr);
    } else {
      const price = (
        qtyInput.value *
        (priceInput.value - Number(discountInput.value))
      ).toFixed(2);
      const VAT = (price * (VATInput.value / 100)).toFixed(2);
      const pricePlusVAT = (Number(price) + Number(VAT)).toFixed(2);
      sixthTR.textContent = `${price} + ${VAT} = ${pricePlusVAT}`;
      array.push(Number(price));
      VATarr.push(Number(VAT));
      console.log(array);
      console.log(VATarr);
    }
    table.classList.remove("d-none");
    newTR.append(firstTR, secondTR, thirdTR, fourthTR, fifthTR, sixthTR);
    tBody.append(newTR);
    const totalArr = [...array, ...VATarr];
    tFoot.classList.remove("d-none");
    subTotal.textContent = array.reduce((acc, el) => acc + el).toFixed(2);
    totalVAT.textContent = VATarr.reduce((acc, el) => acc + el).toFixed(2);
    total.textContent = totalArr.reduce((acc, el) => acc + el).toFixed(2);
  }
});
