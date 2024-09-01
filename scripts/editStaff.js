import { db, doc, getDoc, updateDoc } from "../services/firebase_config.js";

// Function to get staff data and populate the form
async function populateStaffForm() {
  // Get the staff ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const staffId = urlParams.get("id");

  if (!staffId) {
    alert("No staff ID found in the URL.");
    return;
  }

  // Get a reference to the staff document
  const docRef = doc(db, "staffs", staffId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const staff = docSnap.data();
    document.getElementById("firstName").value = staff.firstName || "";
    document.getElementById("lastName").value = staff.lastName || "";
    document.getElementById("phoneNumber").value = staff.phoneNumber || "";
    document.getElementById("email").value = staff.email || "";
    document.getElementById("address").value = staff.address || "";
  } else {
    alert("No such staff member found!");
  }
}

// Function to handle form submission and update staff data
async function updateStaff(event) {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const staffId = urlParams.get("id");

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  try {
    const docRef = doc(db, "staffs", staffId);
    await updateDoc(docRef, {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
    });

    alert("Staff updated successfully!");
    window.location.href = "staff.html"; // Redirect back to the staff list page
  } catch (error) {
    console.error("Error updating staff: ", error);
    alert("Failed to update staff. Please try again.");
  }
}

// Populate the form when the page loads
document.addEventListener("DOMContentLoaded", populateStaffForm);

// Handle form submission
document.querySelector("form").addEventListener("submit", updateStaff);
