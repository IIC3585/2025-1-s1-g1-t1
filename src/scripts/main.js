import { Right} from './either.js'
import { pipe } from './pipeline.js'
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

import { toHtmlTable } from '../functions/parser_html.js'
import * as domFunctions from './dom-handlers.js'

let currentPipeline = [];
let processedData = null;
let currentCSVData = null;


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
    const preview = domFunctions.getPreviewElement();
    const fileInput = domFunctions.getFileInput();

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
    const resultOutput = domFunctions.getResultOutput();
    const downloadBtn = domFunctions.getDownloadButton();

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
        .map(pipe(...transformations))
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

export function toHtmlTableDisplay() {
    if (!processedData) return;
    const parsedData = parseCSV(processedData);
    const table = toHtmlTable(parsedData);
    const containerTable = document.getElementById('containerTable');
    containerTable.innerHTML = table;
    containerTable.style.display = 'block';
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
    const paramDiv = domFunctions.getParamDiv()
    const confirmBtn = domFunctions.getConfirmBtn()
    paramDiv.innerHTML = '';

    const config = domFunctions.functionConfigs[funcName];
    if (!config) {
        confirmBtn.style.display = 'none';
        return;
    }

    config.inputs.forEach(inputConfig => {
        paramDiv.appendChild(domFunctions.createInputGroup(inputConfig));
    });
    confirmBtn.style.display = 'inline-block';
}



function getFunctionDescription(item) {
    console.log(item);
    const descriptions = {
        columnDelete: () => `• ${item.name} (columna ${item.params.columnIndex})`,
        rowDelete: () => `• ${item.name} (fila ${item.params.rowIndex})`,
        swap: () => `• ${item.name} (n: ${item.params.n}, m: ${item.params.m})`,
        insertColumn: () => `• ${item.name} (índice: ${item.params.index}, valores: ${item.params.values.join(', ')})`,
        insertRow: () => `• ${item.name} (índice: ${item.params.index}, valores: ${item.params.values.join(', ')})`,
        insertColumnHead: () => `• ${item.name} (valores: ${item.params.values.join(', ')})`,
        insertColumnTail: () => `• ${item.name} (valores: ${item.params.values.join(', ')})`,
        default: () => `• ${item.name}`
    };

    return (descriptions[item.name] || descriptions.default)();
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
export function updatePipelineDisplay() {
    const display = domFunctions.getPipelineDisplay()
    display.innerHTML = currentPipeline.length > 0
        ? currentPipeline.map(item => `<div>${getFunctionDescription(item)}</div>`).join('')
        : '<div>Ninguna función seleccionada</div>';
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
    const funcName = domFunctions.getFunctionSelect().value;
    const config = domFunctions.functionConfigs[funcName];

    if (!config || !config.paramBuilder) {
        currentPipeline.push({ name: funcName, params: null });
    } else {
        const params = config.paramBuilder();
        if (Object.values(params).some(val => val === undefined || (Array.isArray(val) && val.length === 0))) {
            return;
        }
        currentPipeline.push({ name: funcName, params });
    }

    domFunctions.getParamDiv().innerHTML = '';
    domFunctions.getConfirmBtn().style.display = 'none';
    updatePipelineDisplay();
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
    const select = domFunctions.getFunctionSelect();
    const selected = Array.from(select.selectedOptions).map(opt => opt.value);

    selected.forEach(funcName => {
        if (!currentPipeline.some(item => item.name === funcName)) {
            if (domFunctions.functionConfigs[funcName]?.inputs?.length > 0) {
                showParamInputs(funcName);
            } else {
                currentPipeline.push({ name: funcName, params: null });
                updatePipelineDisplay();
            }
        }
    });
}
