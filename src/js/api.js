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

// createBook function
export async function createBook(userId, newBook) {
    let response = await fetch(`${API}/${userId}`)
    let user = await response.json()

    user.books.push(newBook);

    let updateResponse = await fetch(`${API}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    let data = await updateResponse.json()
    console.log('Usuario actualizado:', data)

}
// funcion de actualizar
async function updateBook(userId, bookId, name, publisher, year, author, transaction, price, description, image) {
    try {

        let response = await fetch(`http://localhost:3000/users/${userId}`)
        let user = await response.json()


        let bookIndex = user.books.findIndex(book => book.id === bookId)
        if (bookIndex === -1) {
            throw new Error('Book not found')
        }

        user.books[bookIndex] = {
            id: bookId,
            name: name,
            year: year,
            author: author,
            publisher: publisher,
            description: description,
            image: image,
            transaction: transaction,
            price: price
        };

        let updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!updateResponse.ok) {
            throw new Error('Network response was not ok ' + updateResponse.statusText);
        }

        let data = await updateResponse.json();
        console.log('Usuario actualizado:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to delete a book
export async function deleteBook(userId, bookId) {
    let response = await fetch(`${API}/${userId}`);
    let user = await response.json();
    user.books = user.books.filter(book => book.id !== bookId);
    let updateResponse = await fetch(`${API}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}



