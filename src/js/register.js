//get form data
const registrationForm = document.querySelector('#registration-form')
const username = document.querySelector('#username')
const location = document.querySelector('#localidad')
const email = document.querySelector('#email')
const number = document.querySelector('#number')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirm-password')
const image = document.querySelector('#image')
let subscription = document.querySelector('input[name="options-base"]:checked')
const API = "http://localhost:3000/users"

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault()
    validateUsername(username)
    newUser = {
        "nickname": username.value,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.svg/1200px-JavaScript-logo.svg.png",
        "location": location.value.toLowerCase(),
        "password": password.value,
        "number": number.value,
        "email": email.value.toLowerCase(),
        "subscription": subscription.value,
        "books": [],
        "reviews": []
    }
})

