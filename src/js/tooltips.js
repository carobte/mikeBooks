// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap';

/* import { Tooltip, Toast, Popover } from 'bootstrap';  */

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'


    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')


    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }


            form.classList.add('was-validated')
        }, false)
    })
})()


const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))