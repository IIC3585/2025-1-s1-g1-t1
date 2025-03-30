#### IIC3585-1 SECCIÓN 1 - GRUPO 1
# 🤖 Trabajo 1: JavaScript Funcional

| Integrantes | Mail UC |
|-|-|
| Tarek Elías Hirmas Aboid | tarek.hirmas@uc.cl |
| Sebastián Lobo Cáceres | salobo@uc.cl|
| Anita Martí Campos | asmarti@uc.cl |

> [!NOTE]
> Fecha de entrega 31-03-2025

## 📁 Estructura de archivos
Por motivos prácticos, no se muestra la carpeta docs, debido a que es autogenerada con ```jsdoc```.
```
├── data
    ├── csv_example.csv
├── src
    ├── functions
        ├── delete.js
        ├── insertions.js
        ├── mutation.js
        ├── parse_html.js
    ├── scripts
        ├── dom-handlers.js
        ├── either.js
        ├── helper-csv.js
        ├── main.js
        ├── pipeline.js
    ├── index.html
    ├── style.css
├── .gitignore
├── jsdoc.json
├── package.json
├── README.md
```

El objetivo es desarrollar una solución funcional en **JavaScript** a un problema de cierta complejidad. Se espera que utilicen el máximo de elementos funcionales posibles. Por ejemplo:

* Iterators y Generators
* Uso de la librería Lodash
* Currying y partial evaluation
* Composición y Pipes
* Chaining

## 💻 Desafío

El problema a resolver es la transformación de archivos CSV.  Básicamente un formato que se usa para ingresar información tabular en forma de texto. Los campos se separan por comas y las filas por \n (new line). Por ejemplo, el archivo siguiente:

```
Juan, Perez, jperez@gmail.com
Ana, Flores, aflores@gmail.com
Luis, Prado, lprado@gmail.com
```

Corresponde a la siguiente tabla


| <!-- -->     | <!-- -->         | <!-- -->       |
|:------------:|:-----------------:|:-------------:|
|Juan | Perez  | jperez@gmail.com  |
|Ana  | Flores | aflores@gmail.com |
|Luis | Prado  | lprado@gmail.com  |


## Funciones Principales Desarrolladas

El proyecto permite manipular archivos CSV mediante diversas funciones, a continuación se presentan las principales. De todas formas, en la documentación se explica el resto de ellas:  

### 🔄 Modificación de Estructura  
- 🔀 **`swap(file, n, m)`** – Intercambia las columnas `n` y `m`.  
- ↔️ **`rowstocolumns(file)`** – Convierte filas en columnas.  
- ↕️ **`columnstorows(file)`** – Convierte columnas en filas.  

### ❌ Eliminación de Datos  
- 🗑️ **`rowdelete(file, n)`** – Elimina la fila `n`.  
- 🗑️ **`columndelete(file, n)`** – Elimina la columna `n`.  

### ➕ Inserción de Datos  
- ➕ **`insertrow(file, n, row)`** – Inserta una fila después de la fila `n` con la información dada en la lista `row`.  
- ➕ **`insertcolumn(file, n, column)`** – Inserta una columna después de la columna `n` con la información dada en la lista `column`.  

### 📄 Exportación  
- 🌐 **`tohtmltable(file)`** – Convierte el archivo en una tabla HTML.  



## Instalación

### Pasos previos requeridos
1. Instalar [Node](https://nodejs.org/en)
2. Instalar [Git](https://git-scm.com/)
3. Instalar [Python](https://www.python.org/)
4. Instalar extensión VSCode Live Server. Para eso, abra VSCode y escriba ```ctrl+P```, escriba ```ext install ritwickdey.liveserver.```

### Despues
1. Clonar el repositorio mediante git.
```bash
git clone https://github.com/IIC3585/2025-1-s1-g1-t1.git
```
2. Instalar las dependencias
```bash
npm install
```
3. Inicialice live server con el index.html dentro de la carpeta src
