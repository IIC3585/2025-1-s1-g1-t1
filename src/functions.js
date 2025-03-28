
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


const swap = _.curry((n, m, matrix) =>
    matrix.map(row => {
        const newRow = [...row];
        [newRow[n], newRow[m]] = [newRow[m], newRow[n]];
        return newRow;
    })
);  // Matriz de entrada debe ser un arreglo de arreglos

const rowDelete = _.curry((index, matrix) =>
    matrix.filter((fila, i) => i !== index)
  );


const insertRow = _.curry((n, row, matrix) =>
    _.concat(
      matrix.slice(0, n),
      [row],
      matrix.slice(n)
    )
  );

const insertcolumn = (file, n, column) => {
    // TODO: Implementar función
}

const tohtmltable = (file) => {
    // TODO: Implementar función
}


module.exports = { rowsToColumns, columnsToRows, columnDelete, swap, rowDelete, insertRow};