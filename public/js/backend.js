// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { getStorage, ref, listAll, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js"
import { getFirestore, query, where, collection, addDoc, getDocs, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxQOYhgS8hNeH54adKnSVot5tjJcgiw-k",
  authDomain: "dog-cat-7b3a6.firebaseapp.com",
  projectId: "dog-cat-7b3a6",
  storageBucket: "dog-cat-7b3a6.appspot.com",
  messagingSenderId: "679313092033",
  appId: "1:679313092033:web:4f932316c0194440aa1340",
  measurementId: "G-EFFZDJRHK8"
};

// Initialize Firebase | Inicializar Firebase
const app = initializeApp(firebaseConfig);
// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

var file, isUploading;

// Agrega un nuevo objecto a la base de datos
async function addNewAmimal() {
  if (isUploading) {
    alert("Please wait, thumbnail is uploading...");
    return;
  }
  if (file != undefined) {
    uploadFile(file);
  }
  else {
    alert("Please select an image first!");
  }
}

window.addnew = addNewAmimal;

// listen to the results of a query. This creates a query snapshot.
// For example, to listen to the documents with Nombre Firulays:
/*
const q = query(collection(db, "mascotas"), where("Nombre", "==", "Firulays"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`Nombre: ${doc.data().Nombre}`);
  });
});
*/

const unsub = onSnapshot(collection(db, "mascotas"), (querySnapshot) => {
  let tab;
  tab = document.getElementById('tab-body');
  if (tab == undefined) { unsub(); return;}

  tab.innerHTML = ``; // clears current data
  
  querySnapshot.forEach((doc) => {
    // adds each row filled with new data
    tab.innerHTML += `
    <tr>
    <td>${doc.id}</td>
    <td>${doc.data().Nombre}</td>
    <td>${doc.data().Talla}</td>
    <td>${doc.data().Edad}</td>
    <td>${doc.data().Color}</td>
    <td>${doc.data().Sexo}</td>
    <td><img alt="image" class="thumbnail" src="${doc.data().Thumbnail}"></td>
    <td>${doc.data().Raza}</td>
    <td>${doc.data().Descripcion}</td>
    <td>${doc.data().Razon}</td>
    <td>
    <button data-id="${doc.id}" class="action-edit"><span class="icon-edit"></span>Editar</button>
    <button data-id="${doc.id}" class="action-delete"><span class="icon-delete"></span>Eliminar</button>
    </td>
    </tr>
    `;
});

const btn_delete = document.querySelectorAll('.action-delete');
    const btn_update = document.querySelectorAll('.action-edit');
    btn_delete.forEach(btn =>
    {
    btn.addEventListener('click', (e) => {
      const docRef = doc(db, "mascotas", e.target.getAttribute('data-id'));
      deleteDoc(docRef).then(() => {
        alert("Elemento borrado!");
        console.log("Entire Document has been deleted successfully.")
    }).catch(error => {
        console.log(error);
    })
    });
    });

});

// reads data once
/*
const querySnapshot = await getDocs(collection(db, "mascotas"));
querySnapshot.forEach((d) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());
});
*/

// retrieve multiple documents with one request by querying documents in a collection
// and query for all of the documents that meet a certain condition
/*
const q = query(collection(db, "mascotas"), where("Nombre", "==", "Firulays"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
*/

const filepicker = document.getElementById('upload-photo');
if (filepicker != undefined) {
  filepicker.addEventListener('change', (event) => {
    const files = event.target.files;
    for (const f of files) {
      file = f;
    }
  });
}

function uploadFile(file) {
  // Create a reference to 'images/mountains.jpg'
  const storageRef = ref(storage, "mascotas/" + file.name);
  const reader = new FileReader();
      reader.addEventListener("load", () => {
        // Upload the file and metadata
        isUploading = true;
  const uploadTask = uploadBytesResumable(storageRef, reader.result);
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      } 
      
    },
    (error) => {
     isUploading = false;
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
       isUploading = false;
        //console.log("File available at", downloadURL);

        let object = {
          Nombre: document.querySelector("#nombre").value,
          Talla: document.querySelector("#talla").value,
          Edad: document.querySelector("#edad").value,
          Color: document.querySelector("#color").value,
          Sexo: document.querySelector("#sexo").value,
          Raza: document.querySelector("#raza").value,
          Thumbnail: downloadURL,
          Descripcion: document.querySelector("#descripcion").value,
          Razon: document.querySelector("#razon").value
        };
      
        try {
          const docRef = await addDoc(collection(db, "mascotas"), object);
          console.log("Document written with ID: ", docRef.id);
          alert("Mascota agregada correctamente");
        } catch (e) {
          console.error("Error adding document: ", e);
          alert("Ocurrio un error.");
        }
      });
    }
  );

  // Pause the upload
  //uploadTask.pause();

  // Resume the upload
  //uploadTask.resume();

  // Cancel the upload
  //uploadTask.cancel();
      });
      reader.readAsArrayBuffer(file);
}

