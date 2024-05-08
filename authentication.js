// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {


  };


  // Initialize Firebase

const app = initializeApp(firebaseConfig);



const auth = getAuth();
const provider = new GoogleAuthProvider();


const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

signOutButton.style.display = 'none';

// Sign-in function
const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
        // Populate form fields after successful sign-in
        document.querySelector('#firstName').value = user.displayName.split(' ')[0] || '';
        document.querySelector('#lastName').value = user.displayName.split(' ')[1] || '';
        document.querySelector('#exampleInputEmail1').value = user.email || '';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Display an error message for the user
        alert(`Error: ${errorCode} - ${errorMessage}`);
    });
};

// Sign-out function
const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!");
        document.querySelector('#firstName').value = '';
        document.querySelector('#lastName').value = '';
        document.querySelector('#exampleInputEmail1').value = '';
    }).catch((error) => {
        alert(`Sign out error: ${error.message}`);
    });
};

// Authentication state change handling
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        signInButton.style.display = 'none';
        signOutButton.style.display = '';
        console.log("User is authenticated:", user);
    } else {
        // User is signed out
        signInButton.style.display = '';
        signOutButton.style.display = 'none';
    }
});


 
signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);


 
 