import { getUserID } from "./api"

const infoOwner = document.querySelector('#owner-info')

async function showInfoOwner() {
//    const owner = JSON.parse(localStorage.getItem('ownerID'))
    const owner = await getUserID('3')
    console.log(owner)
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
}

showInfoOwner()



