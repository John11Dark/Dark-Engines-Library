"use strict";
// ? * --> custom dependencies
import Client from "./client.js";
import Notify from "./Notify.js";
const Formatter = new Intl.NumberFormat(undefined, {
  currency: "EUR",
  style: "currency",
});

// ? * --> DOM Elements
const booksContainers = document.querySelectorAll(".booksContainer");
const template = document.querySelector("#template");
const searchBars = document.querySelectorAll(".searchBarForm");
const searchInputs = document.querySelectorAll(".searchBarInput");
const mainContent = document.querySelector("#mainContentSection");
const query = document.querySelector("#query");

// ? * --> Variables
const booksQuery = [];

// ? * --> Functions

function showResult(query) {}

async function setupContainer(container, template, searchQuery, searchList) {
  searchQuery = searchQuery || "new books";
  const books = await Client.getBooks(searchQuery);
  if (books === null || books.length === 0) showResult(null);

  books.forEach((book) => {
    // * --> extract the data
    const { image, title, subtitle, price, url, isbn13 } = book;

    // * --> card element
    const card = template.content.cloneNode(true).children[0];
    card.style = `background-image: url(${image});`;

    // * --> Image
    const frontCover = card.querySelector(".frontCover");
    frontCover.src = image;

    // * Title
    const titleElement = card.querySelector(".bookTitle");
    titleElement.textContent = title;

    // * Subtitle
    const subtitleElement = card.querySelector(".bookSubtitle");
    if (subtitle === "" || subtitle == null) {
      subtitleElement.textContent =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, nam?";
    } else {
      subtitleElement.textContent = subtitle;
    }

    // * --> Price

    const priceLabel = card.querySelector(".Price");
    priceLabel.textContent = Formatter.format(parseFloat(price.slice(1)));

    //
    const linkLabel = card.querySelector(".linkDirectory");
    linkLabel.href = url;
    linkLabel.setAttribute("title", `view book on \n"${url}"`);

    //
    const ISBN_Element = card.querySelector("#ISBN");
    ISBN_Element.setAttribute("ISBN", isbn13);
    ISBN_Element.addEventListener("click", (e) => {
      Notify.copyToClipboard(ISBN_Element, "ISBN");
    });

    // * --> Cart button
    const cartElement = card.querySelector("#cart");
    const cartIcon = cartElement.querySelector("use");
    cartElement.addEventListener("click", (e) => {
      const element = e.target.parentElement;
      const isAddedToCart = element.getAttribute("isAddedToCart");
      if (isAddedToCart === "false") {
        element.setAttribute("isAddedToCart", true);
        Notify.customAlert(title, "cart", true);
        cartIcon.setAttribute("xlink:href", "#CART-BOOK-ICON-ADDED");
      } else if (isAddedToCart === "true") {
        element.setAttribute("isAddedToCart", false);
        Notify.customAlert(title, "cart", true, true);
        cartIcon.setAttribute("xlink:href", "#CART-BOOK-ICON");
      }
    });

    //  * -->  Favorite button
    const favoriteElement = card.querySelector(".Favorite");
    favoriteElement.addEventListener("click", (e) => {
      const element = e.target.parentElement;
      const isFavorite = element.getAttribute("isFavorite");
      if (isFavorite === "false") {
        element.setAttribute("isFavorite", true);
        Notify.customAlert(title, "favorite", true);
      } else if (isFavorite === "true") {
        element.setAttribute("isFavorite", false);
        Notify.customAlert(title, "favorite", true, true);
      }
    });

    container.append(card);
    searchList.push({
      title,
      subtitle,
      element: card,
    });
  });
}

// ? * --> setup document

booksContainers.forEach((container) => {
  const searchQuery = container.getAttribute("searchQuery");
  console.log(searchQuery);
  setupContainer(container, template, searchQuery, booksQuery);
});

// ? * --> Event Listeners

//  * --> Submit
searchBars.forEach((searchBar) => {
  searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    mainContent.scrollIntoView();
  });
});

// * -->  Input
searchInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();
    if (value === "" || value == null || value === " ")
      query.textContent = "new books";
    query.textContent = value;
    booksQuery.forEach((book) => {
      const isVisible =
        book.title.toLowerCase().includes(value) ||
        book.subtitle.toLowerCase().includes(value);
      book.element.classList.toggle("hide", !isVisible);
    });
  });
});
