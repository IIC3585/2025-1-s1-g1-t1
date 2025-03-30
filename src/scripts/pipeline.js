
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

/**
 * Builds a pipeline of functions that process data sequentially.
 *
 * @param {...Function} functions - A series of functions to be composed into a pipeline.
 * Each function should accept a single argument and return a value.
 * @returns {Function} A function that takes an initial data input and processes it
 * through the composed pipeline of functions.
 */
export const buildPipeline = (...functions) => 
    data => pipe(...functions)(data)
