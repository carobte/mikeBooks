//import sweetalert 
import Swal from 'sweetalert2'

export function oopsAlert(message) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${message}`
    })
}

export function alertAside(message) {
    Swal.fire({
        position: "top-end",
        icon: "warning",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500
    })
}
