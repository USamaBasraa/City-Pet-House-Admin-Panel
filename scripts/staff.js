import { db } from "../services/firebase_config.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Function to fetch and display staff data
async function fetchAndDisplayStaff() {
  try {
    const staffCollection = collection(db, "staffs");
    const staffSnapshot = await getDocs(staffCollection);

    const staffTableBody = document.querySelector("tbody");
    staffTableBody.innerHTML = "";

    let serialNo = 1; // Start the serial number at 1

    staffSnapshot.forEach((doc) => {
      const staff = doc.data();
      const row = document.createElement("tr");

      row.innerHTML = `
        <th scope="row">${serialNo++}</th>
        <td>${staff.firstName} ${staff.lastName}</td>
        <td>${staff.phoneNumber}</td>
        <td>${staff.email}</td>
        <td>${staff.address}</td>
        <td>
          <a href="editstaff.html?id=${
            doc.id
          }" class="btn btn-rounded btn-warning">Edit</a> 
          <button class="btn btn-rounded btn-danger" onclick="deleteStaff('${
            doc.id
          }')">Delete</button>
        </td>
      `;

      staffTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching staff data: ", error);
  }
}

// Function to delete staff
async function deleteStaff(staffId) {
  if (confirm("Are you sure you want to delete this staff member?")) {
    try {
      await deleteDoc(doc(db, "staffs", staffId));
      alert("Staff member deleted successfully!");
      fetchAndDisplayStaff(); // Refresh the table after deletion
    } catch (error) {
      console.error("Error deleting staff: ", error);
      alert("Failed to delete staff. Please try again.");
    }
  }
}

// Expose deleteStaff to the global scope
window.deleteStaff = deleteStaff;

// Call the function to fetch and display staff data when the page loads
document.addEventListener("DOMContentLoaded", fetchAndDisplayStaff);
