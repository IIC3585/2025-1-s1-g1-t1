
import { Right, Left } from './either.js'

/**
 * Parses a CSV string into a 2D array.
 *
 * @param {string} text - The CSV string to parse.
 * @returns {string[][]} A 2D array representing the parsed CSV data.
 */
export const parseCSV = text =>
    text.split('\n').map(row => row.split(',').map(cell => cell.trim()))

/**
 * Converts a 2D array into a CSV string.
 *
 * @param {string[][]} data - The 2D array to convert to CSV format.
 * @returns {string} A CSV string representation of the input data.
 */
export const toCSV = data =>
    data.map(row => row.join(',')).join('\n')

/**
 * Reads the content of a CSV file and returns a Promise with the result.
 *
 * @param {File} file - The CSV file to be read.
 * @returns {Promise<Either<string, string>>} A Promise that resolves to an Either:
 * - `Right` containing the file content as a string if the file is read successfully.
 * - `Left` containing an error message if there is an error reading the file.
 */
export const readCSVFile = file =>
    new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = e => resolve(Right(e.target.result))
        reader.onerror = e => resolve(Left("Error al leer el archivo"))
        reader.readAsText(file)
    })

