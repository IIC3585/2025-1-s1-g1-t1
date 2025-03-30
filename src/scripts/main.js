import { Right} from './either.js'
import { buildPipeline } from './pipeline.js'
import { parseCSV, toCSV, readCSVFile } from './helper-csv.js'
import {
    columnsToRows,
    rowsToColumns,
    swap,
    transpose,
} from "../functions/mutation.js";

import { 
    columnDelete,
    rowDelete,

} from "../functions/delete.js";

import {
    insertColumn,
    insertColumnHead,
    insertColumnTail,
    insertRow
  } from "../functions/insertion.js";

let currentPipeline = [];
let processedData = null;
let currentCSVData = null;

const getFileInput = () => document.getElementById('csvFileInput');
const getPreviewElement = () => document.getElementById('csvPreview');
const getResultOutput = () => document.getElementById('resultOutput');
const getDownloadButton = () => document.getElementById('downloadBtn');


/**
 * Previews the content of a selected CSV file in the preview element.
 *
 * @async
 * @function previewCSV
 * @description
 * This function performs the following steps:
 * 1. Retrieves the file input and preview elements.
 * 2. Checks if a file is selected. If not, displays a message prompting the user to select a file.
 * 3. Reads the selected CSV file and processes the result:
 *    - On error: Displays the error message in the preview element.
 *    - On success: Updates the preview element with the file content and stores it in `currentCSVData`.
 *
 * @global
 * @requires getFileInput - Function to get the file input element.
 * @requires getPreviewElement - Function to get the preview element.
 * @requires readCSVFile - Function to read and parse the CSV file.
 * @requires Right - Functional utility for handling success and error cases.
 * @requires currentCSVData - Variable to store the current CSV data.
 */

export async function previewCSV() {
    const preview = getPreviewElement();
    const fileInput = getFileInput();

    if (fileInput.files.length === 0) {
        preview.textContent = "Por favor, selecciona un archivo CSV";
        return;
    }

    const result = await readCSVFile(fileInput.files[0]);
    result.fold(
        error => preview.textContent = error,
        content => {
            currentCSVData = content;
            preview.textContent = content;
        }
    );
}

/**
 * Processes the current CSV data by applying a series of transformations
 * defined in the current pipeline. The result is displayed in the output
 * element and enables the download button if successful.
 *
 * @async
 * @function processCSV
 * @throws Will display an error message in the result output if an error occurs during processing.
 *
 * @description
 * This function performs the following steps:
 * 1. Checks if `currentCSVData` is available. If not, it prompts the user to upload a CSV file.
 * 2. Maps the `currentPipeline` to a series of transformation functions.
 * 3. Processes the CSV data using a functional pipeline:
 *    - Parses the CSV data.
 *    - Applies the transformations.
 *    - Converts the transformed data back to CSV format.
 * 4. Handles the result:
 *    - On success: Displays the processed data and enables the download button.
 *    - On error: Displays an error message and disables the download button.
 *
 * @global
 * @requires getResultOutput - Function to get the result output element.
 * @requires getDownloadButton - Function to get the download button element.
 * @requires currentCSVData - The current CSV data to be processed.
 * @requires currentPipeline - Array of transformation steps to apply to the CSV data.
 * @requires rowsToColumns - Transformation function to convert rows to columns.
 * @requires columnsToRows - Transformation function to convert columns to rows.
 * @requires columnDelete - Transformation function to delete a column by index.
 * @requires parseCSV - Function to parse CSV data into a usable format.
 * @requires buildPipeline - Function to compose multiple transformation functions into a pipeline.
 * @requires toCSV - Function to convert processed data back to CSV format.
 * @requires Right - Functional utility for handling success and error cases.
 * @requires processedData - Variable to store the processed CSV data.
 */

