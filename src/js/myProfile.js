
// Function to validate if there's a user logged in

function isLogged() {
    let userLogged = JSON.parse(localStorage.getItem("userLogged"))
    if (!userLogged) {
        window.location.href = "/"
    } else {
      return userLogged
    }
  }

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

// get user, userId and user books from local storage
const user = isLogged()
const userId = user.id 
const userBooks = user.books

//get user information container, cards container and logout option from myProfile.html
const myProfileInfo = document.querySelector('#my-profile-info')
const logout = document.querySelector('#log-out')
const userBooksSection = document.querySelector('#user-books')
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
      <img class="col-6 col-md-8 col-xl-12" src=${user.image} alt="${user.nickname}">
    </div>
    <div class="col-sm-6 d-flex flex-column gap-4 general-text">
      <h3 class="titles mb-1 text-capitalize">${user.nickname}</h3>
      <span class="text-capitalize" >${user.subscription}</span>
      <h3 class="titles">Información del contacto</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item border-0 text-capitalize">${user.location}</li>
        <li class="list-group-item border-0">${user.number}</li>
        <li class="list-group-item border-0">${user.email}</li>
      </ul>
      <div class="d-flex content-btn-delete">
        <button id="delete-user-button" class="btn btn-delete p-2 bg-creamy general-text"><i
            class="bi bi-trash-fill"></i>Eliminar cuenta</button>
      </div>
    </div>
  </article>
</div>
<!-- box comments -->
<div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
  <article class="row gap-4 p-4">
    <h3 class="titles">Comentarios</h3>
    <div id="comment-container" class="d-flex flex-column gap-3 general-text">
    </div>
  </article>
</div>
</article>
`
let comments = user.reviews

let commentContainer = document.querySelector('#comment-container')
comments.forEach(comment => {
    commentContainer.innerHTML += `
    <div class="p-3 rounded-1 bg-creamy comment-box">${comment.msg}</div>
    `
})
}

userBooks.forEach(book => {
    userBooksSection.innerHTML += `
    <article class="card bg-our-white mt-5">
    <div style="height: 20rem;" data-bs-toggle="modal" data-bs-target="#book-modal${book.id}">
    <img src=${book.image}
        class="card-img-top object-fit-contain pt-2" alt="${book.name}" height="70%">
    <div class="card-body py-0">
        <h5 class="card-title mx-0  my-2 py-0 titles text-capitalize">${book.name} (${book.year})</h5>
        <p class="card-text d-flex justify-content-between m-0 titles text-capitalize"> ${book.author}</p>
        <p class="card-text d-flex justify-content-between m-0 titles text-capitalize"> ${user.location} <span class="ms-5"> ${book.transaction}
            (${book.price})</span>
        </p>
      </div>
    </div>
    <!-- modal for each card -->
    <div class="modal fade" id="book-modal${book.id}" tabindex="-1" aria-labelledby="book-modal${book.id}" aria-hidden="true">
      <div class="modal-dialog  modal-dialog-centered box-shadow-modal ">
        <div class="modal-content bg-our-white">
          <div class="modal-header d-flex justify-content-between ">
            <h1 class="modal-title fs-5 titles fw-bolder text-capitalize" id="book-modal${book.id}">${book.name} (${book.year})</h1>
            <i class="bi bi-x-lg btn titles" data-bs-dismiss="modal" aria-label="Close"></i>
          </div>
          <div class="px-3 modal-body row">
            <div class="col-6 d-flex flex-column justify-content-center">
              <h5 class="modal-title mb-2 titles fw-bolder"> Descripción: </h5>
              <p class="modal-text general-text"> ${book.description}</p>
            </div>
            <img src=${book.image}
              class="object-fit-contain col-6" alt=${book.name}>
          </div>
          <div class="px-3 modal-body row">
            <div class="col-6">
              <p class="modal-text mb-0 general-text text-capitalize"> <span class="modal-title fw-bolder titles">Autor: </span> ${book.author}</p>
              <p class="modal-text mb-0 general-text text-capitalize"> <span class="modal-title fw-bolder titles">Editorial: </span>
                ${book.publisher}</p>
              <p class="modal-text mb-0 general-text text-capitalize"> <span class="modal-title fw-bolder titles">Localidad:
                </span> ${user.location} </p>
              <p class="modal-text mb-0 general-text text-capitalize"> <span class="modal-title fw-bolder titles">Transacción:
                </span>
                ${book.transaction}
                (${book.price})
              </p>
            </div>
            <!-- Conditional information -->
            <div id="owner-info${book.id}" class= "col-6">
            <p class="modal-text mb-4 general-text text-center"> <span class="modal-title fw-bolder titles text-capitalize"> ${user.nickname}</span>, eres el dueño de este libro
            </p>
          <button class="btn btn-edit mx-2 titles fw-bold bg-our-white"><i class="bi bi-pencil-square"></i>
            Editar</button>
          <button class="btn btn-delete titles fw-bold bg-creamy"> <i
              class="bi bi-trash-fill"></i>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
    `
})
showUserInfo(myProfileInfo, user) 

logout.addEventListener('click', () => {
    if (confirm("¿Está seguro de cerrar sesión?")) {
        localStorage.removeItem('userLogged')
        window.location.href = "/"
    }
})