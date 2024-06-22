import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBM-zN2iyE8edFyomm8nP30ZRYvXNIOWKU",
    authDomain: "noterush-626ab.firebaseapp.com",
    projectId: "noterush-626ab",
    storageBucket: "noterush-626ab.appspot.com",
    messagingSenderId: "1046798676169",
    appId: "1:1046798676169:web:91b21bb116298e01679d18",
    measurementId: "G-6F5VQX9234"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("addBtn").addEventListener("click", async () => {
    const title = document.getElementById("titleTxt").value;
    const note = document.getElementById("addTxt").value;
    const date = new Date().toLocaleString();

    if (title && note) {
        try {
            await addDoc(collection(db, "notes"), {
                title: title,
                note: note,
                date: date,
                timestamp: serverTimestamp()
            });
            alert("Note added successfully!");
            document.getElementById("titleTxt").value = "";
            document.getElementById("addTxt").value = "";
        } catch (error) {
            console.error("Error adding note: ", error);
            alert("Error adding note. Please try again.");
        }
    } else {
        alert("Please add a title and note.");
    }
});
