// Require the fs (file system) module
const fs = require('fs');

// Leer el archivo JSON
fs.readFile('datos.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error leyendo el archivo:', err);
        return;
    }
    
    // Parsear los datos JSON
    const jsonData = JSON.parse(data);

    // Función para calcular 10 años después de una fecha dada
    function calcularDiezAniosDespues(fechaString) {
        // Convertir la cadena de fecha a un objeto Date
        const fechaOriginal = new Date(fechaString);
        
        // Agregar 10 años a la fecha
        fechaOriginal.setFullYear(fechaOriginal.getFullYear() + 10);
        
        // Formatear la fecha como "aaaa/mm/dd" (asumiendo el formato original)
        const fechaFormateada = `${fechaOriginal.getFullYear()}/${('0' + (fechaOriginal.getMonth() + 1)).slice(-2)}/${('0' + fechaOriginal.getDate()).slice(-2)}`;
        
        return fechaFormateada;
    }

    // Función para calcular 3 meses antes de una fecha dada
    function calcularTresMesesAntes(fechaString) {
        // Convertir la cadena de fecha a un objeto Date
        const fechaOriginal = new Date(fechaString);
        
        // Restar 3 meses a la fecha
        fechaOriginal.setMonth(fechaOriginal.getMonth() - 3);
        
        // Formatear la fecha como "aaaa/mm/dd" (asumiendo el formato original)
        const fechaFormateada = `${fechaOriginal.getFullYear()}/${('0' + (fechaOriginal.getMonth() + 1)).slice(-2)}/${('0' + fechaOriginal.getDate()).slice(-2)}`;
        
        return fechaFormateada;
    }

    // Obtener la fecha actual
    const currentDate = new Date();

    // Procesar cada entrada en los datos JSON
    const datosProcesados = jsonData.map(entry => {
        const fechaDiezAniosDespues = calcularDiezAniosDespues(entry.fecha);
        const fechaTresMesesAntes = calcularTresMesesAntes(fechaDiezAniosDespues);

        // Check if fechaTresMesesAntes is equal to currentDate
        const isTresMesesAntesCurrentDate = (new Date(fechaTresMesesAntes)).toDateString() === currentDate.toDateString();
        
        // Check if fechaTresMesesAntes is in the past
        const isTresMesesAntesInPast = new Date(fechaTresMesesAntes) < currentDate;

        // Calculate how many days in the future is fechaTresMesesAntes
        const diffTime = Math.abs(new Date(fechaTresMesesAntes) - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            fecha: entry.fecha,
            fechaDiezAniosDespues,
            fechaTresMesesAntes,
            nombre: entry.nombre,
            isTresMesesAntesCurrentDate,
            isTresMesesAntesInPast,
            daysUntilFechaTresMesesAntes: diffDays
        };
    });

    // Imprimir los datos procesados
    datosProcesados.forEach(entry => {
        console.log(`Fechas de ${entry.nombre}: fecha: ${entry.fecha}, fechaDiezAniosDespues: ${entry.fechaDiezAniosDespues}, fechaTresMesesAntes: ${entry.fechaTresMesesAntes}`);

        if (entry.isTresMesesAntesCurrentDate) {
            console.log(`¡La fecha tres meses antes de ${entry.nombre} coincide con la fecha actual!`);
        }

        if (entry.isTresMesesAntesInPast) {
            console.log(`La fecha tres meses antes de ${entry.nombre} ya ha pasado.`);
        }

        if (!entry.isTresMesesAntesCurrentDate && !entry.isTresMesesAntesInPast) {
            console.log(`La fecha tres meses antes de ${entry.nombre} ocurrirá en ${entry.daysUntilFechaTresMesesAntes} días.`);
        }
    });
});

