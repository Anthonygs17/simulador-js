const cursos = [
    {
        id: 1,
        nombre: "Desarrollo Web",
        descripcion: "Aprende a crear sitios web con HTML, CSS y JavaScript",
        duracion: 12,
        valor: 180
    },
    {
        id: 2,
        nombre: "Desarrollo Backend",
        descripcion: "Aprende a crear servidores con Node.js, Express y MongoDB",
        duracion: 12,
        valor: 210
    },
    {
        id: 3,
        nombre: "Desarrollo móvil",
        descripcion: "Aprende a crear aplicaciones móviles con Flutter",
        duracion: 16,
        valor: 260
    },
    {
        id: 4,
        nombre: "Desarrollo de videojuegos",
        descripcion: "Aprende a desarrollar videojuegos con Unity",
        duracion: 16,
        valor: 280
    },
    {
        id: 5,
        nombre: "Inteligencia artificial",
        descripcion: "Aprende a crear modelos de inteligencia artificial con Python",
        duracion: 16,
        valor: 250
    }
];

const cart = [];

function mostrarCursos(){
    let lista = document.createElement("ol");
    lista.className = "list-group list-group-numbered";
    lista.style.margin = "0rem 2rem 1rem";
    cursos.forEach(curso => {
        let item = document.createElement("li");
        item.className = "list-group-item";
        item.style.whiteSpace = "pre";
        item.textContent = `${curso.nombre}\n${curso.descripcion}\nDuración: ${curso.duracion} semanas\t\t\t\t\t\tPrecio: $${curso.valor}`;
        lista.appendChild(item);
    });
    document.getElementById("content").insertBefore(lista, document.getElementById("interaccion"));
}

function elegirCurso(){
    let pregunta = document.getElementById("pregunta");
    pregunta.textContent = "Ingrese el número del curso en el que desea inscribirse";
    let cuadro = document.getElementById("cuadro");
    cuadro.setAttribute("type", "number");
    let boton = document.getElementById("boton-send");
    boton.onclick = function(){
        if(document.getElementById("error") !== null){
            document.getElementById("interaccion").removeChild(document.getElementById("error"));
        }
        let eleccion = parseInt(cuadro.value);
        let curso = cursos.find(curso => curso.id === eleccion);
        if(curso !== undefined){
            cart.push(curso);
            let inscripcion = document.createElement("p");
            inscripcion.textContent = `Se ha inscrito correctamente a ${curso.nombre}`;
            document.getElementById("interaccion").insertBefore(inscripcion, pregunta);
            pregunta.textContent = "¿Desea inscribirse en otro curso? (s/n)";
            cuadro.setAttribute("type", "text");
            cuadro.value = "";
            consultarUsuario();
        }else{
            let error = document.createElement("p");
            error.setAttribute("id", "error");
            error.textContent = `Curso ${eleccion} no encontrado, intente de nuevo`;
            document.getElementById("interaccion").appendChild(error);
        }
    };
}

function realizarInscripcion(){
    let pregunta = document.createElement("p");
    pregunta.textContent = "¿Desea inscribirse en un curso? (s/n)";
    pregunta.setAttribute("id", "pregunta");
    document.getElementById("interaccion").appendChild(pregunta);
    let cuadro = document.createElement("input");
    cuadro.setAttribute("id", "cuadro");
    cuadro.setAttribute("type", "text");
    document.getElementById("interaccion").appendChild(cuadro);
    let boton = document.createElement("button");
    boton.textContent = "Enviar";
    boton.setAttribute("id", "boton-send");
    boton.className = "btn btn-secondary";
    document.getElementById("interaccion").appendChild(boton);
    boton.onclick = function(){
        let eleccion = cuadro.value;
        if(eleccion === "n" || eleccion === null || eleccion === "" || eleccion !== "s"){
            let despedida = document.createElement("p");
            despedida.textContent = "¡Gracias por visitarnos!";
            document.getElementById("interaccion").appendChild(despedida);
            cuadro.disabled = true;
            boton.disabled = true;
        }else{
            elegirCurso();
        }
    };
}

function consultarUsuario(){
    let cuadro = document.getElementById("cuadro");
    let boton = document.getElementById("boton-send");
    boton.onclick = function(){
        let eleccion = cuadro.value;
        if(eleccion === "n" || eleccion === null || eleccion === "" || eleccion !== "s"){
            let despedida = document.createElement("p");
            despedida.textContent = "¡Gracias por su inscripcion!";
            document.getElementById("interaccion").appendChild(despedida);
            cuadro.disabled = true;
            boton.disabled = true;
            localStorage.setItem("cursos", JSON.stringify(cart));
        }else{
            let interaccion = document.getElementById("interaccion");
            interaccion.removeChild(interaccion.firstChild);
            elegirCurso();
        }
    };
}

function iniciarSimulador(){
    let boton = document.getElementById("boton-start");
    boton.disabled = true;
    let texto = document.createElement("p");
    texto.textContent = "¡Bienvenido a CodingTec! A continuación, le mostraremos los cursos disponibles";
    document.getElementById("content").insertBefore(texto, document.getElementById("interaccion"));
    mostrarCursos();
    realizarInscripcion();
}
