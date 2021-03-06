

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
const addUserBtnUi=document.getElementById("add-user-btn");

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

        // edit icon
        let editIconUI = document.createElement("span");
        editIconUI.class = "edit-user";
        editIconUI.innerHTML = " ✎";
        editIconUI.setAttribute("userid", key);
        editIconUI.addEventListener("click", editButtonClicked);
            $li.innerHTML = value.name
            $li.append(editIconUI);
            console.log(key);
			$li.innerHTML = value.name;

			$li.setAttribute("user-key", key);
			$li.addEventListener("click", userClicked);
            $li.append(editIconUI);
            
			userListUI.append($li);

 		});


	})

}



function userClicked(e) {


		var userID = e.target.getAttribute("user-key");
        console.log("selectedkey",userID);
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
//-------- ADD User ---------------
 addUserBtnUi.addEventListener("click", addUserBtnClicked);

 function addUserBtnClicked()
 {
    const addUserInputsUI = document.getElementsByClassName("user-input");
    // objet de nouveau user
    let newUser={};
    for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
        let key = addUserInputsUI[i].getAttribute('data-key');
        let value = addUserInputsUI[i].value;
        newUser[key] = value;
        }
        usersRef.push(newUser);
        alert("ajouté avec succés")
 }

function editButtonClicked(e)
{
    document.getElementById("edit-user-module").style.display="block";
    document.querySelector(".edit-userid").value=e.target.getAttribute("userid");
    let userID=e.target.getAttribute("userid");
    const userRef = dbRef.child('users/' + userID);
    const editUserInputsUI = document.querySelectorAll(".edit-user-input");
userRef.on("value",
snap=>
{
    for (let i = 0, len = editUserInputsUI.length; i < len; i++)
    {        
        let key = editUserInputsUI[i].getAttribute('data-key');
        editUserInputsUI[i].value=snap.val()[key];


    }
  
}

)
const saveBtn =document.querySelector("#edit-user-btn");
saveBtn.addEventListener("click",saveUserbtnClicked);
}
function saveUserbtnClicked(e)
{
const userID=document.querySelector(".edit-userid").value;
const userRef=dbRef.child('users/'+userID);
var editedUserObject = {}
const editUserInputsUI = document.querySelectorAll(".edit-user-input");
editUserInputsUI.forEach(function(textFeild)
{
let key=textFeild.getAttribute("data-key");
let value=textFeild.value;
editedUserObject[key]=value;

});
userRef.update(editedUserObject);
document.getElementById("edit-user-module").style.display="none";

}