"use strict";

import { setupContainer } from "./books.js";

// ? * -->  DOM Elements
const carousel = document.querySelector("#heroCarousel");

const carouselControllers = document.querySelectorAll(".carouselControllers");
const main = document.querySelector("main");

const contentControllers = document.querySelectorAll(".ControllersBtns");

// ? * --> Functions
function toggleTopic(section, status, disable) {
  disableControllers(carouselControllers, disable);
  main.setAttribute("isContentObserving", status);
  section.setAttribute("isExpanded", status);
}

function disableControllers(buttonsList, disable) {
  if (disable) {
    carousel.setAttribute("data-bs-interval", false);
    carousel.removeAttribute("data-bs-ride");
    buttonsList.forEach((button) => {
      button.setAttribute("disabled", disable);
    });
  } else {
    carousel.setAttribute("data-bs-ride", "carousel");
    buttonsList.forEach((button) => {
      button.removeAttribute("disabled");
    });
  }
}

// ? * --> Event Listeners

//  * --> Click
contentControllers.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    const btnStatus = button.getAttribute("isToggled");
    const section = document.querySelector(button.getAttribute("target"));
    //  * --> books template DOM
    const bookTemplate = document.querySelector("#template");
    const booksContainer = section.querySelector("[books-Container]");
    const sectionTopic = section.getAttribute("topic");
    const buttonLabel = button.querySelector("[button-label]");
    if (btnStatus === "false") {
      // ! extract method to address network performance...
      setupContainer(booksContainer, bookTemplate, sectionTopic, [
        "empty-list",
      ]);
      button.setAttribute("isToggled", true);
      buttonLabel.innerText = "Close";
      toggleTopic(section, true, true);
    } else if (btnStatus === "true") {
      button.setAttribute("isToggled", false);
      buttonLabel.innerText = "Learn More";
      toggleTopic(section, false, false);
    }
  });
});
