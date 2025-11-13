
const inputDecimal = document.getElementById('decimal');
const inputOctal = document.getElementById('octal');
const inputHexadecimal = document.getElementById('hexadecimal');
const inputBinario = document.getElementById('binario');

// Función para limpiar todos los campos excepto el actual.
function limpiarOtros(idActual) {
    if (idActual !== 'decimal') inputDecimal.value = '';
    if (idActual !== 'octal') inputOctal.value = '';
    if (idActual !== 'hexadecimal') inputHexadecimal.value = '';
    if (idActual !== 'binario') inputBinario.value = '';
}

// Función para validar si un valor es válido para una base específica.
function esValidoParaBase(valor, base) {
    const caracteresPermitidos = {
        2: '01',
        8: '01234567',
        10: '0123456789',
        16: '0123456789ABCDEF'
    }[base];
    for (let i = 0; i < valor.length; i++) {
        if (!caracteresPermitidos.includes(valor[i])) {
            return false;
        }
    }
    return true;
}

// Función para convertir de decimal a binario manualmente.
function decimalABinario(decimal) {
    if (decimal === 0) return '0';
    let binario = '';
    let num = decimal;
    while (num > 0) {
        binario = (num % 2) + binario;
        num = Math.floor(num / 2);
    }
    return binario;
}

// Función para convertir de decimal a octal manualmente.
function decimalAOctal(decimal) {
    if (decimal === 0) return '0';
    let octal = '';
    let num = decimal;
    while (num > 0) {
        octal = (num % 8) + octal;
        num = Math.floor(num / 8);
    }
    return octal;
}

// Función para convertir de decimal a hexadecimal manualmente.
function decimalAHexadecimal(decimal) {
    if (decimal === 0) return '0';
    let hex = '';
    let num = decimal;
    const hexMap = '0123456789ABCDEF';
    while (num > 0) {
        hex = hexMap[num % 16] + hex;
        num = Math.floor(num / 16);
    }
    return hex;
}

// Función para convertir de binario a decimal manualmente.
function binarioADecimal(binario) {
    let decimal = 0;
    for (let i = 0; i < binario.length; i++) {
        const digito = parseInt(binario[binario.length - 1 - i]);
        decimal += digito * Math.pow(2, i);
    }
    return decimal;
}

// Función para convertir de octal a decimal manualmente.
function octalADecimal(octal) {
    let decimal = 0;
    for (let i = 0; i < octal.length; i++) {
        const digito = parseInt(octal[octal.length - 1 - i]);
        decimal += digito * Math.pow(8, i);
    }
    return decimal;
}

// Función para convertir de hexadecimal a decimal manualmente.
function hexadecimalADecimal(hex) {
    let decimal = 0;
    const hexMap = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15 };
    for (let i = 0; i < hex.length; i++) {
        const digito = hexMap[hex[hex.length - 1 - i]];
        decimal += digito * Math.pow(16, i);
    }
    return decimal;
}

// Función principal de conversión que se activa en cada input.
function convertir(evento) {
    const input = evento.target;
    let valor = input.value.trim().toUpperCase();
    if (valor === '') {
        limpiarOtros(input.id);
        return;
    }

    let base;
    switch (input.id) {
        case 'decimal': base = 10; break;
        case 'octal': base = 8; break;
        case 'hexadecimal': base = 16; break;
        case 'binario': base = 2; break;
    }

    if (!esValidoParaBase(valor, base)) {
        limpiarOtros(input.id);
        input.value = '';
        alert('Valor inválido para esta base.');
        return;
    }

    let valorDecimal;
    switch (input.id) {
        case 'decimal':
            valorDecimal = Number(valor);
            break;
        case 'binario':
            valorDecimal = binarioADecimal(valor);
            break;
        case 'octal':
            valorDecimal = octalADecimal(valor);
            break;
        case 'hexadecimal':
            valorDecimal = hexadecimalADecimal(valor);
            break;
    }
    // Actualiza los otros campos con conversiones desde decimal
    if (input.id !== 'decimal') inputDecimal.value = valorDecimal.toString();
    if (input.id !== 'octal') inputOctal.value = decimalAOctal(valorDecimal);
    if (input.id !== 'hexadecimal') inputHexadecimal.value = decimalAHexadecimal(valorDecimal);
    if (input.id !== 'binario') inputBinario.value = decimalABinario(valorDecimal);
}
//cambios en tiempo real.
inputDecimal.addEventListener('input', convertir);
inputOctal.addEventListener('input', convertir);
inputHexadecimal.addEventListener('input', convertir);
inputBinario.addEventListener('input', convertir);
