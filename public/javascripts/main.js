'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')
 
const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
}







//EVENTS CLIENTES

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

//EVENTS BOTÕES

// document.getElementById('salvar')
//     .addEventListener('click', saveClient)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)
   