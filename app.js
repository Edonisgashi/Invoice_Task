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
const allPrices = document.querySelector(".total");
const nameInput = document.querySelector("#name");
const qtyInput = document.querySelector("#qty");
const VATInput = document.querySelector("#VAT");
const priceInput = document.querySelector("#price");
const discountInput = document.querySelector("#discount");

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

const updateTable = (arr) => {
  if (correctInputs()) {
    const allVATs = [];
    const totalPrice = [];
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
        totalPrice.push(price);
        allVATs.push(correctVAT);
        console.log(totalPrice);
        console.log(allVATs);
      } else {
        const price = (el.price - el.discount) * el.qty;
        const correctVAT = (price / 100) * el.VAT;
        sixthTD.textContent = `${price} + ${correctVAT} = ${
          price + correctVAT
        }`;
        totalPrice.push(price);
        allVATs.push(correctVAT);
        console.log(totalPrice);
        console.log(totalVAT);
      }
      newTR.append(firstTD, secondTD, thirdTD, fourthTD, fifthTD, sixthTD);
      tBody.append(newTR);
    });
    const totalPriceVAT = [...totalPrice, ...allVATs];
    console.log(totalPriceVAT);
    const totalSubtotal = totalPrice.reduce((acc, el) => acc + el);
    const totalVATs = allVATs.reduce((acc, el) => acc + el);
    const total = totalPriceVAT.reduce((acc, el) => acc + el);
    subTotal.textContent = totalSubtotal.toFixed(2);
    totalVAT.textContent = totalVATs.toFixed(2);
    allPrices.textContent = total.toFixed(2);
  }
};
const newArr = [];
const createTable = (arr) => {
  const allVATs = [];
  const totalPrice = [];
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
      totalPrice.push(price);
      allVATs.push(correctVAT);
      console.log(totalPrice);
      console.log(allVATs);
    } else {
      const price = (el.price - el.discount) * el.qty;
      const correctVAT = Number(((price / 100) * el.VAT).toFixed(2));
      tableCells[5].textContent = `${price} + ${correctVAT} = ${
        price + correctVAT
      }`;
      totalPrice.push(price);
      allVATs.push(correctVAT);
      console.log(totalPrice);
      console.log(allVATs);
    }
  });
  const subTotal = newTable.querySelector(".subtotal");
  const VATs = newTable.querySelector(".totalVAT");
  const priceTotal = newTable.querySelector(".total");
  subTotal.textContent = totalPrice.reduce((acc, el) => acc + el);
  VATs.textContent = allVATs.reduce((acc, el) => acc + el);
  priceTotal.textContent = [...totalPrice, ...allVATs].reduce(
    (acc, el) => acc + el
  );
  const tBody = newTable.querySelector("tbody");
  tableContainer.append(newTable);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (correctInputs()) {
    document.querySelector(".alert").classList.add("d-none");
    table.classList.remove("d-none");
    if (Number(priceInput.value) < 500) {
      populateArr(array);
      updateTable(array);
    } else {
      populateArr(newArr);
      createTable(newArr);
    }
  }
});
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   populateArr();
//   if (correctInputs()) {
//     document.querySelector(".alert").classList.add("d-none");
//     table.classList.remove("d-none");
//     console.log("All conditions have been met");

//     const sample = document.querySelector("#table__content");
//     const user = sample.content.cloneNode(true);
//     const TDS = user.querySelectorAll(".table__row > td");
//     const totalVATs = [];
//     const totalSubTotals = [];
//     if (priceInput.value < 500) {
//       array.forEach((el) => {
//         TDS[0].textContent = el.name;
//         TDS[1].textContent = el.qty;
//         TDS[2].textContent = el.price;
//         TDS[3].textContent = el.discount;
//         TDS[4].textContent = `${el.VAT}%`;

//         if (!discountInput.value) {
//           const price = (el.qty * el.price).toFixed(2);
//           const VAT = (price * (el.VAT / 100)).toFixed(2);
//           const pricePlusVAT = (Number(price) + Number(VAT)).toFixed(2);
//           TDS[5].textContent = `${price} + ${VAT} = ${pricePlusVAT}€`;
//           totalSubTotals.push(Number(price));
//           totalVATs.push(Number(VAT));
//         } else {
//           const price = (el.qty * (el.price - el.discount)).toFixed(2);
//           const VAT = (price * (el.vat / 100)).toFixed(2);
//           const pricePlusVAT = (Number(price) + Number(VAT)).toFixed(2);
//           TDS[5].textContent = `${price} + ${VAT} = ${pricePlusVAT}€`;
//           totalSubTotals.push(Number(price));
//           totalVATs.push(Number(VAT));
//         }
//         sample.parentNode.append(user);
//         console.log(array);
//         console.log(totalVATs);
//         console.log(totalSubTotals);
//         const totalPrice = [...totalVATs, ...totalSubTotals];
//         console.log(totalPrice);
//         subTotal.textContent = `${totalSubTotals
//           .reduce((acc, el) => acc + el)
//           .toFixed(2)}  €`;
//         totalVAT.textContent = `${totalVATs
//           .reduce((acc, el) => acc + el)
//           .toFixed(2)} €`;
//         total.textContent = `${totalPrice
//           .reduce((acc, el) => acc + el)
//           .toFixed(2)} €`;
//       });
//     } else {
//       const newTable = document.createElement("table");
//       newTable.classList.add(
//         "table",
//         "table-hover",
//         "table-bordered",
//         "mx-5",
//         "my-5",
//         "table-striped"
//       );
//       newTable.innerHTML = tableTemplate;
//       newTable.append(user);
//       tableContainer.append(newTable);
//       TDS[0].textContent = el.name;
//       TDS[1].textContent = el.qty;
//       TDS[2].textContent = el.price;
//       TDS[3].textContent = el.discount;
//       TDS[4].textContent = `${el.VAT}%`;

//       if (!discountInput.value) {
//         const price = (el.qty * el.price).toFixed(2);
//         const VAT = (price * (el.VAT / 100)).toFixed(2);
//         const pricePlusVAT = (Number(price) + Number(VAT)).toFixed(2);
//         TDS[5].textContent = `${price} + ${VAT} = ${pricePlusVAT}€`;
//         totalSubTotals.push(Number(price));
//         totalVATs.push(Number(VAT));
//       } else {
//         const price = (el.qty * (el.price - el.discount)).toFixed(2);
//         const VAT = (price * (el.vat / 100)).toFixed(2);
//         const pricePlusVAT = (Number(price) + Number(VAT)).toFixed(2);
//         TDS[5].textContent = `${price} + ${VAT} = ${pricePlusVAT}€`;
//         totalSubTotals.push(Number(price));
//         totalVATs.push(Number(VAT));
//       }
//       const totalPrice = [...totalVATs, ...totalSubTotals];
//       newTable.querySelector(".subtotal").textContent = `${totalSubTotals
//         .reduce((acc, el) => acc + el)
//         .toFixed(2)}  €`;
//       newTable.querySelector(".totalVAT").textContent = `${totalVATs
//         .reduce((acc, el) => acc + el)
//         .toFixed(2)} €`;
//       newTable.querySelector(".total").textContent = `${totalPrice
//         .reduce((acc, el) => acc + el)
//         .toFixed(2)} €`;
//     }

//     // if (`${totalPrice.reduce((acc, el) => acc + el).toFixed(2)}` >= 500) {

//     // }
//   }
// });
