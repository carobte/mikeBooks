// Get log in form from index.html
const loginForm = document.querySelector('#login-form')
// Get username from index.html
const usernameLogin = document.querySelector('#username-login')
// Get password from index.html
const passwordLogin = document.querySelector('#password-login')
// Create a const for the API
const API = "http://localhost:3000/users"

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const user = await validateUsername(usernameLogin.value.toLowerCase())
    if (!user) {
        alert("Usuario incorrecto o no estás registrado")
    } else {
        if (user.password === passwordLogin.value.toLowerCase()) {
            alert("Has iniciado sesión") 
            localStorage.setItem("userOnline",JSON.stringify(user))   
        } else {
            alert("Contraseña incorrecta")
        }
    }
})


async function validateUsername(usernameLogin) {
    const response = await fetch(`${API}?nickname=${usernameLogin}`)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (data.length === 1) {
        return data[0]
    } else {
        return false
    }
}

console.log(loginForm)
console.log(passwordLogin)
console.log(usernameLogin)