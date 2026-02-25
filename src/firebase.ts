import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWzVpHxk2i2G4wkw7qFizK5qpMFFDsfpU",
  authDomain: "rawenergy.firebaseapp.com",
  projectId: "rawenergy",
  storageBucket: "rawenergy.firebasestorage.app",
  messagingSenderId: "1005370958540",
  appId: "1:1005370958540:web:a778ea5a6f6dc225edd869",
  measurementId: "G-HG44S6J6SR"
};

// Inicializa Firebase pero sin declarar variables que no uses
initializeApp(firebaseConfig);