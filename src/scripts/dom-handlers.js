

// Configuraciones de las funciones
export const functionConfigs = {
    columnDelete: {
        inputs: [
            { label: 'Índice de columna a eliminar (0-based):', id: 'columnIndex', type: 'number', attrs: { min: '0', value: '0', style: 'width: 60px;' } }
        ],
        paramBuilder: () => ({ columnIndex: parseInt(document.getElementById('columnIndex').value) })
    },
    rowDelete: {
        inputs: [
            { label: 'Índice de fila a eliminar (0-based):', id: 'rowIndex', type: 'number', attrs: { min: '0', value: '0', style: 'width: 60px;' } }
        ],
        paramBuilder: () => ({ rowIndex: parseInt(document.getElementById('rowIndex').value) })
    },
    swap: {
        inputs: [
            { label: 'Índice de columna n:', id: 'nIndex', type: 'number', attrs: { min: '0', value: '0', style: 'width: 60px;' } },
            { label: 'Índice de columna m:', id: 'mIndex', type: 'number', attrs: { min: '0', value: '0', style: 'width: 60px;' } }
        ],
        paramBuilder: () => ({ 
            n: parseInt(document.getElementById('nIndex').value), 
            m: parseInt(document.getElementById('mIndex').value) 
        })
    },
    insertColumn: {
        inputs: [
            { label: 'Índice de columna a insertar:', id: 'columnIndex', type: 'number', attrs: { min: '0', value: '0', style: 'width: 60px;' } },
            { label: 'Valores de la nueva columna (separados por comas):', id: 'columnValues', type: 'text', attrs: { placeholder: 'valor1, valor2, ...', style: 'width: 200px;' } }
        ],
        paramBuilder: () => ({ 
            index: parseInt(document.getElementById('columnIndex').value), 
            values: document.getElementById('columnValues').value.split(',').map(val => val.trim()) 
        })
    },
    insertRow: {
        inputs: [
            { label: 'Índice de fila a insertar:', id: 'rowIndex', type: 'number', attrs: { min: '0', value: '0', style: 'width: 60px;' } },
            { label: 'Valores de la nueva fila (separados por comas):', id: 'rowValues', type: 'text', attrs: { placeholder: 'valor1, valor2, ...', style: 'width: 200px;' } }
        ],
        paramBuilder: () => ({ 
            index: parseInt(document.getElementById('rowIndex').value), 
            values: document.getElementById('rowValues').value.split(',').map(val => val.trim()) 
        })
    },
    insertColumnHead: {
        inputs: [
            { label: 'Valores de la nueva columna (separados por comas):', id: 'columnValues', type: 'text', attrs: { placeholder: 'valor1, valor2, ...', style: 'width: 200px;' } }
        ],
        paramBuilder: () => ({ 
            values: document.getElementById('columnValues').value.split(',').map(val => val.trim()) 
        })
    },
    insertColumnTail: {
        inputs: [
            { label: 'Valores de la nueva columna (separados por comas):', id: 'columnValues', type: 'text', attrs: { placeholder: 'valor1, valor2, ...', style: 'width: 200px;' } }
        ],
        paramBuilder: () => ({ 
            values: document.getElementById('columnValues').value.split(',').map(val => val.trim()) 
        })
    },
    rowsToColumns: { inputs: [] },
    columnsToRows: { inputs: [] },
    transpose: { inputs: [] }
};

// Funciones de utilidad para el DOM
export const createElement = (tag, attributes = {}) => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
};

export const createInputElement = ({ id, type, attrs }) => {
    return createElement('input', { type, id, ...attrs });
};

export const createInputGroup = ({ label, ...inputConfig }) => {
    const group = createElement('div');
    if (label) {
        const labelElement = createElement('label');
        labelElement.textContent = label;
        group.appendChild(labelElement);
    }
    group.appendChild(createInputElement(inputConfig));
    return group;
};


export const getFunctionSelect = ()=> document.getElementById('functionSelect')
export const getFileInput = () => document.getElementById('csvFileInput');
export const getPreviewElement = () => document.getElementById('csvPreview');
export const getResultOutput = () => document.getElementById('resultOutput');
export const getDownloadButton = () => document.getElementById('downloadBtn');
export const getParamDiv =()=> document.getElementById('paramInputs');
export const getConfirmBtn =()=> document.getElementById('confirmParamsBtn');
export const getPipelineDisplay =()=>document.getElementById('pipelineDisplay')