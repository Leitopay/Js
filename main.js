document.addEventListener("DOMContentLoaded", () => {
    // Cargar clasificaciones del archivo JSON
    async function obtenerDatosClasificacion() {
        try {
            const respuesta = await fetch("datos.json");
            const datos = await respuesta.json();
            console.log("Clasificaciones obtenidas:", datos);
            return datos;
        } catch (error) {
            console.warn("Error al cargar datos:", error);
        }
    }

    // Clase para representar un registro de IMC
    class RegistroIMC {
        constructor(peso, altura, imc, clasificacion, fecha) {
            this.peso = peso;
            this.altura = altura;
            this.imc = imc;
            this.clasificacion = clasificacion;
            this.fecha = fecha;
        }
    }

    // Función para calcular el IMC
    function calcularIMC(peso, altura) {
        return peso / (altura * altura);
    }

    // Función para clasificar el IMC
    function clasificarIMC(imc, clasificaciones) {
        for (let clasificacion of clasificaciones) {
            const min = clasificacion.min;
            const max = clasificacion.max;
    
            if (imc >= min && (max === null || imc <= max)) {
                return clasificacion.clasificacion;
            }
        }
        return "IMC fuera de rango";
    }
    
    
    // Cargar historial desde localStorage o iniciar uno nuevo
    let historialIMC = JSON.parse(localStorage.getItem("historialIMC")) || [];

    // Función para renderizar historial en el DOM
    // Función para renderizar historial en el DOM
    function mostrarHistorial() {
    const contenedor = document.getElementById("historial");
    contenedor.innerHTML = "";
    historialIMC.forEach((registro) => {
        const card = document.createElement("div");
        card.className = "card animate__animated animate__fadeIn"; // Añadimos animación
        card.innerHTML = `
            <p><strong>Fecha:</strong> ${registro.fecha}</p>
            <p><strong>Peso:</strong> ${registro.peso} kg</p>
            <p><strong>Altura:</strong> ${registro.altura} m</p>
            <p><strong>IMC:</strong> ${registro.imc}</p>
            <p><strong>Clasificación:</strong> ${registro.clasificacion}</p>
        `;
        contenedor.appendChild(card);
    });
    }


    // Lógica principal de cálculo
    const formulario = document.getElementById("imcForm");
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const peso = parseFloat(document.getElementById("peso").value);
        const altura = parseFloat(document.getElementById("altura").value);

        if (!isNaN(peso) && !isNaN(altura) && peso > 0 && altura > 0) {
            const imc = calcularIMC(peso, altura);
            const clasificaciones = await obtenerDatosClasificacion();
            const clasificacion = clasificarIMC(imc, clasificaciones);
            const fecha = new Date().toLocaleString();

            const nuevoRegistro = new RegistroIMC(peso, altura, imc.toFixed(2), clasificacion, fecha);
            historialIMC.push(nuevoRegistro);
            localStorage.setItem("historialIMC", JSON.stringify(historialIMC));

            // Mostrar el historial de IMC
            mostrarHistorial();

            // Mostrar el IMC calculado
            Swal.fire({
                title: "IMC Calculado",
                text: `Tu IMC es ${imc.toFixed(2)} (${clasificacion})`,
                icon: "info",
                confirmButtonText: "Aceptar"
            });
        }
    });

    // Función para borrar historial
    const botonBorrar = document.getElementById("borrarHistorial");
    botonBorrar.addEventListener("click", () => {
        localStorage.removeItem("historialIMC");
        historialIMC = [];
        mostrarHistorial();
    });

    // Mostrar historial al cargar la página
    mostrarHistorial();
});
