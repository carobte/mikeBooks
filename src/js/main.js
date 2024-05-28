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
const API = "http://localhost:3000/users"
const radioInput = document.querySelector('#radio-input')
let subscription 

//get subscription value
radioInput.addEventListener('click', function (event) {
    if (event.target.getAttribute('name') === "options-base") {
        subscription =  event.target.getAttribute('value')
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

