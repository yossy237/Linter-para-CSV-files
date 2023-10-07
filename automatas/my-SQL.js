const fs = require('fs');

// Función para validar el tipo de dato
function validarTipoDato(dato, tipo) {
    // Implementa la lógica de validación del tipo de dato aquí
    // usar expresiones regulares u otras funciones según tus necesidades
    return true; // Retorna true si es válido, false si no lo es
}

// Función principal
fs.readFile('database.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const cadena_split = data.split('\n');
    const top = cadena_split[0].split(',');

    // Crea el archivo de log
    const logStream = fs.createWriteStream('./log.txt');

    for (let i = 1; i < cadena_split.length - 1; i++) {
        const query = cadena_split[i].split(',');

        // Verifica la longitud de los arreglos
        if (top.length !== query.length || query.length === 0) {
            logStream.write(`Datos incorrectos o incompletos en el renglón ${i}\n`);
            continue;
        }

        // Verifica el tipo de dato
        for (let j = 0; j < top.length; j++) {
            const tipoDato = obtenerTipoDato(top[j]); // Implementa la lógica para obtener el tipo de dato esperado
            if (!validarTipoDato(query[j], tipoDato)) {
                logStream.write(`Tipo de dato incorrecto en ${top[j]} del renglón ${i}\n`);
            }
        }

        // Imprime el número de renglón
        console.log(`Renglon ${i} : ${cadena_split[i]}`);

        // Itera sobre los datos de la consulta y los imprime
        query.forEach(function (queryData, index) {
            console.log(`${top[index]}: ${queryData}`);
        });
    }

    // Cierra el archivo de log al finalizar
    logStream.end();
});

// Función para obtener el tipo de dato esperado
function obtenerTipoDato(columna) {
    // Implementa la lógica para obtener el tipo de dato según la columna
    // Puedes tener un mapeo de columnas a tipos de datos o usar algún otro método
    return 'alfa'; // Reemplaza con el tipo de dato esperado
}