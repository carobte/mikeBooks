const booksForm = document.querySelector('#books-form')
const name = document.querySelector('#book-name')
const publisher = document.querySelector('#publishing-house')
const year = document.querySelector('#publication-year') 
const author = document.querySelector('#author')
const transaction = document.querySelector('#transaction')
const price = document.querySelector('#price')
const description = document.querySelector('#description')
const image = document.querySelector('#input-image')

booksForm.addEventListener('submit', (e) => {
    e.preventDefault()
    createBook(name, publisher, year, author, transaction, price, description, image)
})

transaction.addEventListener("change", ()=>{
    if (transaction.value=== "trade") {
        price.value=0
        price.setAttribute("disabled", "")
    } else {
        price.removeAttribute("disabled", "")
    }
})

function createBook (name, publisher, year, author, transaction, price, description, image) {
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


