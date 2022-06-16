// Initialize Firebase
var config = {
    apiKey: "AIzaSyC01IEfpu0lzVuokygFN43ysXUb5a5NUsw",
    authDomain: "demofire-e797c.firebaseapp.com",
    databaseURL: "https://demofire-e797c-default-rtdb.firebaseio.com",
    projectId: "demofire-e797c",
    storageBucket: "demofire-e797c.appspot.com",
    messagingSenderId: "786126058816",
    appId: "1:786126058816:web:e7e39f9b90fb05db0436a5",
    measurementId: "G-L5Z86FTT0Z"
    };
    firebase.initializeApp(config)
const dbRef = firebase.database().ref();
const userRef= dbRef.child('users');
function readUserData()
{
    
}