const { readFileSync, writeFileSync } = require("fs");
const _ = require("lodash");

const readCSV = (file) =>
    readFileSync(file, "utf8")
        .trim()
        .split("\n")
        .map(row => 
            row
            .split(",")
            .map(cell => 
                cell
                .trim()));

const writeCSV = (file, data) =>
    writeFileSync(file, data.map(row => row.join(",")).join("\n"), "utf8");

const processCSVFile = (fn, file, output) => {
    const data = readCSV(file);
    const result = fn(data);
    writeCSV(output, result);
}


module.exports = { processCSVFile};