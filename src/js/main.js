// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


// Get log in form from index.html
const loginForm = document.querySelector('#login-form')
// Get username from index.html
const usernameLogin = document.querySelector('#username-login')
// Get password from index.html
const passwordLogin = document.querySelector('#password-login')
// Create a const for the API

import { getUsers, validateUsername } from "./api.js"

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const user = await validateUsername(usernameLogin.value.toLowerCase())
    if (!user) {
        alert("Usuario incorrecto o no estás registrado")
    } else {
        if (user.password === passwordLogin.value.toLowerCase()) {
            alert("Has iniciado sesión") 
            localStorage.setItem("userLogged",JSON.stringify(user))   
        } else {
            alert("Contraseña incorrecta")
        }
    }
    loginForm.reset()
})
