import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

async function getNoteDetails(noteId) {
    const docRef = doc(db, "notes", noteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const note = docSnap.data();
        document.getElementById("titleTxt").value = note.title;
        document.getElementById("addTxt").value = note.note;
    } else {
        console.log("No such document!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const noteId = params.get("id");

    if (noteId) {
        getNoteDetails(noteId);

        document.getElementById("saveBtn").addEventListener("click", async () => {
            const title = document.getElementById("titleTxt").value;
            const note = document.getElementById("addTxt").value;
            const date = new Date().toLocaleString();

            if (title && note) {
                try {
                    const docRef = doc(db, "notes", noteId);
                    await updateDoc(docRef, {
                        title: title,
                        note: note,
                        date: date,
                        timestamp: serverTimestamp()
                    });
                    alert("Note updated successfully!");
                    window.location.href = "home.html";
                } catch (error) {
                    console.error("Error updating note: ", error);
                    alert("Error updating note. Please try again.");
                }
            } else {
                alert("Please add a title and note.");
            }
        });
    } else {
        alert("Note ID is missing!");
    }
});
