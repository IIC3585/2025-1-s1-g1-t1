import _ from "lodash";
import { pipe } from "./helper.js";

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

const columnDelete = n => matrix =>
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


// Positive or negative n
/**
 * This function inserts a column into a file at the specified position.
 * It can insert a column at the head (0), tail (-1), or any other position (n).
 * The column must match the number of rows in the file.
 * @function insertColumn
 * 
 * @param {Array<Array<any>>} file   - The file to insert the column into
 * @param {number} n     - The position to insert the column at
 * @param {Array<any>} column - The column to insert
 * @returns {Array<Array<any>>}      - The file with the column inserted
 * @throws {Error}       - Throws an error if the column length does not match the number of rows in the file
 * 
 * @example
 * const file = [
 *   ["a", "b", "c"],
 *   ["d", "e", "f"],
 *   ["g", "h", "i"]
 * ];
 * const column = ["1", "2", "3"];
 * const n = 1;
 * const newFile = insertColumn(file, n, column);
 * // console.log(newFile);
 * // Output:
 * // [
 * //   ["a", "1", "b", "c"],
 * //   ["d", "2", "e", "f"],
 * //   ["g", "3", "h", "i"]
 * // ];
 * 
 * @example
 * const column = ["1", "2", "3"];
 * const n = -1;
 * const newFile = insertColumn(file, n, column);
 * // console.log(newFile);
 * // Output:
 * // [
 * //   ["a", "b", "c", "1"],
 * //   ["d", "e", "f", "2"],
 * //   ["g", "h", "i", "3"]
 * // ];
 */
const insertColumn = _.curry((file, n, column) => {
    if (file.length !== column.length) {
        throw new Error("The column length must match the number of rows in the file.");
    }
    return file.map((row, index) => {
        const pos = n < 0 ? row.length + n + 1 : n;
        return [...row.slice(0, pos), column[index], ...row.slice(pos)];
    });
});


/**
 * This function inserts a column at the head of the file.
 * @function insertColumnHead
 * 
 * @param {Array<Array<any>>} file   - The file to insert the column into
 * @param {Array} column - The column to insert
 * @returns {Array<Array<any>>}      - The file with the column inserted
 * @throws {Error}       - Throws an error if the column length does not match the number of rows in the file
 */
const insertColumnHead = insertColumn(_, 0);

/**
 * This function inserts a column at the tail of the file.
 * @function insertColumnTail
 * 
 * @param {Array<Array<any>>} file   - The file to insert the column into
 * @param {Array} column - The column to insert
 * @returns {Array<Array<any>>}      - The file with the column inserted
 * @throws {Error}       - Throws an error if the column length does not match the number of rows in the file
 */
const insertColumnTail = insertColumn(_, -1);


const HTML_TAGS = {
    TABLE: "table",
    ROW: "tr",
    CELL: "td"
}

const INDENTATION = {
    TAB: "    ",
    NEW_LINE: "\n",
}

const createHtmlTag = _.curry((tag, indentation, content) => {
    let indent = INDENTATION.NEW_LINE + INDENTATION.TAB.repeat(indentation)

    const openingTag = `${indent}<${tag}>`;
    const closingTag = tag === HTML_TAGS.CELL ? `</${tag}>`: `${indent}</${tag}>`;
    content = Array.isArray(content) ? content.join("") : content;
    return `${openingTag}${content}${closingTag}`;
})

const createTable = createHtmlTag(HTML_TAGS.TABLE, 0);
const createRow = createHtmlTag(HTML_TAGS.ROW, 1);
const createCell = createHtmlTag(HTML_TAGS.CELL, 2);

const extractContentCell = (row) => {
    return row.map(cell => createCell(cell)).join("");
}

const toHtmlTable = pipe(
    (file) => file.map(extractContentCell),
    (rows) => rows.map(createRow),
    createTable
)


export {
    rowsToColumns,
    columnsToRows,
    columnDelete,
    insertColumn,
    insertColumnHead,
    insertColumnTail,
    toHtmlTable,
};