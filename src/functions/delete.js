import _ from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.js";

/**
 * @function rowDelete
 * @description This function deletes a row from a matrix at the specified position.
 * @param {number} index             - The position of the row to delete
 * @param {Array<Array<any>>} matrix - The matrix to delete the row from
 * @returns {Array<Array<any>>}      - The matrix with the row deleted  
 * @example
 * const matrix = [
 *  ["a", "b", "c"],
 *  ["d", "e", "f"],
 *  ["g", "h", "i"]
 * ];
 * const index = 1;
 * const newMatrix = rowDelete(index, matrix);
 * console.log(newMatrix);
 * // Output:
 * // [
 * //   ["a", "b", "c"],
 * //   ["g", "h", "i"]
 * // ];
 */
const rowDelete = _.curry((index, matrix) =>
  matrix.filter((_, i) => i !== index)
);

const rowDeleteHead = rowDelete(0);
const rowDeleteTail = rowDelete(-1);

/**
 * @function columnDelete
 * @description This function deletes a column from a matrix at the specified position.
 * @param {number} n                 - The position of the column to delete
 * @param {Array<Array<any>>} matrix - The matrix to delete the column from
 * @returns {Array<Array<any>>}      - The matrix with the column deleted
 *
 * @example
 * const matrix = [
 *   ["a", "b", "c"],
 *   ["d", "e", "f"],
 *   ["g", "h", "i"]
 * ];
 * const n = 1;
 * const newMatrix = columnDelete(n, matrix);
 * console.log(newMatrix);
 * // Output:
 * // [
 * //   ["a", "c"],
 * //   ["d", "f"],
 * //   ["g", "i"]
 * // ];
 */
const columnDelete = (n) => (matrix) =>
  matrix.map((row) => row.filter((_, index) => index !== n));


export { 
    rowDelete,
    columnDelete,
    rowDeleteHead,
    rowDeleteTail,
};
