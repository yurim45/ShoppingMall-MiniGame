"use strict";

// Fetch the items from the JSON file 🎈
// JSON파일 업로드
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      ${item.gender}, ${item.size} size
    </li>
  `;
}

function onBtnClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  console.log(filtered);
  displayItems(filtered);
}

function setEventListeners(items) {
  const logo = document.querySelector(".navbar__logo");
  const btn = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  btn.addEventListener("click", (event) => onBtnClick(event, items));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
