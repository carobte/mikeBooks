// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//import functions from api.js
import { getUsers, validateUsername, createUser } from "./api.js"

// Get log in form data from index.html
const loginForm = document.querySelector('#login-form')
const usernameLogin = document.querySelector('#username-login')
const passwordLogin = document.querySelector('#password-login')

//get registration form data
const registrationForm = document.querySelector('#registration-form')
const username = document.querySelector('#username')
const location = document.querySelector('#localidad')
const email = document.querySelector('#email')
const number = document.querySelector('#number')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirm-password')
const image = document.querySelector('#image')
const radioInput = document.querySelector('#radio-input')
let subscription

//get subscription value
radioInput.addEventListener('click', function (event) {
  if (event.target.getAttribute('name') === "options-base") {
    subscription = event.target.getAttribute('value')
    console.log(subscription)
  }
})

// add submit event listener to login form
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const user = await validateUsername(usernameLogin.value)
    if (!user) {
        alert("Usuario incorrecto o no estás registrado")
    } else {
      if (user.password === passwordLogin.value.toLowerCase()) {
      alert("Has iniciado sesión")
      localStorage.setItem("userLogged", JSON.stringify(user))
    } else {
      alert("Contraseña incorrecta")
    }
  }
  loginForm.reset()
})

//add submit event listener to registration form 
registrationForm.addEventListener('submit', async function (event) {
  event.preventDefault()
  let userExists = await validateUsername(username.value)
  if (userExists) {
    alert("Usuario ya existe")
    registrationForm.reset()
  } else {
    if (password.value === confirmPassword.value) {
      const newUser = {
        "nickname": username.value,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.svg/1200px-JavaScript-logo.svg.png",
        "location": location.value.toLowerCase(),
        "password": password.value,
        "number": number.value,
        "email": email.value.toLowerCase(),
        "subscription": subscription,
        "books": [],
        "reviews": []
      }
      createUser(newUser)
      registrationForm.reset()
    } else {
      alert("Las contraseñas no coinciden")
    }
  }
})

// Function to validate if there's a user logged in

function isLogged() {
  let userLogged = JSON.parse(localStorage.getItem("userLogged"))
  if (!userLogged) {
    return false
  } else {
    return userLogged
  }
}

// Print books

const containerBooks = document.querySelector("#container-books")

async function indexBooks(container) {
  let users = await getUsers()
  let userLogged = isLogged()

  // Extract the books from all the users
  users.forEach(user => {
    const books = user.books
    // Print each book in the container
    books.forEach(book => {
      // It was necessary to create a new div because container.innerHTML was breaking the events.
      const newDiv = document.createElement("div")
      container.appendChild(newDiv)
      newDiv.innerHTML = `
      <!-- card -->
        <article class="card bg-our-white mt-5">
        <div style="height: 20rem;" data-bs-toggle="modal" data-bs-target="#book-modal${book.id}">
        <img src=${book.image}
            class="card-img-top object-fit-contain pt-2" alt="${book.name}" height="70%">
        <div class="card-body py-0">
            <h5 class="card-title mx-0  my-2 py-0 titles text-capitalize">${book.name} (${book.year})</h5>
            <p class="card-text d-flex justify-content-between m-0 titles text-capitalize"> ${book.author}</p>
            <p class="card-text d-flex justify-content-between m-0 titles text-capitalize"> ${user.location} <span class="ms-5"> ${book.transaction}
                $${book.price}</span>
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
                    $${book.price}
                  </p>
                </div>
                <!-- Conditional information -->
                <div id="owner-info${book.id}" class= "col-6">

                </div>
              </div>
            </div>
          </div>
        </div>
      </article>`

      // Conditional prints for owner info on the modals.
      let ownerInfo = document.querySelector(`#owner-info${book.id}`)

      // No user logged in
      if (!userLogged) {
        ownerInfo.innerHTML = `                  
        <p data-bs-dismiss="modal" class="modal-text mb-4 general-text"> Para ver la información de contacto, debes
          <a href="#login-form" class="titles modal-anchor text-decoration-none fw-bold">Iniciar sesión</a>
        </p>
        <p data-bs-dismiss="modal" class="modal-text mb-4 general-text">¿No tienes una cuenta aún? <a href="#registration-form"
          class="titles modal-anchor text-decoration-none fw-bold">Registrate</a></p>
          `
      // If there's a user logged in
      } else if(userLogged ){
        // If the user logged in is the owner of the book
          if(userLogged.id === user.id){
            ownerInfo.classList.add("align-content-center", "btns-owner")
            ownerInfo.innerHTML = `
            <p class="modal-text mb-4 general-text text-center"> <span class="modal-title fw-bolder titles text-capitalize"> ${user.nickname}</span>, eres el dueño de este libro
            </p>
          <button class="btn btn-edit mx-2 titles fw-bold bg-our-white"><i class="bi bi-pencil-square"></i>
            Editar</button>
          <button class="btn btn-delete titles fw-bold bg-creamy"> <i
              class="bi bi-trash-fill"></i>Eliminar</button>`
          } else {
            // User logged in and different of the owner
            ownerInfo.innerHTML = `
            <div class="text-decoration-none" id='key-${user.id}'>
                <p class="modal-text mb-4 general-text text-capitalize"> <span class="modal-title fw-bolder titles ">Dueño:
                </span> ${user.nickname}</p>
                <a href="https://wa.me/+57${user.number}/?text=Hola, deseo más información sobre tu libro: ${book.name}"
                target="_blank"
                class="modal-title modal-anchor fw-bolder mb-0 text-decoration-none titles d-block"><i
                    class="bi bi-whatsapp green-wsp"></i> Chatea conmigo</a>
                <a href="mailto:${user.email}?Subject=Interesado%20en%20el%20libro%20${book.name}" target="_blank"
                class="modal-title modal-anchor fw-bolder mb-0 text-decoration-none titles d-block"><i
                    class="bi bi-envelope text-primary "></i> Escríbeme un correo</a>
            </div>`

            document.getElementById("key-" + user.id).addEventListener("click", ()=> saveOwner(user))
          }
      }
    })
  })
}


indexBooks(containerBooks)

// Function to saveOwner in localStorage and go to their profile
function saveOwner(user) {
  localStorage.setItem("owner", JSON.stringify(user)) 
  window.location.href="./src/pages/profileOwner.html"
}


// Function to clear Owner from localStorage
function clearOwner(){
  localStorage.removeItem("owner")
}

// Clear Owner each time the user enters in index.html
clearOwner()