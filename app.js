"use strict";

const container = document.querySelector(".container");
const form = document.querySelector("form");
const btn = document.querySelector("button");
const tableContainer = document.querySelector(".table__container");
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

const tableTemplate = `
<table
class="table table-hover mx-5 my-5 table-bordered d-none table-striped table-dark"
>
<thead class="thead-dark">
  <tr>
    <th>Product's name</th>
    <th>Qty</th>
    <th>Price</th>
    <th>Discount</th>
    <th>VAT</th>
    <th>Total</th>
  </tr>
</thead>
<template id="table__content">
  <tbody>
    <tr class="table__row">
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</template>
<tfoot>
  <tr>
    <td colspan="5">Subtotal</td>
    <td class="subtotal"></td>
  </tr>
  <tr>
    <td colspan="5">VAT</td>
    <td class="totalVAT"></td>
  </tr>
  <tr>
    <td colspan="5">Total</td>
    <td class="total"></td>
  </tr>
</tfoot>
</table>`;

const array = [];
const correctInputs = () => {
  return (
    (nameInput.value.length > 0 &&
      Number(qtyInput.value) > 0 &&
      Number(priceInput.value) > 0 &&
      Number(VATInput.value) === 8) ||
    Number(VATInput.value) === 18
  );
};
const populateArr = () => {
  if (correctInputs()) {
    array.push({
      name: nameInput.value,
      qty: Number(qtyInput.value),
      price: Number(priceInput.value),
      VAT: Number(VATInput.value),
      discount: Number(discountInput.value),
    });
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  populateArr();
  if (correctInputs()) {
    document.querySelector(".alert").classList.add("d-none");
    table.classList.remove("d-none");
    console.log("All conditions have been met");

    const sample = document.querySelector("#table__content");
    const user = sample.content.cloneNode(true);
    const TDS = user.querySelectorAll(".table__row > td");
    const totalVATs = [];
    const totalSubTotals = [];
    array.forEach((el) => {
      TDS[0].textContent = el.name;
      TDS[1].textContent = el.qty;
      TDS[2].textContent = el.price;
      TDS[3].textContent = el.discount;
      TDS[4].textContent = `${el.VAT}%`;
      if (priceInput.value < 500) {
        if (!discountInput.value) {
          const price = (el.qty * el.price).toFixed(2);
          const VAT = (price * (el.VAT / 100)).toFixed(2);
          const pricePlusVAT = (Number(price) + Number(VAT)).toFixed(2);
          TDS[5].textContent = `${price} + ${VAT} = ${pricePlusVAT}€`;
          totalSubTotals.push(Number(price));
          totalVATs.push(Number(VAT));
        } else {
          const price = (el.qty * (el.price - el.discount)).toFixed(2);
          const VAT = (price * (el.vat / 100)).toFixed(2);
          const pricePlusVAT = (Number(price) + Number(VAT)).toFixed(2);
          TDS[5].textContent = `${price} + ${VAT} = ${pricePlusVAT}€`;
          totalSubTotals.push(Number(price));
          totalVATs.push(Number(VAT));
        }
        sample.parentNode.append(user);
        console.log(array);
        console.log(totalVATs);
        console.log(totalSubTotals);
        const totalPrice = [...totalVATs, ...totalSubTotals];
        console.log(totalPrice);
        subTotal.textContent = `${totalSubTotals
          .reduce((acc, el) => acc + el)
          .toFixed(2)}  €`;
        totalVAT.textContent = `${totalVATs
          .reduce((acc, el) => acc + el)
          .toFixed(2)} €`;
        total.textContent = `${totalPrice
          .reduce((acc, el) => acc + el)
          .toFixed(2)} €`;
      } else {
        const newTable = document.createElement("table");
        newTable.classList.add(
          "table",
          "table-hover",
          "table-bordered",
          "mx-5",
          "my-5",
          "table-dark",
          "table-striped"
        );
        newTable.innerHTML = tableTemplate;
        newTable.append(user);
        tableContainer.append(newTable);
        TDS[0].textContent = el.name;
        TDS[1].textContent = el.qty;
        TDS[2].textContent = el.price;
        TDS[3].textContent = el.discount;
        TDS[4].textContent = `${el.VAT}%`;

        if (!discountInput.value) {
          const price = (el.qty * el.price).toFixed(2);
          const VAT = (price * (el.VAT / 100)).toFixed(2);
          const pricePlusVAT = (Number(price) + Number(VAT)).toFixed(2);
          TDS[5].textContent = `${price} + ${VAT} = ${pricePlusVAT}€`;
          totalSubTotals.push(Number(price));
          totalVATs.push(Number(VAT));
        } else {
          const price = (el.qty * (el.price - el.discount)).toFixed(2);
          const VAT = (price * (el.vat / 100)).toFixed(2);
          const pricePlusVAT = (Number(price) + Number(VAT)).toFixed(2);
          TDS[5].textContent = `${price} + ${VAT} = ${pricePlusVAT}€`;
          totalSubTotals.push(Number(price));
          totalVATs.push(Number(VAT));
        }
        const totalPrice = [...totalVATs, ...totalSubTotals];
        newTable.querySelector(".subtotal").textContent = `${totalSubTotals
          .reduce((acc, el) => acc + el)
          .toFixed(2)}  €`;
        newTable.querySelector(".totalVAT").textContent = `${totalVATs
          .reduce((acc, el) => acc + el)
          .toFixed(2)} €`;
        newTable.querySelector(".total").textContent = `${totalPrice
          .reduce((acc, el) => acc + el)
          .toFixed(2)} €`;
      }
    });
  }
});
