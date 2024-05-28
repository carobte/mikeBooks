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
    const response = await fetch(`${API}/${userID}`)
    const data = await response.json()
    console.log(data)
    return data
}

// Function to create a new user 
export async function createUser(user) {
    await fetch(API, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// Function to delete a user
export async function deleteUser(userID) {
    await fetch(`${API}/${userID}`, {
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


//function enter and enter book

// async function handleEventAddSumit() {
//     const btnEnviar = document.querySelector('#enviar');

//     btnEnviar.addEventListener('click', async () => {
//         let newBook = {
//             "id": "5",
//             "name": "Don Quijote de la Mancha",
//             "year": "1605",
//             "author": "Miguel de Cervantes",
//             "publisher": "Francisco de Robles",
//             "description": "A story of a nobleman who reads so many chivalric romances that he loses his sanity and decides to become a knight-errant.",
//             "image": "https://images.cdn1.buscalibre.com/fit-in/360x360/07/e8/07e80d26f5f3f11e0f07e8a702e8023c.jpg",
//             "transaction": "sell",
//             "price": "60000"
//         };

//         let userId = "2";

//         try {
//             let response = await fetch(`http://localhost:3000/users/${userId}`);
//             let user = await response.json();

//             user.books.push(newBook);

//             let updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(user)
//             });

//             let data = await updateResponse.json();
//             console.log('Usuario actualizado:', data);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     });
// }

export async function createBook(userId, newBook) {
    const response = await fetch(`${API}/${userId}`)
    const user = await response.json()
    user.books.push(newBook)
    let updateResponse = await fetch(`${API}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })


} 

// actualizar 



