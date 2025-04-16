document.addEventListener("DOMContentLoaded", () => {
        // Función para cargar las clasificaciones del JSON
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
            constructor(peso, altura, edad, genero, imc, clasificacion, fecha) {
                this.peso = peso;
                this.altura = altura;
                this.edad = edad;
                this.genero = genero;
                this.imc = imc;
                this.clasificacion = clasificacion;
                this.fecha = fecha;
            }
        }
    
        // Función para calcular el IMC (sin cambios)
        function calcularIMC(peso, altura) {
            return peso / (altura * altura);
        }
    
        // Función para clasificar el IMC 
        function clasificarIMC(imc, clasificaciones, edad, genero) {
            for (let clasificacion of clasificaciones) {
                const min = clasificacion.min;
                const max = clasificacion.max ?? Infinity;
                if (imc >= min && imc <= max) {
                    if (edad < 18) return clasificacion.clasificacion + " (adolescente)";
                    if (genero === "femenino" && imc < 20) return "Bajo para mujeres";
                    return clasificacion.clasificacion;
                }
            }
            return "IMC fuera de rango";
        }
            
        // Función para renderizar el historial
        let historialIMC = JSON.parse(localStorage.getItem("historialIMC")) || [];
        function mostrarHistorial() {
            const contenedor = document.getElementById("historial");
            contenedor.innerHTML = "";
            historialIMC.forEach((registro) => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <p><strong>Fecha:</strong> ${registro.fecha}</p>
                    <p><strong>Peso:</strong> ${registro.peso} kg</p>
                    <p><strong>Altura:</strong> ${registro.altura} m</p>
                    <p><strong>IMC:</strong> ${registro.imc}</p>
                    <p><strong>Clasificación:</strong> ${registro.clasificacion}</p>
                    <p><strong>Género:</strong> ${registro.genero}</p>
                    <p><strong>Edad:</strong> ${registro.edad} años</p>
                `;
                contenedor.appendChild(card);
            });
        }
    
        // Lógica principal del formulario
        const formulario = document.getElementById("imcForm");
        formulario.addEventListener("submit", async (e) => {
            e.preventDefault();
        
            const peso = parseFloat(document.getElementById("peso").value);
            const altura = parseFloat(document.getElementById("altura").value);
            const edad = parseInt(document.getElementById("edad").value);
            const genero = document.getElementById("genero").value;
        
            if (!isNaN(peso) && !isNaN(altura) && peso > 0 && altura > 0) {
                const imc = calcularIMC(peso, altura);
                const clasificaciones = await obtenerDatosClasificacion();
                const clasificacion = clasificarIMC(imc, clasificaciones, edad, genero);
                const fecha = new Date().toLocaleString();
        
                const nuevoRegistro = new RegistroIMC(peso, altura, edad, genero, imc.toFixed(2), clasificacion, fecha);
                historialIMC.push(nuevoRegistro);
                localStorage.setItem("historialIMC", JSON.stringify(historialIMC));
        
                mostrarHistorial();
        
                Swal.fire({
                    title: "IMC Calculado",
                    html: `Tu IMC es <strong>${imc.toFixed(2)}</strong><br>Clasificación: <strong>${clasificacion}</strong>`,
                    icon: "info",
                    confirmButtonText: "Aceptar"
                });
            }
        });
        
    
        // Función para borrar el historial
        const botonBorrar = document.getElementById("borrarHistorial");
        botonBorrar.addEventListener("click", () => {
            localStorage.removeItem("historialIMC");
            historialIMC = [];
            mostrarHistorial();
        });
    
        mostrarHistorial();
    });
    