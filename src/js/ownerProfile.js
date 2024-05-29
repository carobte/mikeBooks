// get html elements
const infoOwner = document.querySelector('#owner-info')
const logout = document.getElementById('log-out').addEventListener('click', () => {
  if (confirm("¿Está seguro de cerrar sesión?")) {
      localStorage.removeItem('userLogged')
      window.location.href = "/"
  }
})
let containerBooks = document.querySelector('#container-books')
let containerComments = document.querySelector('#container-comments')

// show information owner function
function showInfoOwner() {
    const owner = JSON.parse(localStorage.getItem('owner')) // extract data in local storage
    console.log(owner.books)
    const listBooksOwner = owner.books // get just books of owner
    const commentsToOwner = JSON.parse(localStorage.getItem('userLogged')) // extract data in local storage of my user logged
    const myReviews = commentsToOwner.reviews
    console.log(myReviews)

    // html content inner
    infoOwner.innerHTML += `
            <article class="row gap-4 p-4 justify-content-between align-items-center">
                <div
                    class="col-sm-4 d-flex justify-content-center align-items-center rounded-1 p-2 py-md-5 px-md-3 h-100 container-icon-user">
                    <img class="col-6 col-md-8 col-xl-12" src="/public/icons/user-avatar.png" alt="icon-user">
                </div>
                <div class="col-sm-6 d-flex flex-column gap-4 general-text">
                    <h3 class="titles mb-5 text-capitalize">${owner.nickname}</h3>
                    <h3 class="titles">Información del contacto</h3>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item border-0 text-capitalize">${owner.location}</li>
                        <li class="list-group-item border-0">${owner.number}</li>
                        <li class="list-group-item border-0">${owner.email}</li>
                    </ul>
                </div>
            </article>
    `
    
    // foreach of each book
    listBooksOwner.forEach(book => {
        containerBooks.innerHTML += `
        <article class="card bg-our-white mt-5">
        <div style="height: 20rem;" data-bs-toggle="modal" data-bs-target="#${book.id}">
          <img src="${book.image}"
            class="card-img-top object-fit-contain pt-2" alt="${book.name}" height="70%">
          <div class="card-body py-0">
            <h5 class="card-title mx-0  my-2 py-0 titles text-capitalize">${book.name} (${book.year})</h5>
            <p class="card-text d-flex justify-content-between m-0 titles text-capitalize"> ${book.author} <span class="text-capitalize">
                ${book.publisher}</span></p>
            <p class="card-text d-flex justify-content-between m-0 titles text-capitalize"> ${owner.location} <span> ${book.transaction}
                (${book.price})</span>
            </p>
          </div>
        </div>
        
        <div class="modal fade" id="${book.id}" tabindex="-1" aria-labelledby="${book.id}" aria-hidden="true">
          <div class="modal-dialog  modal-dialog-centered box-shadow-modal ">
            <div class="modal-content bg-our-white">
              <div class="modal-header d-flex justify-content-between ">
                <h1 class="modal-title fs-5 titles fw-bolder text-capitalize" id="book-modal1">${book.name} (${book.year})</h1>
                <i class="bi bi-x-lg btn titles" data-bs-dismiss="modal" aria-label="Close"></i>
              </div>
              <div class="px-3 modal-body row">
                <div class="col-6 d-flex flex-column justify-content-center">
                  <h5 class="modal-title mb-2 titles fw-bolder"> Descripción: </h5>
                  <p class="modal-text general-text">${book.description}</p>
                </div>
                <img src="${book.image}"
                  class="object-fit-contain col-6" alt="${book.name}">
              </div>
              <div class="px-3 modal-body row">
                <div class="col-6">
                  <p class="modal-text mb-0 general-text text-capitalize"> <span class="modal-title fw-bolder titles">Autor: </span> ${book.author}</p>
                  <p class="modal-text mb-0 general-text text-capitalize"> <span class="modal-title fw-bolder titles">Editorial: </span>
                    ${book.publisher}</p>
                  <p class="modal-text mb-0 general-text text-capitalize"> <span class="modal-title fw-bolder titles">Localidad:
                    </span> ${owner.location} </p>
                  <p class="modal-text mb-0 general-text text-capitalize"> <span class="modal-title fw-bolder titles">Transacción:
                    </span>
                    ${book.transaction} (${book.price})
                  </p>
                </div>
                <div class="owner-info col-6">
                  <a  href="./src/pages/profileOwner.html" class="text-decoration-none">
                  <p class="modal-text mb-4 general-text text-capitalize"> <span class="modal-title fw-bolder titles">Dueño:
                    </span> ${owner.nickname}</p>
                  <a href="https://wa.me/+57${owner.number}/?text=Hola, deseo más información sobre tu libro:"
                    target="_blank"
                    class="modal-title modal-anchor fw-bolder mb-0 text-decoration-none titles d-block"><i
                      class="bi bi-whatsapp green-wsp"></i> Chatea conmigo</a>
                  <a href="mailto:${owner.email}?Subject=Interesado%20en%20el%20libro" target="_blank"
                    class="modal-title modal-anchor fw-bolder mb-0 text-decoration-none titles d-block"><i
                      class="bi bi-envelope text-primary "></i> Escríbeme un correo</a>
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
        ` 

    // foreach of my comments
    myReviews.forEach(comment => {
      containerComments.innerHTML += `
        <div class="p-3 rounded-1 bg-creamy comment-box">
          <p class="comment">
            ${comment.msg}
          </p>
        </div>
      `
    })
    });
}

showInfoOwner()



