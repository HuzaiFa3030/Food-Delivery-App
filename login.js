function signUppage() {
    window.location.href = './signup.html'
}
function signInpage() {
    window.location.href = "./login.html"
}
let register = () => {
    window.location.href = "./signup.html"
}

let login = () => {
    window.location.href = "./login.html"
}


let userEmail;
let userId;

let signUp = () => {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var Rname = document.getElementById('Rname').value
    var country = document.getElementById('country').value
    var city = document.getElementById('city').value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            userEmail = user.email
            userId = user.uid
            var firebaseData = firebase.database().ref("Data")
            var key = userId;
            let obj = {
                userId,
                email,
                password,
                Rname,
                country,
                city,
            }
            firebaseData.child(key).set(obj)
            localStorage.setItem('email', userEmail)
            localStorage.setItem("userID", userId)
            localStorage.setItem("Rname", Rname)
            localStorage.setItem("country", country)
            localStorage.setItem("city", city)
            alert("Registration Successfull")
          
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage)
        });
        email.value = ""
        country.value = ""
        Rname.value = ""
        city.value = ""
        password.value = ""
}


let signIn = () => {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var adminUser = "admin@gmail.com"
    var adminUID = "pveFIFN97NQ21RD9lTrSAqvzOc33"

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            alert("Login Sucessfull")
            console.log(user);

            if (user.email == adminUser && user.uid == adminUID) {
                alert("Login Sucessfull")
                window.location.href = "./adminpage.html"
            }
             else {
                window.location.href = "./userpage.html"
            }
            })
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
            console.log(errorMessage);
        });

}



