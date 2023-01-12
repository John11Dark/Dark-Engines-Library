"use strict";

import Validation from "./Validation.js";
import Auth from "./auth.js";
import Client from "./client.js";
import routes from "./routes.js";

// ? * --> DOM Elements

// user

const userName = "John Muller";
const usernameLabels = document.querySelectorAll("[userName]");
const userAvatar = document.querySelector(".userAvatar");
const userAvatarURL = "/Assets/userAvatar.png";

const header = document.querySelector("header");
const dropDownMenu = document.querySelector("dropDownMenu");
const logo = document.querySelector(".Logo");
const logos = document.querySelectorAll(".Logo");
const themeSwitch = document.querySelector(".switchMode");
const themeIcon = document.querySelector("#themeIconLink");
const navLinks = document.querySelectorAll(".pageLink");
const navButton = document.querySelector("#navButton");
const menu = document.querySelector(".mainNav");
const loginButton = document.querySelector("#loginButton");
const loginForm = document.querySelector("#loginForm");
const ColorSchemeMetaTag = document.querySelector("meta[name=color-scheme]");
const redirectButtons = document.querySelectorAll("button[href]");
const inputFields = document.querySelectorAll("input");
const linksAuth = document.querySelectorAll("[isAuthenticated]");
const heroSection = document.querySelector("#heroSection");

const contactForm = document.querySelector("#contactForm");
const countryCodeSelectOptions = document.querySelector(
  "#countriesCodeOptions"
);
const countryCodeInputOptions = document.querySelector("#countriesCode");

// ? * --> Variables
const userModePreference = window.matchMedia("(prefers-color-scheme: Dark)");
const platform = navigator.platform;
const today = new Date();
const observerConfig = { rootMargin: "0px 0px 0px 0px" };
const root = document.documentElement;
const navigationHight = header.offsetHeight;
const THEME = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : userModePreference.matches
  ? "dark"
  : "light";

// ? * --> Instance

const headerObserver = new IntersectionObserver((entries, headerObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting)
      return header.setAttribute("isInteracting", false);

    header.setAttribute("isInteracting", true);
  });
}, observerConfig);

// ? * --> Functions

function formVisibility(form) {
  form.reset();
  const visible = form.getAttribute("visible");
  if (visible === "false") {
    form.setAttribute("visible", true);
    form.setAttribute("aria-hidden", false);
    () => ins.focus();
  } else if (visible === "true") {
    form.setAttribute("aria-hidden", true);
    form.setAttribute("visible", false);
  }
}

// ? * --> Theme

function setTheme(theme) {
  // the web app will be set to user defaults mode using Html and css and or local storage if the user has visited the site before
  const currentTheme = theme ?? themeSwitch.getAttribute("currentMode");
  const root = document.documentElement;
  if (currentTheme === "dark") {
    root.style.setProperty("--primaryColorDark", "#fffeff");
    root.style.setProperty("--primaryCardColor", "#e2efffa2");
    root.style.setProperty("--primaryColorLight", "#181414");
    root.style.setProperty("--backgroundColor", "#d9e9f1");
    root.style.setProperty("--customBackgroundColorDarkMode", "#cbd9df");
    document.style = `color-scheme: light dark; transition: all 1s ease-in-out;`;
    document.body.style = `color-scheme: light dark; transition: all 1s ease-in-out;`;
    themeIcon.setAttribute("xlink:href", "#LIGHT-MODE-ICON");
    logos.forEach((logo) => {
      logo.src = `/Assets/DarkEnginesLibraryLogoDark.png`;
    });
  } else if (currentTheme === "light") {
    root.style.setProperty("--primaryColorDark", "#181414");
    root.style.setProperty("--primaryCardColor", "#23282ea2");
    root.style.setProperty("--primaryColorLight", "#fffeff");
    root.style.setProperty("--backgroundColor", "#1d2325");
    root.style.setProperty("--customBackgroundColorDarkMode", "#488d9f");
    document.style = `color-scheme: dark light; transition: all 1s ease-in-out;`;
    logos.forEach((logo) => {
      logo.src = `/Assets/DarkEnginesLibraryLogoLight.png`;
    });
    themeIcon.setAttribute("xlink:href", "#DARK-MODE-ICON");
  }

  // if (!userModePreference.matches) {
  //   linkIcon.href = "/Assets/DarkEnginesLibraryLogoDark.png";
  // } else {
  //   linkIcon.href = "/Assets/DarkEnginesLibraryLogoLight.png";
  // }

  // const path = document.querySelector("#themeIconPath");
  // const SUN_SVG_PATH = "M32.5,0A32.5,32.5,0,1,1,0,32.5,32.5,32.5,0,0,1,32.5,0Z";

  // const MOON_SVG_PATH =
  //   "M32.5,0c17.949,0-20.258,10.871-8.048,38.881S50.449,65,32.5,65a32.5,32.5,0,0,1,0-65Z";
  // themeSwitch.addEventListener("pointerover", () => {
  //   if (path.getAttribute("theme") === "dark") {
  //     path.setAttribute("d", SUN_SVG_PATH);
  //     path.setAttribute("theme", "light");
  //   } else {
  //     path.setAttribute("d", MOON_SVG_PATH);
  //     path.setAttribute("theme", "dark");
  //   }
  // });

  themeSwitch.setAttribute(
    "currentMode",
    `${currentTheme === "dark" ? "light" : "dark"}`
  );

  ColorSchemeMetaTag.setAttribute(
    "content",
    `
        ${currentTheme === "dark" ? "dark light" : "light dark"}`
  );
  document.body.style.colorScheme = `${
    currentTheme === "dark" ? "dark light" : "light dark"
  }`;
  localStorage.setItem("theme", currentTheme);
  header.style = ` transition: all 0.75s ease-in-out;`;
}

