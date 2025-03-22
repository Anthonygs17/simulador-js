import { notificarUsuario, confirmacionPopup } from "./utils.js";

let cursos = [];
let cart = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];

async function fetchData() {
    try {
        const response = await fetch("./data/cursos.json");
        cursos = await response.json();
    } catch (error) {
        console.error("Error", error);
    }
}

function updateCartStatus() {
    cart = localStorage.getItem("carrito");
    cart = cart ? JSON.parse(cart) : [];
    let cartCount = cart.length;

    const cartBtn = document.getElementById("cart-btn");
    const cartBadge = document.getElementById("cart-badge");
    cartBadge.textContent = cartCount;
    if (cartCount > 0) {
        cartBadge.classList.remove("d-none");
        cartBtn.style.cursor = "pointer";
        confirmEnrollment();
    } else {
        cartBadge.classList.add("d-none");
        cartBtn.style.cursor = "default";
        confirmEnrollment(false);
    }
}

function getCardsSelected() {
    const buttons = document.querySelectorAll("button[id^='btn-product-']");
    buttons.forEach(button => {
        const id = parseInt(button.id.split("-")[2]);
        const cursoAgregado = cart.some(curso => curso.id === id);
        if (cursoAgregado) {
            updateCardBtn(id);
        }
    });
}

function agregarCurso(id) {
    cart = localStorage.getItem("carrito");
    cart = cart ? JSON.parse(cart) : [];

    const cursoIndex = cart.findIndex(item => item.id === id);
    if (cursoIndex === -1) {
        const curso = cursos.find(curso => curso.id === id);
        cart.push(curso);
        localStorage.setItem("carrito", JSON.stringify(cart));
        notificarUsuario(`Se ha inscrito a ${curso.nombre}`);
        updateCardBtn(id);
        updateCartStatus();
        confirmEnrollment();
    } else {
        notificarUsuario("El curso ya se encuentra inscrito", "#f44336");
    }
}

function updateCardBtn(id){
    const button = document.getElementById(`btn-product-${id}`);
    button.textContent = "Inscrito";
    button.disabled = true;
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Quitar";
    botonBorrar.className = "btn btn-danger";
    botonBorrar.onclick = function () {
        cart = cart.filter(curso => curso.id !== id);
        localStorage.setItem("carrito", JSON.stringify(cart));
        notificarUsuario("Curso eliminado", "#f44336");
        updateCartStatus();
        button.textContent = "Inscribirme";
        button.disabled = false;
        button.parentNode.removeChild(botonBorrar);
    };
    button.parentNode.appendChild(botonBorrar);
}

function mostrarCursos(){
    const container = document.getElementById("card-container");
    cursos.forEach(curso => {
        let item = document.createElement("div");
        item.className = "col-md-3";
        item.innerHTML = `
        <div class="card">
            <img src="${curso.imagen}" class="card-img-top" alt="${curso.nombre}">
            <div class="card-body">
                <h5 class="card-title text-center">${curso.nombre}</h5>
                <p class="card-text">${curso.descripcion}</p>
                <p class="card-text">Duración: ${curso.duracion} semanas</p>
                <p class="card-text">Precio: $${curso.valor}</p>
            </div>
            <div class="card-footer text-center">
                <button class="btn btn-info" id="btn-product-${curso.id}">Inscribirme</button>
            </div>
        </div>`;
        container.appendChild(item);
        const button = item.querySelector(`#btn-product-${curso.id}`);
        button.addEventListener("click", () => {
            agregarCurso(curso.id);
        });
    });
    document.getElementById("content").insertBefore(container, document.getElementById("interaccion"));
}

function resetCards() {
    const container = document.getElementById("card-container");
    container.innerHTML = "";
    document.getElementById("content").insertBefore(container, document.getElementById("interaccion"));
    mostrarCursos();
}

function getTotalAmount() {
    return cart.reduce((acc, curso) => acc + curso.valor, 0);
}

function displayTotalAmount() {
    const interaccion = document.getElementById("interaccion");
    const totalTextId = "total-text";
    const confirmButtonId = "boton-confirmar";

    const existingTotalText = document.getElementById(totalTextId);
    if (existingTotalText) {
        interaccion.removeChild(existingTotalText);
    }

    const total = getTotalAmount();
    const totalText = document.createElement("h3");
    totalText.setAttribute("id", totalTextId);
    totalText.textContent = `Total a pagar: $${total}`;
    totalText.style.fontWeight = "bold";

    const confirmButton = document.getElementById(confirmButtonId);
    if (confirmButton) {
        interaccion.insertBefore(totalText, confirmButton);
    } else {
        interaccion.appendChild(totalText);
    }
}

function confirmEnrollment(pending = true) {
    if(pending == false){
        document.getElementById("interaccion").innerHTML = "";
        return;
    }
    displayTotalAmount();
    if(document.getElementById("boton-confirmar") !== null){
        return;
    }
    let boton = document.createElement("button");
    boton.textContent = "Confirmar inscripción";
    boton.className = "btn btn-lg btn-primary";
    boton.setAttribute("id", "boton-confirmar");
    boton.onclick = async function () {
        localStorage.setItem("carrito", JSON.stringify(cart));
        try {
            const result = await confirmacionPopup();
            const { name, email } = result;
            /* Aqui enviariamos la informacion del curso al correo del usuario... */
            limpiarContenido();
        }
        catch (error) {
            if(error === "Canceled"){
                return;
            }
            console.error(error);
            notificarUsuario("Error al enviar los datos", "#f44336");
        }
    };
    document.getElementById("interaccion").appendChild(boton);
}

function limpiarContenido() {
    localStorage.removeItem("carrito");
    updateCartStatus();
    resetCards();
    document.getElementById("interaccion").innerHTML = "";
}

async function iniciarSimulador() {
    let texto = document.createElement("p");
    texto.textContent = "¡Bienvenido! Ofrecemos los siguientes cursos";
    document.getElementById("content").insertBefore(texto, document.getElementById("interaccion"));
    await fetchData();
    mostrarCursos();
    updateCartStatus();
    getCardsSelected();
}

document.addEventListener("DOMContentLoaded", function () {
    iniciarSimulador();

    document.getElementById('cart-btn').addEventListener('click', function() {
        const confirmationButton = document.getElementById('boton-confirmar');
        if (confirmationButton) {
            confirmationButton.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
