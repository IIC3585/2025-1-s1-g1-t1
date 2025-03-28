const { processCSVFile} = require('./helper.js');
const {columnsToRows, rowsToColumns, columnDelete, swap, rowDelete, insertRow } = require("./functions");

const filePath = "./dataExample/dataExample.csv";
// example
processCSVFile(columnsToRows, filePath, './dataExample/output-colsToRows.csv');
processCSVFile(rowsToColumns, filePath, './dataExample/output-rowsToCols.csv');
processCSVFile(columnDelete(1), filePath, './dataExample/output-columnDelete.csv');
processCSVFile(swap(1, 2), filePath, './dataExample/output-swap.csv');
processCSVFile(rowDelete(1), filePath, './dataExample/output-rowDelete.csv');
processCSVFile(insertRow(1, [1, 2, 3, 4]), filePath, './dataExample/output-insertRow.csv');