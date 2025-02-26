// Calculadora de Indice de Masa Corporal

// Función para calcular el IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Función para clasificar el IMC
function clasificarIMC(imc) {
    if (imc < 18.5) {
        return "Bajo peso";
    } else if (imc < 24.9) {
        return "Peso normal";
    } else if (imc < 29.9) {
        return "Sobrepeso";
    } else {
        return "Obesidad";
    }
}

// Array para almacenar los resultados
let historialIMC = [];

// Ciclo para repetir el cálculo si el usuario desea
let continuar = true;
while (continuar) {
    let peso = parseFloat(prompt("Ingrese su peso en kg:"));
    let altura = parseFloat(prompt("Ingrese su altura en metros:"));
    
    if (!isNaN(peso) && !isNaN(altura) && peso > 0 && altura > 0) {
        let imc = calcularIMC(peso, altura);
        let clasificacion = clasificarIMC(imc);
        
        alert(`Su IMC es ${imc.toFixed(2)} - ${clasificacion}`);
        console.log(`IMC: ${imc.toFixed(2)} - Clasificación: ${clasificacion}`);
        
        historialIMC.push({ peso, altura, imc: imc.toFixed(2), clasificacion });
    } else {
        alert("Por favor, ingrese valores válidos.");
    }
    
    continuar = confirm("¿Desea calcular otro IMC?");
}

// Mostrar el historial en consola
console.log("Historial de IMC:", historialIMC);
