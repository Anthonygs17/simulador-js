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

function mostrarCursos(){
    for(let i=0; i<cursos.length; i++){
        console.log(`${i+1}. Curso: ${cursos[i].nombre}\nDescripción: ${cursos[i].descripcion}\nDuración: ${cursos[i].duracion} semanas\t\tValor: $${cursos[i].valor}`);
    }
}

function elegirCurso(){
    let eleccion = parseInt(prompt("Ingrese el número del curso en el que desea inscribirse"));
    let curso = cursos.find(curso => curso.id === eleccion);
    if(curso !== undefined){
        console.log(`Se ha inscrito correctamente a ${curso.nombre}`);
    }else{
        console.log("Curso no encontrado, intente de nuevo");
    }
}

function realizarInscripcion(){
    let eleccion = prompt("¿Desea inscribirse en un curso? (s/n)");
    if(eleccion === "n" || eleccion === null || eleccion === "" || eleccion !== "s"){
        console.log("¡Gracias por visitarnos!");
    }else{
        while(eleccion === "s"){
            elegirCurso();
            eleccion = prompt("¿Desea inscribirse en otro curso? (s/n)");
        }
        console.log("¡Gracias por su inscripción!");
    }
}

function iniciarSimulador(){
    alert("¡Bienvenido a CodingTec!\nA continuación, le mostraremos los cursos disponibles");
    mostrarCursos();
    realizarInscripcion();
}

iniciarSimulador();