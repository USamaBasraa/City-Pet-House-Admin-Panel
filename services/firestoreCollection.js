// firestore-collections.js
import { db } from "./firebase_config.js";
import { collection } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Reference to your collections
const clientsCollection = collection(db, "clients");
const staffCollection = collection(db, "staffs");
const vaccinationCollection = collection(db, "vaccinations");
const animalsCollection = collection(db, "animals");

export {
  clientsCollection,
  staffCollection,
  vaccinationCollection,
  animalsCollection,
};
