import _ from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.js";

/**
 * @function insertRow
 * @description Inserts a row into a matrix at the specified position.
 * @param {number} n - The position to insert the row
 * @param {Array<any>} row - The row to insert
 * @param {Array<Array<any>>} matrix - The matrix to insert the row into
 * @returns {Array<Array<any>>} - The matrix with the row inserted
 * @example
 * const matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ];
 * const row = [10, 11, 12];
 * const n = 1;
 * const newMatrix = insertRow(n, row, matrix);
 * // console.log(newMatrix);
 * // Output:
 * // [
 * //   [1, 2, 3],
 * //   [10, 11, 12],
 * //   [4, 5, 6],
 * //   [7, 8, 9]
 * // ];
 */

const getMaxRowLength = (matrix, row) =>
  Math.max(...matrix.map((r) => r.length), row.length);

const padRow = (row, length) =>
  _.concat(row, Array(length - row.length).fill(undefined));

const insertRow = _.curry((matrix, n, row) => {
  const pos = n < 0 ? matrix.length + n + 1 : n;
  return _.flow(
    () => getMaxRowLength(matrix, row),
    (maxLength) => padRow(row, maxLength),
    (paddedRow) =>
      _.concat(matrix.slice(0, pos), [paddedRow], matrix.slice(pos))
  )();
});

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
 */
const insertColumnHead = insertColumn(_, 0);

/**
 * This function inserts a column at the tail of the file.
 * @function insertColumnTail
 *
 * @param {Array<Array<any>>} file   - The file to insert the column into
 * @param {Array} column - The column to insert
 * @returns {Array<Array<any>>}      - The file with the column inserted
 */
const insertColumnTail = insertColumn(_, -1);

export { insertRow, insertColumn, insertColumnHead, insertColumnTail };
