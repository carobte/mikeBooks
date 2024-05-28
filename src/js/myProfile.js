//import api functions from api.js
import { deleteUser } from "./api.js";

// get data form
const booksForm = document.querySelector('#books-form')
const name = document.querySelector('#book-name')
const publisher = document.querySelector('#publishing-house')
const year = document.querySelector('#publication-year') 
const author = document.querySelector('#author')
const transaction = document.querySelector('#transaction')
const price = document.querySelector('#price')
const description = document.querySelector('#description')
const image = document.querySelector('#input-image')

//get delete button from myProfile.html
const deleteButton = document.querySelector('#delete-user-button')

// get user from local storage
const user = JSON.parse(localStorage.getItem('userLogged'))
const userId = user.id 
console.log(userId)

//get user information container and logout option from myProfile.html
const myProfileInfo = document.querySelector('#my-profile-info')
const logout = document.querySelector('#log-out')
console.log(myProfileInfo)
// event submit form book create
booksForm.addEventListener('submit', (e) => {
    e.preventDefault()
    createBook(name, publisher, year, author, transaction, price, description, image) // call createBook function
})

//event change for transaction and price
transaction.addEventListener("change", ()=>{
    // conditional to verify transaction value
    if (transaction.value === "trade") {
        price.value=0
        price.setAttribute("disabled", "")
    } else {
        price.removeAttribute("disabled", "")
    }
})

// createBook function
function createBook (name, publisher, year, author, transaction, price, description, image) {
    // add data form in new object
    const newBook = {
        name: name.value,
        publisher: publisher.value,
        year: year.value,
        author: author.value,
        transaction: transaction.value,
        price: price.value,
        description: description.value,
        image: image.value
    }
    console.log(newBook)
}

//Create functionality delete account button 
deleteButton.addEventListener("click", async () => { 
    if (confirm("¿Está seguro de eliminar su cuenta?")) {
        await deleteUser(userId)
        localStorage.removeItem('userLogged')
        window.location.href = "/"
    } else {
        alert("No se pudo eliminar")
    }
})

//create innerHTML to print my profile information

function showUserInfo(myProfileInfo, user) {
    console.log("User")
myProfileInfo.innerHTML = `
<article class="row justify-content-lg-between">  
<!-- box profile info -->
<div class="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-xs-12">
  <article class="row gap-4 p-4 justify-content-between align-items-center">
    <div
      class="col-sm-4 d-flex justify-content-center align-items-center rounded-1 p-2 py-md-5 px-md-3 h-100 container-icon-user">
      <img class="col-6 col-md-8 col-xl-12" src="/public/icons/user-avatar.png" alt="icon-user">
    </div>
    <div class="col-sm-6 d-flex flex-column gap-4 general-text">
      <h3 class="titles mb-1">Nombre del usuario</h3>
      <span>Suscripción</span>
      <h3 class="titles">Información del contacto</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item border-0">Ciudad</li>
        <li class="list-group-item border-0">Número de télefono</li>
        <li class="list-group-item border-0">Correo eléctronico</li>
      </ul>
      <div class="d-flex content-btn-delete">
        <button id="delete-user-button" class="btn btn-delete p-2 bg-creamy general-text"><i
            class="bi bi-trash-fill"></i> Eliminar cuenta</button>
      </div>
    </div>
  </article>
</div>
<!-- box comments -->
<div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
  <article class="row gap-4 p-4">
    <h3 class="titles">Comentarios</h3>
    <div class="d-flex flex-column gap-3 general-text">
      <div class="p-3 rounded-1 bg-creamy comment-box">Comentario 1</div>
      <div class="p-3 rounded-1 bg-creamy comment-box">Comentario 2</div>
    </div>
  </article>
</div>
</article>
`
}

showUserInfo(myProfileInfo, user) 

logout.addEventListener('click', () => {
    localStorage.removeItem('userLogged')
    alert('Saliendo del sistema')
    window.location.href = "/"
})