export async function processCSV() {
    const resultOutput = getResultOutput();
    const downloadBtn = getDownloadButton();

    if (!currentCSVData) {
        resultOutput.textContent = "Por favor, carga un archivo CSV primero"
        return
    }

    const transformations = currentPipeline.map(item => {
        switch (item.name) {
            case 'rowsToColumns': return rowsToColumns
            case 'columnsToRows': return columnsToRows
            case 'columnDelete': return columnDelete(item.params.columnIndex)
            case 'rowDelete': return rowDelete(item.params.rowIndex)
            case 'swap': return swap(item.params.n, item.params.m)
            case 'transpose': return transpose
            case 'insertColumn': return insertColumn(item.params.index, item.params.values)
            case 'insertColumnHead': return insertColumnHead(item.params.values)
            case 'insertColumnTail': return insertColumnTail(item.params.values)
            case 'insertRow': return insertRow(item.params.index, item.params.values)
            // Add more cases for other transformation functions as needed
            default: return data => data
        }
    })
    
    Right(currentCSVData)
        .map(parseCSV)
        .map(buildPipeline(...transformations))
        .map(toCSV)
        .fold(
            error => {
                resultOutput.textContent = `Error: ${error}`
                downloadBtn.disabled = true
            },
            result => {
                processedData = result
                resultOutput.textContent = result
                downloadBtn.disabled = false
            }
        )
}

/**
 * Downloads the processed CSV data as a file.
 *
 * @function downloadResult
 * @description
 * This function creates a downloadable CSV file from the `processedData` variable
 * and triggers a download in the browser.
 *
 * @global
 * @requires processedData - The processed CSV data to be downloaded.
 */

