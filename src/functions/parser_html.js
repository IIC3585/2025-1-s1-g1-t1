import _ from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.js";
import { pipe } from "../scripts/pipeline.js";

const HTML_TAGS = {
    TABLE: "table",
    ROW: "tr",
    CELL: "td"
}

const INDENTATION = {
    TAB: "    ",
    NEW_LINE: "\n",
}

const createHtmlTag = _.curry((tag, indentation, content) => {
    let indent = INDENTATION.NEW_LINE + INDENTATION.TAB.repeat(indentation)

    const openingTag = `${indent}<${tag}>`;
    const closingTag = tag === HTML_TAGS.CELL ? `</${tag}>` : `${indent}</${tag}>`;
    content = Array.isArray(content) ? content.join("") : content;
    return `${openingTag}${content}${closingTag}`;
})

const createTable = createHtmlTag(HTML_TAGS.TABLE, 0);
const createRow = createHtmlTag(HTML_TAGS.ROW, 1);
const createCell = createHtmlTag(HTML_TAGS.CELL, 2);

const extractContentCell = (row) => {
    return row.map(cell => createCell(cell)).join("");
}

/**
 * Convert an array of arrays into an HTML table.
 * @function toHtmlTable
 * @param {Array<Array<any>>} file - The input array of arrays.
 * @returns {string} - The HTML table as a string.
 * 
 * @example
 * const file = [
 *   ["a", "b", "c"],
 *   ["d", "e", "f"],
 *   ["g", "h", "i"]
 * ];
 * const htmlTable = toHtmlTable(file);
 * console.log(htmlTable);
 * // Output:
 * // <table>
 * //     <tr>
 * //         <td>a</td>
 * //         <td>b</td>
 * //         <td>c</td>
 * //     </tr>
 * //     <tr>
 * //         <td>d</td>
 * //         <td>e</td>
 * //         <td>f</td>
 * //     </tr>
 * //     <tr>
 * //         <td>g</td>
 * //         <td>h</td>
 * //         <td>i</td>
 * //     </tr>
 * // </table>
 */
const toHtmlTable = pipe(
    (file) => file.map(extractContentCell),
    (rows) => rows.map(createRow),
    createTable
)

export {
    toHtmlTable,
};