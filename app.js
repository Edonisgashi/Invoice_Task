"use strict";

const form = document.querySelector("form");
const tableContainer = document.querySelector(".table__container");
const table = document.querySelector("table");
const tBody = document.querySelector("tbody");
const tFoot = document.querySelector("tfoot");
const subTotal = document.querySelector(".subtotal");
const totalVAT = document.querySelector(".totalVAT");
const allPrices = document.querySelector(".total");
const nameInput = document.querySelector("#name");
const qtyInput = document.querySelector("#qty");
const VATInput = document.querySelector("#VAT");
const priceInput = document.querySelector("#price");
const discountInput = document.querySelector("#discount");

const correctInputs = () => {
  return (
    (nameInput.value.length > 0 &&
      Number(qtyInput.value) > 0 &&
      Number(priceInput.value) > 0 &&
      Number(VATInput.value) === 8) ||
    Number(VATInput.value) === 18
  );
};
const populateArr = (arr) => {
  if (correctInputs()) {
    arr.push({
      name: nameInput.value,
      qty: Number(qtyInput.value),
      price: Number(priceInput.value),
      VAT: Number(VATInput.value),
      discount: Number(discountInput.value),
    });
  }
};
const array = [];
const updateTable = (arr) => {
  const VATArray = [];
  const priceArray = [];
  const pricePlusVAT = [];
  if (correctInputs()) {
    const newTR = document.createElement("tr");
    const firstTD = document.createElement("td");
    const secondTD = document.createElement("td");
    const thirdTD = document.createElement("td");
    const fourthTD = document.createElement("td");
    const fifthTD = document.createElement("td");
    const sixthTD = document.createElement("td");
    arr.forEach((el) => {
      firstTD.textContent = el.name;
      secondTD.textContent = el.qty;
      thirdTD.textContent = el.price;
      fourthTD.textContent = el.discount;
      fifthTD.textContent = el.VAT;
      if (!el.discount) {
        const price = el.price * el.qty;
        const correctVAT = (price / 100) * el.VAT;
        sixthTD.textContent = `${price} + ${correctVAT} = ${
          price + correctVAT
        }`;
        priceArray.push(price);
        VATArray.push(correctVAT);
        pricePlusVAT.push(correctVAT, price);
        console.log(priceArray);
        console.log(VATArray);
        console.log(pricePlusVAT);
      } else {
        const price = (el.price - el.discount) * el.qty;
        const correctVAT = (price / 100) * el.VAT;
        sixthTD.textContent = `${price} + ${correctVAT} = ${
          price + correctVAT
        }`;
        priceArray.push(price);
        VATArray.push(correctVAT);
        pricePlusVAT.push(correctVAT, price);
        console.log(priceArray);
        console.log(VATArray);
        console.log(pricePlusVAT);
      }
      newTR.append(firstTD, secondTD, thirdTD, fourthTD, fifthTD, sixthTD);
      tBody.append(newTR);
    });
    const totalSubtotal = priceArray.reduce((acc, el) => acc + el);
    const totalVATs = VATArray.reduce((acc, el) => acc + el);
    const total = pricePlusVAT.reduce((acc, el) => acc + el);
    subTotal.textContent = totalSubtotal.toFixed(2);
    totalVAT.textContent = totalVATs.toFixed(2);
    allPrices.textContent = total.toFixed(2);
  }
};
const newArr = [];
const createTable = (arr) => {
  const VATArray = [];
  const priceArray = [];
  const pricePlusVAT = [];
  console.log("A new table was created");
  const tableTemplate = `
<table>
<thead>
  <tr>
    <th>Product's name</th>
    <th>Qty</th>
    <th>Price</th>
    <th>Discount</th>
    <th>VAT</th>
    <th>Total</th>
  </tr>
</thead>
 <tbody>
 <tr>
 <td></td>
 <td></td>
 <td></td>
 <td></td>
 <td></td>
 <td></td>
</tr>
  </tbody>
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
  const newTable = document.createElement("table");
  newTable.innerHTML = tableTemplate;
  newTable.classList.add(
    "table",
    "table-hover",
    "mx-5",
    "my-5",
    "table-bordered",
    "table-striped"
  );
  const [...tableCells] = newTable.querySelectorAll("tbody > tr > td");
  console.log(tableCells);
  arr.forEach((el) => {
    tableCells[0].textContent = el.name;
    tableCells[1].textContent = el.qty;
    tableCells[2].textContent = el.price;
    tableCells[3].textContent = el.discount;
    tableCells[4].textContent = el.VAT;
    if (!el.discount) {
      const price = el.price * el.qty;
      const correctVAT = Number(((price / 100) * el.VAT).toFixed(2));
      tableCells[5].textContent = `${price} + ${correctVAT} = ${
        price + correctVAT
      }`;
      priceArray.push(price);
      VATArray.push(correctVAT);
      pricePlusVAT.push(correctVAT, price);
      console.log(price);
      console.log(VATArray);
      console.log(pricePlusVAT);
    } else {
      const price = (el.price - el.discount) * el.qty;
      const correctVAT = Number(((price / 100) * el.VAT).toFixed(2));
      tableCells[5].textContent = `${price} + ${correctVAT} = ${
        price + correctVAT
      }`;
      priceArray.push(price);
      VATArray.push(correctVAT);
      pricePlusVAT.push(correctVAT, price);
      console.log(price);
      console.log(VATArray);
      console.log(pricePlusVAT);
    }
  });
  const subTotal = newTable.querySelector(".subtotal");
  const VATs = newTable.querySelector(".totalVAT");
  const priceTotal = newTable.querySelector(".total");
  subTotal.textContent = priceArray.reduce((acc, el) => acc + el);
  VATs.textContent = VATArray.reduce((acc, el) => acc + el);
  priceTotal.textContent = pricePlusVAT.reduce((acc, el) => acc + el);
  tableContainer.append(newTable);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (correctInputs()) {
    document.querySelector(".alert").classList.add("d-none");
    table.classList.remove("d-none");
    if (Number(priceInput.value) >= 500) {
      populateArr(newArr);
      createTable(newArr);
    } else {
      populateArr(array);
      updateTable(array);
    }
  } else {
    document.querySelector(".alert").classList.remove("d-none");
  }
});
