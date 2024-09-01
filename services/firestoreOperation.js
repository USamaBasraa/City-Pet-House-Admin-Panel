// firestore-operations.js

import { staffCollection } from "./firestoreCollection.js";
import {
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Add a new staff member
export async function addStaffData(data) {
  try {
    const docRef = await addDoc(staffCollection, data);
    console.log("Staff added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding staff: ", e);
  }
}

// Edit an existing staff member
export async function editStaff(id, updatedData) {
  try {
    const staffDoc = doc(staffCollection, id);
    await updateDoc(staffDoc, updatedData);
    console.log("Staff updated successfully!");
  } catch (e) {
    console.error("Error updating staff: ", e);
  }
}

// Delete a staff member
export async function deleteStaff(id) {
  try {
    const staffDoc = doc(staffCollection, id);
    await deleteDoc(staffDoc);
    console.log("Staff deleted successfully!");
  } catch (e) {
    console.error("Error deleting staff: ", e);
  }
}

// Get all staff members
export async function getAllStaff() {
  try {
    const querySnapshot = await getDocs(staffCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error getting staff: ", e);
  }
}
