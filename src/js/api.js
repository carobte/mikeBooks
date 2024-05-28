// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Endpoint JSON
const API = "http://localhost:3000/users"

// Function to get all the users
export async function getUsers() {
    const response = await fetch(API)
    const data = await response.json()
    return data    
}

// Function to get one specific user
export async function getUserID(userID) {
    const response = await fetch(`${API}/${id}`)
    const data = await response.json()
    console.log(data)
    return data  
}

// Function to create a new user 
export async function createUser(user){
    await fetch(API, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// Function to delete a user
export async function deleteUser(userID){
    await fetch( `${API}/${userID}`, {
        method: 'DELETE'
    })
}


// Function to validate if a user exists 
export async function validateUsername(usernameLogin) {
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

