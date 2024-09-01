import { addStaffData } from "../services/firestoreOperation.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addStaffForm");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      clearErrors();

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const phoneNumber = document.getElementById("phoneNumber").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("inputPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();
      const address = document.getElementById("address").value.trim();

      let isValid = true;

      // Validate fields
      if (!firstName) {
        showError("firstName", "First name is required");
        isValid = false;
      }

      if (!lastName) {
        showError("lastName", "Last name is required");
        isValid = false;
      }

      if (!phoneNumber) {
        showError("phoneNumber", "Phone number is required");
        isValid = false;
      }

      if (!email) {
        showError("email", "Email is required");
        isValid = false;
      }

      if (!password) {
        showError("inputPassword", "Password is required");
        isValid = false;
      }

      if (!confirmPassword) {
        showError("confirmPassword", "Confirm password is required");
        isValid = false;
      }

      if (password !== confirmPassword) {
        showError("confirmPassword", "Passwords do not match");
        isValid = false;
      }

      if (!address) {
        showError("address", "Address is required");
        isValid = false;
      }

      // Stop the form submission if any field is invalid
      if (!isValid) {
        return;
      }

      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const staffData = {
          uid: user.uid,
          firstName,
          lastName,
          phoneNumber,
          email,
          address,
        };

        await addStaffData(staffData);
        alert("Staff added successfully!");
        form.reset();
      } catch (error) {
        console.error("Error adding staff: ", error);
        alert("Failed to add staff. Please try again.");
      }
    });
  } else {
    console.error("Form element not found!");
  }
});

// Function to show error messages and red border
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  element.style.borderColor = "red";

  // Create an error message element
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.style.color = "red";
  errorElement.innerText = message;

  // Insert the error message after the input field
  if (element.nextSibling) {
    element.parentNode.insertBefore(errorElement, element.nextSibling);
  } else {
    element.parentNode.appendChild(errorElement);
  }
}

// Function to clear all error messages and reset borders
function clearErrors() {
  const elements = document.querySelectorAll(".form-control");
  elements.forEach((element) => {
    element.style.borderColor = ""; // Reset border color
  });

  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((message) => {
    message.remove(); // Remove error messages
  });
}
