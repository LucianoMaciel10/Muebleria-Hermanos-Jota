// Verificador de acceso con contraseña

const contraseñaCorrecta = "jota123";
let contraseñaIngresada = prompt('Ingrese su contraseña:');

if (contraseñaIngresada === contraseñaCorrecta) {
    alert('¡Acceso concedido!');
} else if (!contraseñaIngresada) {
    alert('No se ingresó ninguna contraseña');
} else {
    alert('Contraseña incorrecta. Acceso denegado.');
}