const { processCSVFile} = require('./helper.js');
const {columnsToRows, rowsToColumns, columnDelete} = require("./functions");

const filePath = "./dataExample/dataExample.csv";
// example
processCSVFile(columnsToRows, filePath, './dataExample/output-colsToRows.csv');
processCSVFile(rowsToColumns, filePath, './dataExample/output-rowsToCols.csv');
processCSVFile(columnDelete(1), filePath, './dataExample/output-columnDelete.csv');