function setupUser(fullName, imgUrl) {
  userAvatar.src = imgUrl;
  userAvatar.title = "some text";
  usernameLabels.forEach((user) => {
    user.setAttribute("userName", fullName);
    user.textContent = fullName;
  });
}

async function getCountriesCode() {
  const countryCodes = await Client.getCountriesCode(
    "/Assets/Data/countriesCode.json"
  );
  if (countryCodes) {
    countryCodes.forEach((country) => {
      const option = document.createElement("option");
      option.value = `${country.code} ${country.dialCode}`;
      option.append(country.name);
      countryCodeSelectOptions.append(option);
      if (country.name.toLowerCase() === "malta") {
        countryCodeInputOptions.setAttribute(
          "placeholder",
          `${country.code} ${country.dialCode}`
        );
      }
    });
  }
}

// ? * --> Setup document

// * --> Theme
setTheme(THEME);

// * --> setup user content
if (
  userAvatar != null &&
  usernameLabels.length !== 0 &&
  usernameLabels != null
) {
  setupUser(userName, userAvatarURL);
}
// ? * -->  section navigation smooth scroll
root.style.setProperty(
  "----scrollPadding",
  Math.round(navigationHight - 1) + "px"
);

// * --> setup country codes
if (linksAuth != null)
  linksAuth.forEach((link) => {
    link.setAttribute("isAuthenticated", Auth.isAuthenticated());
    console.log(link);
  });

if (countryCodeInputOptions != null) getCountriesCode();
// ? * --> Event listeners

// * --> scroll

if (heroSection != null) headerObserver.observe(heroSection);

// * --> Click

themeSwitch.addEventListener("pointerdown", () => setTheme());

logo.addEventListener("pointerdown", () => {
  const route = `${window.origin}${routes.INDEX.slice(1)}`;
  window.location.href = route;
});

redirectButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    const route = `${window.origin}${button.getAttribute("href").slice(1)}`;
    window.location.href = route;
  });
});

navButton.addEventListener("pointerdown", (e) => {
  const isExpanded = navButton.getAttribute("isToggled");
  if (isExpanded === "false") {
    navButton.setAttribute("isToggled", true);
    menu.setAttribute("isExpanded", true);
    menu.setAttribute("aria-expanded", true);
    document.body.setAttribute("isObserving", false);
  } else if (isExpanded === "true") {
    navButton.setAttribute("isToggled", false);
    menu.setAttribute("isExpanded", false);
    menu.setAttribute("aria-expanded", false);
    document.body.setAttribute("isObserving", true);
  }
  // navigation Links animation

  navLinks.forEach((link, index) => {
    link.setAttribute("animation", true);
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinksFadeAnim 0.5s  forwards ${
        index / 3 + 1.5
      }s`;
      link.style.animationDelay = `${index / 3 + 0.5}s`;
    }
  });
});

if (loginButton != null) {
  const closeFormButton = loginForm.querySelector("#closeButton");
  loginButton.addEventListener("pointerdown", () => formVisibility(loginForm));
  closeFormButton.addEventListener("pointerdown", () =>
    formVisibility(loginForm)
  );
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { password, email } = Object.fromEntries(
      new FormData(loginForm).entries()
    );

    Auth.login(password, email);
    loginForm.reset();
  });
}

if (dropDownMenu != null) {
  dropDownMenu.addEventListener("pointerdown", () => {
    let isAriaExpanded = dropDownMenu.getAttribute("aria-expanded");
    if (isAriaExpanded === "false") {
      dropDownMenu.setAttribute("aria-expanded", true);
    } else if (isAriaExpanded === "true") {
      dropDownMenu.setAttribute("aria-expanded", false);
    }
  });
}

// * --> Focus

inputFields.forEach((field) => {
  field.addEventListener("focusout", () => {
    const data = field.value.trim();
    if (data === "" || data === " ") {
      field.setAttribute("hasContent", false);
    } else {
      field.setAttribute("hasContent", true);
    }
  });
});

// * --> Submit
if (contactForm)
  contactForm.addEventListener("submit", (e) => {
    const valid = Validation.validateForm(contactForm);
    if (!valid) e.preventDefault();
  });
