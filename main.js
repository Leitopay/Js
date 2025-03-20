// Seleccionar elementos del DOM
const form = document.getElementById("imcForm");
const resultadoDiv = document.getElementById("resultado");
const historialUl = document.getElementById("historial");

// Cargar historial desde localStorage
let historialIMC = JSON.parse(localStorage.getItem("historialIMC")) || [];

// Función para calcular el IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Función para clasificar el IMC
function clasificarIMC(imc) {
    if (imc < 18.5) return "Bajo peso";
    if (imc < 24.9) return "Peso normal";
    if (imc < 29.9) return "Sobrepeso";
    return "Obesidad";
}

// Función para actualizar el historial en el DOM
function actualizarHistorial() {
    historialUl.innerHTML = "";
    historialIMC.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = `Peso: ${entry.peso} kg, Altura: ${entry.altura} m, IMC: ${entry.imc} - ${entry.clasificacion}`;
        historialUl.appendChild(li);
    });
}

// Evento para calcular el IMC
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el recargar la página

    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    if (!isNaN(peso) && !isNaN(altura) && peso > 0 && altura > 0) {
        let imc = calcularIMC(peso, altura);
        let clasificacion = clasificarIMC(imc);

        // Mostrar resultado en el DOM
        resultadoDiv.innerHTML = `<p>Su IMC es <strong>${imc.toFixed(2)}</strong> - ${clasificacion}</p>`;

        // Guardar en historial
        let nuevoRegistro = { peso, altura, imc: imc.toFixed(2), clasificacion };
        historialIMC.push(nuevoRegistro);
        localStorage.setItem("historialIMC", JSON.stringify(historialIMC));

        // Actualizar historial en el DOM
        actualizarHistorial();
        
        // Limpiar formulario
        form.reset();
    } else {
        resultadoDiv.innerHTML = `<p style="color: red;">Por favor, ingrese valores válidos.</p>`;
    }
});

// Función para borrar el historial y el resultado del IMC
function borrarHistorial() {
    historialIMC = []; // Vaciar el array en memoria
    localStorage.removeItem("historialIMC"); // Eliminar del localStorage
    document.getElementById("historial").innerHTML = ""; // Limpiar la lista en el DOM
    document.getElementById("resultado").textContent = ""; // BORRAR RESULTADO IMC
}

// Evento para el botón de borrar historial
document.getElementById("borrarHistorial").addEventListener("click", borrarHistorial);



// Cargar historial al inicio
actualizarHistorial();
