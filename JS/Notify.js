"use strict";
// const template = document.createElement("template");
// template.innerHTML = `
// <style>

// </style>

// <section id="notify-card" class="notify-card" aria-label="notification card">

// </section>

// `;

// class Notify extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" });
//     this.shadowRoot.appendChild(template.content.cloneNode(true));
//   }
// }

// window.customElements.define("Notify", Notify);

const notifications = [];

function copyToClipboard(object, Attribute) {
  const textContent = object.getAttribute(Attribute);
  navigator.clipboard.writeText(textContent);
  customAlert(textContent, "ClipBoard");
}

function removeAlertCard(object, duration = 1500) {
  // object.addEventListener("pointerover", (e) => {
  //   console.log(e);
  // });
  object.style = `animation: slideOut 1s ease-out both`;
  setTimeout(() => {
    object.remove();
  }, duration);
  notifications.shift();
}

function customAlert(
  itemName,
  objectName,
  requireLink = false,
  itemRemoved = false
) {
  const alertCardParent = document.querySelector(".notificationCenter");
  const alertCard = document.querySelector(".alertCard").content.cloneNode(true)
    .children[0];
  const textLabel = alertCard.querySelector(".text");
  const link = alertCard.querySelector(".customAlertLink");
  const alertCloseBtn = alertCard.querySelector(".closeBtn");

  if (requireLink) {
    link.textContent = `View ${objectName} list`;
    link.href = `/pages/user#${objectName}`;
    link.title = `go to list ${objectName} page`;
  } else {
    link.setAttribute("notVisible", "true");
  }
  if (!itemRemoved) {
    textLabel.textContent = `${itemName} has been added successfully! \n to ${objectName} list`;
  } else {
    textLabel.textContent = `${itemName} has been removed successfully! \n from ${objectName} list`;
  }

  alertCardParent.appendChild(alertCard);
  setTimeout(() => {
    removeAlertCard(alertCard);
  }, 3000);

  alertCloseBtn.addEventListener("pointerdown", (e) => {
    const notificationCard = e.target.parentElement;
    removeAlertCard(notificationCard);
  });
}

export default { copyToClipboard, customAlert, removeAlertCard };
