// let nombre = "Leonardo";
// let edad = 19;
// let esEstudiante = true; // sin comillas para que sea booleano

// console.log(nombre);
// console.log(edad);
// console.log(esEstudiante);

// let numero1 = 10;
// let numero2 = 5;
// let suma = numero1 + numero2;

// console.log("La suma de " + numero1 + " y " + numero2 + " es: " + suma);

// let a = 12;
// let b = 15;

// let resta = a - b;
// let multiplicación = a * b;
// let division = a / b;

// console.log("La resta de " + a + " y " + b + " es: " + resta);
// console.log("La multiplicación de " + a + " y " + b + " es: " + multiplicación);
// console.log("La división de " + a + " y " + b + " es: " + division);

// let mayor = true;
// let dinero = true;

// if(mayor && dinero) {
//     console.log("Podes ingresar")
// } else {
//     console.log("No podes ingresar")
// }

// let paroimpar = Number(prompt("Ingresa un numero"));

// if(paroimpar % 2 === 0)  {
//     console.log("Es par")
// } else {
//     console.log("Es impar")
// }

// let edadi = Number(prompt("Ingrese su edad"));

// if(edadi >= 18) {
//     console.log("Eres mayor de edad")
// } else {
//     console.log("Eres menor de edad")
// }

// let numero1 = Number(prompt("Ingrese un numero"));
// let numero2 = Number(prompt("Ingrese otro numero"));
// let multiplicacion = numero1 * numero2;

// console.log(multiplicacion)

// let contraseña = prompt("Ingrese una contraseña");

// if(contraseña === 'javascript123') {
//     console.log("Bienvenido")
// } else {
//     console.log("Acceso denegado")
// }

// let numero = Number(prompt("Ingrese un numero:"));

// if(numero > 0) {
//     console.log("Es positivo")
// } else if(numero === 0) {
//     console.log("Es 0")
// } else {
//     console.log("Es negativo")
// }

// let diadelasemana = prompt("Ingresa un dia de la semana");

// if(diadelasemana === 'sabado') {
//     console.log("Es fin de semana")
// } else if(diadelasemana === 'domingo') {
//     console.log("Es fin de semana")
// } else {
//     console.log("Es un dia normal")
// }
100
// let multiplo = Number(prompt("Ingrese un numero:"));

// if(multiplo % 5 === 0) {
//     console.log("Es multiplo de 5")
// } else {
//     console.log("No es multiplo de 5")
// }

// let altura = Number(prompt("Ingrese su estatura:"));

// if(altura <= 120) {
//     console.log("No puedes entrar")
// } else if(altura >= 200) {
//     console.log("Altura fuera de rango")
// } else {
//     console.log("Puedes entrar")
// }

// for(i = 0; i < 5; i++) {
//     console.log("Hola mundo")
// }

// let i = 0

// while(i < 5) {
//     console.log("Hola mundo");
//     i++
// }

const contraseña = "1234"
let contraseñaingresada = prompt("Ingrese su contraseña: ");

while(contraseñaingresada != contraseña) {
    contraseñaingresada = prompt("Incorrecto, intente nuevamente: ");
    
}

