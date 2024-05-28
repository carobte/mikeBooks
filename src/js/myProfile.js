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

// event submit form book create
booksForm.addEventListener('submit', (e) => {
    e.preventDefault()
    createBook(name, publisher, year, author, transaction, price, description, image) // call createBook function
})

//event change for transaction and price
transaction.addEventListener("change", ()=>{
    // condicional to verify transaction value
    if (transaction.value=== "trade") {
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


