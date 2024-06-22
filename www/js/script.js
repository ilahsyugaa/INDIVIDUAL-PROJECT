// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBM-zN2iyE8edFyomm8nP30ZRYvXNIOWKU",
    authDomain: "noterush-626ab.firebaseapp.com",
    projectId: "noterush-626ab",
    storageBucket: "noterush-626ab.appspot.com",
    messagingSenderId: "1046798676169",
    appId: "1:1046798676169:web:91b21bb116298e01679d18",
    measurementId: "G-6F5VQX9234"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add note button click event listener
document.getElementById("addBtn").addEventListener("click", e => {
    e.preventDefault();
    let addTxt = document.getElementById("addTxt").value;
    let titleTxt = document.getElementById("titleTxt").value;

    // Add note to Firestore
    addDoc(collection(db, "notes"), {
        title: titleTxt,
        note: addTxt,
        timestamp: serverTimestamp()
    })
    .then(() => {
        console.log("Note added successfully");
        document.getElementById("addTxt").value = "";
        document.getElementById("titleTxt").value = "";
        showNotes();
    })
    .catch(error => {
        console.error("Error adding note: ", error);
    });
});

// Function to show notes
function showNotes() {
    let notesElm = document.getElementById("notes");

    // Clear previous notes
    notesElm.innerHTML = "";

    // Fetch notes from Firestore
    getDocs(collection(db, "notes"))
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            let note = doc.data();
            notesElm.innerHTML += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">${note.title}</h5>
                        <p class="card-text">${note.note}</p>
                        <button id="${doc.id}" class="btn btn-primary" onclick="deleteNote('${doc.id}')">Delete Note</button>
                    </div>
                </div>`;
        });
    })
    .catch(error => {
        console.error("Error fetching notes: ", error);
    });
}

// Function to delete note
function deleteNote(noteId) {
    // Delete note from Firestore
    deleteDoc(doc(db, "notes", noteId))
    .then(() => {
        console.log("Note successfully deleted");
        showNotes();
    })
    .catch(error => {
        console.error("Error deleting note: ", error);
    });
}

// Display notes on page load
window.addEventListener("load", showNotes);
