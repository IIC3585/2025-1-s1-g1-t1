
// TODO: revisar si es posible omitir las declaraciones y remplazarlos completamente por transpose


// OPTION 1: 
/*

const rowsToColumns = (file) => {
    const data = readCSV(file);
    const transposed = transpose(data);
    writeCSV("output-rowsToCols.csv", transposed);
};

const columnsToRows= (file) =>{
    const data = readCSV(file);
    const transposed = transpose(data);
    writeCSV("output-colsToRows.csv", transposed);
};

const columnDelete =  (matrix, n)=>{ 
    const data = readCSV(file);  // si cambia de matriz a file, des-comentar esta linea
    const newData = data.map(row => row.filter((_, index) => index !== n));
    writeCSV("output-colsToRows.csv", transposed); // si cambia de matriz a file, des-comentar esta linea
};

module.exports = { rowsToColumns, columnsToRows , columnDelete};*/

// OPTION 2:

const rowsToColumns = (data) => transpose(data);
const columnsToRows = (data) => transpose(data);  // Inversa es exactamente la misma función de transpose


const transpose = (matrix) =>
    matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

const columnDelete =  n => matrix =>
    matrix.map(row => row.filter((_, index) => index !== n));


module.exports = { rowsToColumns, columnsToRows, columnDelete};