import { getDocs, collection, db } from "../services/firebase_config.js";

// Function to fetch staff data and update the UI
async function updateStaffCount() {
  try {
    const staffCollection = collection(db, "staffs");
    const staffSnapshot = await getDocs(staffCollection);
    const staffCount = staffSnapshot.size;
    document.getElementById("totalStaffCount").textContent = staffCount;
  } catch (error) {
    console.error("Error fetching staff data: ", error);
  }
}
document.addEventListener("DOMContentLoaded", updateStaffCount);
