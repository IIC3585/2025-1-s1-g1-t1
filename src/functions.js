const _ = require("lodash");

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


const swap = (file, n, m) => {
    // TODO: Implementar función
}

const rowDelete = (file, n) => {
    // TODO: Implementar función
}

const insertRow = (file, n, row) => {
    // TODO: Implementar función
}

// Only positive n
// const insertColumn = _.curry((file, n, column) => 
//     file.map((row, index) => [...row.slice(0, n), column[index], ...row.slice(n)])
// );

// Positive or negative n
const insertColumn = _.curry((file, n, column) => 
    file.map((row, index) => {
        const pos = n < 0 ? row.length + n + 1 : n;
        return [...row.slice(0, pos), column[index], ...row.slice(pos)]
    })
);

const insertColumnHead = insertColumn(_, 0);
const insertColumnTail = insertColumn(_, -1);

const toHtmlTable = (file) => {
    // TODO: Implementar función
}


module.exports = { 
    rowsToColumns, 
    columnsToRows, 
    columnDelete, 
    insertColumn, 
    insertColumnHead, 
    insertColumnTail,
};