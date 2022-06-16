

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCnZuvAQNU5PSeD4OLfwIRh6O1JfYQpz2c",
	authDomain: "firejs-a52f7.firebaseapp.com",
    databaseURL: "https://firejs-a52f7-default-rtdb.firebaseio.com/",
	projectId: "firejs-a52f7",
    storageBucket: "firejs-a52f7.appspot.com",
    messagingSenderId: "784973263653",
    appId: "1:784973263653:web:d0f865dfd273507a77a0cc",
    measurementId: "G-C8N6BCC5L6"
};



firebase.initializeApp(config);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');


readUserData(); 
	

// --------------------------
// READ
// --------------------------
function readUserData() {

	const userListUI = document.getElementById("user-list");

	usersRef.on("value", snap => {

		userListUI.innerHTML = ""

		snap.forEach(childSnap => {

			let key = childSnap.key,
				value = childSnap.val()
  			
			let $li = document.createElement("li");

			$li.innerHTML = value.name;

			$li.setAttribute("user-key", key);
			$li.addEventListener("click", userClicked)
			userListUI.append($li);

 		});


	})

}



function userClicked(e) {


		var userID = e.target.getAttribute("user-key");

		const userRef = dbRef.child('users/' + userID);
		const userDetailUI = document.getElementById("user-detail");

		userRef.on("value", snap => {

			userDetailUI.innerHTML = ""

			snap.forEach(childSnap => {
				var $p = document.createElement("p");
				$p.innerHTML = childSnap.key  + " - " +  childSnap.val();
				userDetailUI.append($p);
			})

		});
	

}