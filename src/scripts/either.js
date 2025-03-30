/**
 * @function Right
 * @description A function that takes a value and returns an object with methods for functional programming.
 * @param {*} value 
 * @returns 
 * @example
 * const result = Right(5);
 * result.map(x => x + 1); // Right(6)
 * result.chain(x => Right(x * 2)); // Right(10)
 * result.fold(x => x + 1, x => x - 1); // Right(4)
 * result.isLeft; // false
 * result.isRight; // true
 */
export const Right = value => ({
    map: f => Right(f(value)),
    chain: f => f(value),
    fold: (_, g) => g(value),
    isLeft: false,
    isRight: true
});


/**
 * @function Left
 * @description A function that takes a value and returns an object with methods for functional programming.
 * @param {*} value 
 * @example
 * const result = Left("Error");
 * result.map(x => x + 1); // Left("Error")
 * result.chain(x => Right(x * 2)); // Left("Error")
 * result.fold(x => x + 1, x => x - 1); // "Error"
 * result.isLeft; // true
 * result.isRight; // false
 */
export const Left = value => ({
    map: _ => Left(value),
    chain: _ => Left(value),
    fold: (f, _) => f(value),
    isLeft: true,
    isRight: false
});


/**
 * @function tryIO
 * @description A function that takes a function and returns a Either object.
 * @param {Function} f 
 * @returns {Either}
 * @example
 * const result = tryIO(() => { throw new Error("Error") });
 * result.isLeft; // true
 * result.fold(x => x + 1, x => x - 1); // "Error"
 */
export const tryIO = f => {
    const result = f();
    return result instanceof Error ? Left(result.message) : Right(result);
};