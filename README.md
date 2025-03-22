#### IIC3585-1 SECCIÓN 1 - GRUPO 1
# 🤖 Trabajo 1: JavaScript Funcional

| Integrantes | Mail UC |
|-|-|
| Tarek Elías Hirmas Aboid | tarek.hirmas@uc.cl |
| Sebastián Lobo Cáceres | salobo@uc.cl|
| Anita Martí Campos | asmarti@uc.cl |

El objetivo es desarrollar una solución funcional en **JavaScript** a un problema de cierta complejidad. Se espera que utilicen el máximo de elementos funcionales posibles. Por ejemplo:

* Iterators y Generators
* Uso de la librería Lodash
* Currying y partial evaluation
* Composición y Pipes
* Chaining

## Desafío

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


## Funciones Desarrolladas

El proyecto permite manipular archivos CSV mediante diversas funciones:  

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