export function downloadResult() {
    if (!processedData) return
    const blob = new Blob([ processedData ], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resultado_procesado.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

/**
 * Displays parameter input fields for a specific transformation function.
 *
 * @function showParamInputs
 * @param {string} funcName - The name of the transformation function.
 * @description
 * This function dynamically updates the parameter input section based on the
 * selected transformation function. For example, if the function requires
 * parameters (e.g., `columnDelete`), it displays the corresponding input fields.
 *
 * @global
 * @requires document.getElementById - To access and modify DOM elements.
 */


function showParamInputs(funcName) {
    const paramDiv = document.getElementById('paramInputs')
    const confirmBtn = document.getElementById('confirmParamsBtn')
    paramDiv.innerHTML = ''

    if (funcName === 'columnDelete') {
        paramDiv.innerHTML = `
        <label>Índice de columna a eliminar (0-based):</label>
        <input type="number" id="columnIndex" min="0" value="0" style="width: 60px;">
      `
        confirmBtn.style.display = 'inline-block'
    }
    else if (funcName === 'rowDelete') {
        paramDiv.innerHTML = `
        <label>Índice de fila a eliminar (0-based):</label>
        <input type="number" id="rowIndex" min="0" value="0" style="width: 60px;">
      `
        confirmBtn.style.display = 'inline-block'
    } 
    else if (funcName === 'swap') {
        paramDiv.innerHTML = `
        <label>Índice de columna n:</label>
        <input type="number" id="nIndex" min="0" value="0" style="width: 60px;">
        <label>Índice de columna m:</label>
        <input type="number" id="mIndex" min="0" value="0" style="width: 60px;">
      `
        confirmBtn.style.display = 'inline-block'
    } 
    else if (funcName === 'insertColumn') {
        paramDiv.innerHTML = `
        <label>Índice de columna a insertar:</label>
        <input type="number" id="columnIndex" min="0" value="0" style="width: 60px;">
        <label>Valores de la nueva columna (separados por comas):</label>
        <input type="text" id="columnValues" placeholder="valor1, valor2, ..." style="width: 200px;">
      `
        confirmBtn.style.display = 'inline-block'
    } else if (funcName === 'insertRow') {
        paramDiv.innerHTML = `
        <label>Índice de fila a insertar:</label>
        <input type="number" id="rowIndex" min="0" value="0" style="width: 60px;">
        <label>Valores de la nueva fila (separados por comas):</label>
        <input type="text" id="rowValues" placeholder="valor1, valor2, ..." style="width: 200px;">
      `
        confirmBtn.style.display = 'inline-block'
    }
    else if (funcName === 'insertColumnHead') {
        paramDiv.innerHTML = `
        <label>Valores de la nueva columna (separados por comas):</label>
        <input type="text" id="columnValues" placeholder="valor1, valor2, ..." style="width: 200px;">
      `
        confirmBtn.style.display = 'inline-block'
    } else if (funcName === 'insertColumnTail') {
        paramDiv.innerHTML = `
        <label>Valores de la nueva columna (separados por comas):</label>
        <input type="text" id="columnValues" placeholder="valor1, valor2, ..." style="width: 200px;">
      `
        confirmBtn.style.display = 'inline-block'
    }
    
    else {
        confirmBtn.style.display = 'none'
    }
}

/**
 * Updates the visual display of the current pipeline.
 *
 * @function updatePipelineDisplay
 * @description
 * This function updates the pipeline display element to reflect the current
 * state of the `currentPipeline` array. It lists all selected transformation
 * functions and their parameters, if applicable.
 *
 * @global
 * @requires currentPipeline - Array of transformation steps to display.
 * @requires document.getElementById - To access and modify DOM elements.
 */

function updatePipelineDisplay() {
    const display = document.getElementById('pipelineDisplay')
    display.innerHTML = currentPipeline.length > 0
        ? currentPipeline.map(item => {
            let desc = `• ${item.name}`
            if (item.params) {
                if (item.name === 'columnDelete') {
                    desc += ` (columna ${item.params.columnIndex})`
                }
                else if (item.name === 'rowDelete') {
                    desc += ` (fila ${item.params.rowIndex})`
                }
                else if (item.name === 'swap') {
                    desc += ` (n: ${item.params.n}, m: ${item.params.m})`
                }
                else if (item.name === 'insertColumn') {
                    desc += ` (índice: ${item.params.index}, valores: ${item.params.values.join(', ')})`
                }
                else if (item.name === 'insertRow') {
                    desc += ` (índice: ${item.params.index}, valores: ${item.params.values.join(', ')})`
                }
                else if (item.name === 'insertColumnHead') {
                    desc += ` (valores: ${item.params.values.join(', ')})`
                }
                else if (item.name === 'insertColumnTail') {
                    desc += ` (valores: ${item.params.values.join(', ')})`
                }
            }
            return `<div>${desc}</div>`
        }).join('')
        : '<div>Ninguna función seleccionada</div>'
}

/**
 * Confirms and adds parameters for a specific transformation function to the pipeline.
 *
 * @function confirmParams
 * @description
 * This function retrieves user-provided parameters for a transformation function
 * (e.g., `columnDelete`) and adds the function with its parameters to the `currentPipeline`.
 * It also updates the pipeline display and hides the parameter input section.
 *
 * @global
 * @requires currentPipeline - Array of transformation steps to update.
 * @requires document.getElementById - To access and modify DOM elements.
 */


export function confirmParams() {
    const funcName = document.getElementById('functionSelect').value

    if (funcName === 'columnDelete') {
        const columnIndex = parseInt(document.getElementById('columnIndex').value)
        if (isNaN(columnIndex)) return

        currentPipeline.push({
            name: funcName,
            params: { columnIndex }
        })
        document.getElementById('paramInputs').innerHTML = ''
        document.getElementById('confirmParamsBtn').style.display = 'none'
        updatePipelineDisplay()
    }
    else if (funcName === 'rowDelete') {
        const rowIndex = parseInt(document.getElementById('rowIndex').value)
        if (isNaN(rowIndex)) return
        currentPipeline.push({
            name: funcName,
            params: { rowIndex }
        })
        document.getElementById('paramInputs').innerHTML = ''
        document.getElementById('confirmParamsBtn').style.display = 'none'
        updatePipelineDisplay()
    }

    else if (funcName === 'swap') {
        const nIndex = parseInt(document.getElementById('nIndex').value)
        const mIndex = parseInt(document.getElementById('mIndex').value)
        if (isNaN(nIndex) || isNaN(mIndex)) return

        currentPipeline.push({
            name: funcName,
            params: { n: nIndex, m: mIndex }
        })
        document.getElementById('paramInputs').innerHTML = ''
        document.getElementById('confirmParamsBtn').style.display = 'none'
        updatePipelineDisplay()
    }
    else if (funcName === 'insertColumn') {
        const columnIndex = parseInt(document.getElementById('columnIndex').value)
        const columnValues = document.getElementById('columnValues').value.split(',').map(val => val.trim())
        if (isNaN(columnIndex) || columnValues.length === 0) return

        currentPipeline.push({
            name: funcName,
            params: { index: columnIndex, values: columnValues }
        })
        document.getElementById('paramInputs').innerHTML = ''
        document.getElementById('confirmParamsBtn').style.display = 'none'
        updatePipelineDisplay()
    }
    else if (funcName === 'insertRow') {
        const rowIndex = parseInt(document.getElementById('rowIndex').value)
        const rowValues = document.getElementById('rowValues').value.split(',').map(val => val.trim())
        if (isNaN(rowIndex) || rowValues.length === 0) return

        currentPipeline.push({
            name: funcName,
            params: { index: rowIndex, values: rowValues }
        })
        document.getElementById('paramInputs').innerHTML = ''
        document.getElementById('confirmParamsBtn').style.display = 'none'
        updatePipelineDisplay()
    }
    else if (funcName === 'insertColumnHead') {
        const columnValues = document.getElementById('columnValues').value.split(',').map(val => val.trim())
        if (columnValues.length === 0) return

        currentPipeline.push({
            name: funcName,
            params: { values: columnValues }
        })
        document.getElementById('paramInputs').innerHTML = ''
        document.getElementById('confirmParamsBtn').style.display = 'none'
        updatePipelineDisplay()
    }
    else if (funcName === 'insertColumnTail') {
        const columnValues = document.getElementById('columnValues').value.split(',').map(val => val.trim())
        if (columnValues.length === 0) return

        currentPipeline.push({
            name: funcName,
            params: { values: columnValues }
        })
        document.getElementById('paramInputs').innerHTML = ''
        document.getElementById('confirmParamsBtn').style.display = 'none'
        updatePipelineDisplay()
    }
}



/**
 * Clears the current transformation pipeline.
 *
 * @function clearPipeline
 * @description
 * This function resets the `currentPipeline` array, clears the parameter input section,
 * hides the confirm button, and updates the pipeline display.
 *
 * @global
 * @requires currentPipeline - Array of transformation steps to clear.
 * @requires document.getElementById - To access and modify DOM elements.
 */

export function clearPipeline() {
    currentPipeline = []
    document.getElementById('paramInputs').innerHTML = ''
    document.getElementById('confirmParamsBtn').style.display = 'none'
    updatePipelineDisplay()
}

/**
 * Adds selected transformation functions to the pipeline.
 *
 * @function addToPipeline
 * @description
 * This function retrieves the selected transformation functions from a dropdown menu
 * and adds them to the `currentPipeline` array. If a function requires parameters
 * (e.g., `columnDelete`), it displays the parameter input section.
 *
 * @global
 * @requires currentPipeline - Array of transformation steps to update.
 * @requires document.getElementById - To access and modify DOM elements.
 */

export function addToPipeline() {
    const select = document.getElementById('functionSelect')
    const selected = Array.from(select.selectedOptions).map(opt => opt.value)

    selected.forEach(funcName => {
        if (!currentPipeline.some(item => item.name === funcName)) {
            if (funcName === 'columnDelete') {
                showParamInputs(funcName)
            }
            else if (funcName === 'rowDelete') {
                showParamInputs(funcName)
            } 
            else if (funcName === 'swap') {
                showParamInputs(funcName)
            } 
            else if (funcName === 'insertColumn') {
                showParamInputs(funcName)
            } 
            else if (funcName === 'insertRow') {
                showParamInputs(funcName)
            } 
            else if (funcName === 'insertColumnHead') {
                showParamInputs(funcName)
            } 
            else if (funcName === 'insertColumnTail') {
                showParamInputs(funcName)
            }
            else {
                currentPipeline.push({ name: funcName, params: null })
                updatePipelineDisplay()
            }
        }
    })
}
