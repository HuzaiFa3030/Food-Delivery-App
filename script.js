let register = () => {
    window.location.href = "./signup.html"
}

let login = () => {
    window.location.href = "./login.html"
}

let show = () => {
    var addItemBtn = document.getElementById('formContent')
    addItemBtn.classList.remove('hide')
}

let logOut = () => {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = "login.html"
        })
}

let uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref(`images/${file.name}`);
        let uploading = storageRef.put(file)
        uploading.on('state_changed',
            (snapshot) => {

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log(downloadURL);
                    resolve(downloadURL)
                });
            }
        );
    })

}


let addItems = async () => {
    let category = document.getElementById('category').value
    let itemsName = document.getElementById('itemsName').value
    let itemDiscription = document.getElementById('itemDiscription').value
    let itemPrice = document.getElementById('itemPrice').value
    var choseItemFile = document.getElementById('customFile')
    let key = firebase.database().ref("Items").push().key
    // console.log(choseItemFile.files[0]);
    var imagesURL = await uploadFiles(choseItemFile.files[0]);
    let obj = {
        category,
        itemsName,
        itemDiscription,
        itemPrice,
        imagesURL
    }
    firebase.database().ref("Items").child(key).set(obj)
    var a = await location.reload()
}



// ----------------ADMIN-----------------------------
var adminCart = document.getElementById('adminCart')

var firebaseData = firebase.database().ref("Items")
firebaseData.on("value", function (data) {
    allitems = data.val()
    for (var key in allitems) {
        adminCart.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${allitems[key].imagesURL}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Name : ${allitems[key].itemsName}</h5>
        <p class="card-text">Discription : ${allitems[key].itemDiscription}</p>
        <p class="card-text">Category : ${allitems[key].category}</p>
        <p class="card-text">Price : ${allitems[key].itemPrice}</p>
        </div>
        </div>`
    }
}
)


// ------------------USER----------------
var userCart = document.getElementById('userCart')

firebase.database().ref("Items").on("value", function (data) {
    var all = data.val()
    for (var key in all) {
        userCart.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img src="${all[key].imagesURL}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Name : ${all[key].itemsName}</h5>
        <p class="card-text">Discription : ${all[key].itemDiscription}</p>
        <p class="card-text">Price : ${all[key].itemPrice}</p>
        <a href="#" class="btn btn-primary" onclick="addToCart('${all[key].itemsName}','${all[key].itemPrice}','${all[key].category}','${all[key].itemDiscription}')">Buy Now</a>
        </div>
        </div>`
    }
}
)
// ----------------------ADD TO CART------------------
let itemArr = [];
let orderItem = localStorage.getItem('orderItems')
if (orderItem !== null) {
    itemArr = JSON.parse(orderItem)
}

let addToCart = (itemsName, itemPrice, category) => {
    let obj = {
        itemsName,
        itemPrice,
        category
    }
    itemArr.push(obj)
    localStorage.setItem('orderItems', JSON.stringify(itemArr))
    alert("Your Ordar Recived Sucessfull")
}

let tblData = document.getElementById("tblData")
var total = 0;

for (var i = 0; i < itemArr.length; i++) {
    // console.log(itemArr);
    tblData.innerHTML += `
    <tr>
          <td>${itemArr[i].itemsName}</td>
          <td>${itemArr[i].itemPrice}</td>
          <td>1</td>
          <td>${itemArr[i].category}</td>
          <td>${itemArr[i].itemPrice}</td>
        </tr>`
    var itemRate = parseInt(itemArr[i].itemPrice)
    total = total + itemRate
}
// console.log(total);
var subTotal = document.getElementById('subTotal')
subTotal.innerHTML = `<p>Net Amount : ${total}</p>`


let ok = () => {
    let clearBTN = document.getElementById("clearBTN")
    clearBTN = localStorage.clear()
    location.reload()
}

