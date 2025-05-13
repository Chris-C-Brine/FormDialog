import { isEmpty, isEqual, isEqualWith, isNumber, isObject } from 'lodash';

/**
 * Compares two objects for deep equality.
 *
 * This function uses lodash's `isEqualWith` function for deep comparison,
 * with additional logic for handling numbers and empty values.
 *
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @param equalEmpty (default: false) Whether to consider empty values (null, undefined, empty arrays or objects) equal.
 * @returns True if the objects are deeply equal, false otherwise.
 */
const deepCompare = <T>(a: T, b: T, equalEmpty = false): boolean  => {
    return isEqualWith(a, b, (objA: unknown, objB: unknown) => {
        if (isObject(objA) || isObject(objB)) return undefined; // Delegate to lodash for object comparison

        if (isNumber(objA) || isNumber(objB)) {
            /*
              console.log(_.isEmpty(123456));
              this returns true, should be false

              Source: https://github.com/lodash/lodash/issues/496
             */
            return equalEmpty ? Number(objA) === Number(objB) : isEqual(objA, objB);
        }
        if (equalEmpty && isEmpty(objA) && isEmpty(objB)) return true;

        return isEqual(objA, objB);
    });
}

deepCompare.displayName = "deepCompare";

export default deepCompare;