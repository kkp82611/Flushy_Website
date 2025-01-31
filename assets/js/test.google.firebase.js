// Google Firebase Implementation Testing
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
import { getFirestore, collection, query, where, addDoc, doc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js" 
import { showmap } from './map.js'
import { addReview, findReview } from './Review.js'

console.log("Website Loaded Succesfully");


const firebaseConfig = {
    apiKey: "AIzaSyCw0xg3NVs6qoS6RYr64er6Em9MG-DTy7c",
    authDomain: "flushy-website.firebaseapp.com",
    projectId: "flushy-website",
    storageBucket: "flushy-website.appspot.com",
    messagingSenderId: "604068868575",
    appId: "1:604068868575:web:f9f66bce716a8a6970d46a",
    measurementId: "G-BQ3XH5KJBK"
};

const app = initializeApp(firebaseConfig);
const analysisData = getAnalytics(app)
const db = getFirestore(app);

const storage = getStorage();
const output = document.querySelector("fileOutput");



/*========== map function========================*/
var locationID = [];
locationID = showmap(db); // an array set of nearby location ID 
console.log(locationID);

/* ==========  end  map ========================*/

/* ========== Google Firestore Implementation ========== */

/*
async function getImagesAlpha(db) {
const imageCol = collection(db, 'images-alpha');
const imageSnapshot = await getDocs(imageCol);
const imageList = imageSnapshot.docs.map(doc => doc.data());
return imageList;
}
*/

// --Loading Dynamic Images--
var dImg = document.createElement('img');
dImg.src = "images/pic07.jpg"
document.getElementById("defaultImage").appendChild(dImg);
// --End Loading--


document.getElementById("submitButton").addEventListener("click", getForm);
document.getElementById("freshButton").addEventListener("click", refreshImages);

// Storage
//document.getElementById("storageTestButton").addEventListener("click", addImage);

const cloudImage = document.getElementById("cloudImage");
cloudImage.addEventListener("change", updateImageSelector);

function bruh() {
    console.log("Bruh.");
}

// -Gets text in the "URL" form and passes it to Google Firestore-
function getForm() {
    var formText = document.getElementById("userURL").elements[0].value;
    //document.getElementById("submitTest").innerHTML = formText;

    addImageURL(formText);
}

// TODO: Separate firebase call into its own async function
async function refreshImages() {
    var formText = document.getElementById("alphaURL").elements[0].value;
    document.getElementById('defaultImage').removeChild(dImg);
    dImg.src = formText;
    document.getElementById('defaultImage').appendChild(dImg);

    /*
    // TODO: Replace with try/catch
    const querySnapshot = await getDoc(collection(db, "users", ));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.get("born")}`);
    });
    */
    //

}

// - Contacts Google Firestore and attempts to store "text" as a field in the 'images-alpha' database
async function addImageURL(text) {

    try {
        const docRef = await addDoc(collection(db, "images-alpha"), { link: text });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

/* ========== End Firestore Implementation ========== */


/* ========== Google Storage Implementation ========== */

async function updateImageSelector() {
    const preview = document.getElementById("cloudImgPreview");

    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const curFiles = cloudImage.files;
    if (curFiles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        preview.appendChild(para);
    } else {
        const list = document.createElement('ol');
        preview.appendChild(list);
        const details = document.createElement('p');

        for (const file of curFiles) {
            const listItem = document.createElement('li');
            const para = document.createElement('p');

            para.textContent = `File name ${file.name}, file size ${file.size}.`;
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);

            listItem.appendChild(image);
            listItem.appendChild(para);

            list.appendChild(listItem);

            const storageRef = ref(storage, 'images/' + file.name);
            const metadata = { contentType: 'image/jpeg' };

            console.log(file.name);

            await uploadBytes(storageRef, file, metadata).then((snapshot) => {
                console.log('Uploaded an image file!');
            });

            //TODO: Put following lines into its own function, add more detailed firestore data
            getDownloadURL(storageRef).then((url) => {
                addImageURL(url); //Firestore call
                document.getElementById('defaultImage').removeChild(dImg);
                dImg.src = url;
                document.getElementById('defaultImage').appendChild(dImg);
            });


        }

        details.textContent = 'File Uploaded!'
        preview.appendChild(details);
        
    }
}

/* ========== End Google Storage ========== */


/* =============== GOOGLE SIGN IN CONTENT ================== */
var test = document.getElementById('signOut');
	test.onclick = function() {
	gapi.auth2.getAuthInstance().signOut().then(function() {
		console.log('user signed out');
		});
	}

	function onSignIn(googleUser) {
		var profile = googleUser.getBasicProfile();
		console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	}

	// function onSignIn(googleUser) {
	// 	console.log("User is " + JSON.stringify(googleUser.getBasicProfile()));
	// 	document.querySelector("#content").innerText = googleUser.getBasicProfile().getGivenName();

	// }

