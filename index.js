import { processCSVFile, readCSV, writeCSV } from "./src/helper.js";
import {
  columnsToRows,
  rowsToColumns,
  swap,
  transpose,
} from "./src/functions/mutation.js";

import {
  columnDelete,
  rowsDelete,
} from "./src/functions/delete.js";

import {
  insertColumn,
  insertColumnHead,
  insertColumnTail,
  insertRow
} from "./src/functions/insertion.js";

import {
  toHtmlTable,
} from "./src/functions/parser_html.js";

const filePath = "./data/csv_example.csv";

// example
// processCSVFile(columnsToRows, filePath, './data/output-colsToRows.csv');
// processCSVFile(rowsToColumns, filePath, './data/output-rowsToCols.csv');
// processCSVFile(columnDelete(1), filePath, './data/output-columnDelete.csv');

const data = readCSV(filePath);
// const new_data = insertColumn(data, -6, ["hola@uc.cl", "nombre", "apellido"]);
// const new_data = insertColumnHead(data, ["hola@uc.cl", "nombre", "apellido"]);
// const new_data = insertColumnTail(data, ["hola@uc.cl", "nombre", "apellido"]);
const new_data = toHtmlTable(data);

// console.log(data);
// console.log(" ");
console.log(new_data);
