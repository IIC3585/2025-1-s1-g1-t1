import _ from "lodash";

const rowsToColumns = (data) => transpose(data);
const columnsToRows = (data) => transpose(data);

/** 
 * @function transpose
 * @description Transposes a matrix, converting rows into columns and vice versa. It is used for both requested functions.
 * @param {Array} matrix - The input matrix
 * @returns {Array} - The transposed matrix
 * @example 
 * const file = [
 *   ["a", "b", "c"],
 *   ["d", "e", "f"],
 *   ["g", "h", "i"]
 * ];
 * const rowsToColumns = transpose(file);
 * const columnsToRows = transpose(rowsToColumns);
 * console.log(rowsToColumns);
 * 
 * // Output: [
 *  ["a", "d", "g"],
 *  ["b", "e", "h"],
 *  ["c", "f", "i"]
 * ];
 * 
 * console.log(columnsToRows);
 * 
 * // Output: [
 * ["a", "b", "c"],
 * ["d", "e", "f"],
 * ["g", "h", "i"]
 * ];
*/
const transpose = (matrix) =>
    matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

/**
 * @function swap
 * @description Swaps two columns in a matrix.
 * @param {number} n - The index of the column to swap with column m
 * @param {number} m - The index of the column to swap with column n
 * @param {Array} matrix - The input matrix
 * @returns {Array} - The matrix with columns n and m swapped
 * @example
 * const file = [
 *   ["a", "b", "c"],
 *   ["d", "e", "f"],
 *   ["g", "h", "i"]
 * ];
 * const swappedFile = swap(0, 1, file);
 * console.log(swappedFile);
 * // Output: [
 * ["b", "a", "c"],
 * ["e", "d", "f"],
 * ["h", "g", "i"]
 * ];
 */

const swap = _.curry((n, m, matrix) =>
    matrix.map(row => {
        const newRow = [...row];
        [newRow[n], newRow[m]] = [newRow[m], newRow[n]];
        return newRow;
    })
);

export {
    transpose,
    rowsToColumns,
    columnsToRows,
    swap
};
