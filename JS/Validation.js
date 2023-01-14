import Notify from "./Notify.js";

function validateSingleInput(input, type, title) {
  switch (type) {
    case "string":
      if (
        !input.value.match(/^[a-zA-Z ]*$/) !== true &&
          input.value !== ""
      ) {
        input.setAttribute("valid", "true");
        return true;
      } else {
        input.setAttribute("valid", "false");
        input.focus();
        Notify.customAlert(`enter a valid ${title} please!..`);
        return false;
      }
    case "email":
      if (
        !input.value.match(/^[A-Za-z-0-9._+-]+@[A-Za-z-0-9.-]+\.[a-z]{2,}$/) !==
          true &&
          input.value !== ""
      ) {
        input.setAttribute("valid", "true");
        return true;
      } else {
        input.setAttribute("valid", "false");
        input.focus();
        Notify.customAlert(`enter a valid ${title} please!..`);
        return false;
      }
    case "integer":
      if (
        !input.value.match(/^[0-9]{8}$/) !== true &&
          input.value !== ""
      ) {
        input.setAttribute("valid", "true");
        return true;
      } else {
        input.setAttribute("valid", "false");
        input.focus();
        Notify.customAlert(
          `enter a valid ${title} please!..\nthe ${title} must be 8 valid numbers`
        );
        return false;
      }

    // case "password":
    //   if (
    //     !input.value.match(
    //       /^(\d?=.*[a-z])(\d?=.*[A-Z])(?=.*[\da-zA-Z]).{12,32}$/
    //     ) !== true &&
    //     input.value !== "" &&
    //     input != null
    //   ) {
    //     input.setAttribute("valid", "true");
    //     return true;
    //   } else {
    //     input.setAttribute("valid", "false");
    //     input.focus();
    //     Notify.customAlert(
    //       `enter a valid ${title} please!..\nthe ${title} must be between 12 - 32 characters`
    //     );
    //     return false;
    //   }
    case "badWords":
      if (
        !input.value.match(/^[a-zA-Z ]*$/) !== true &&
          input.value !== ""
      ) {
        input.setAttribute("valid", "true");
        return true;
      } else {
        input.setAttribute("valid", "false");
        input.focus();
        Notify.customAlert(`enter a valid ${title} please!..`);
        return false;
      }

    default:
      return true;
  }
}

function validateForm(form) {
  /// input fields for validation
  const phoneNumber = form.querySelector("#phoneNumber");
  const fullName = form.querySelector("#userNameInputField");
  const emailAddress = form.querySelector("#Email");
  const message = form.querySelector("#messageBody");

  return validateSingleInput(fullName, "string", "Full Name") &&
      validateSingleInput(phoneNumber, "integer", "Phone Number") &&
      validateSingleInput(emailAddress, "email", "Email") &&
      validateSingleInput(message, "string", "Comment");
}

export default { validateForm, validateSingleInput };
