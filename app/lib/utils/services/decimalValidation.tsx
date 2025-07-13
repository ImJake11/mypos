/**
 * Custom hook that validates decimal input for number fields (e.g., price, tax).
 * 
 * - Only allows a single decimal point.
 * - Rejects non-numeric characters except the first `.`.
 * 
 * Useful for controlled inputs where you want to prevent multiple decimals
 * or invalid characters during typing.
 * 
 * @param currentInputs - The current string input (e.g., from the input field's value)
 * @param input - The latest character the user attempted to enter
 * @returns `true` if the character is valid, `false` if it should be rejected
 */
export const decimalValidation = ({
    currentInputs, // current list of text that will check for decimal point
    input,
}: {
    currentInputs: string,
    input: string,
}): boolean => {

    //--1. check the input if it is a period
    if (input === ".") {

        // -- check if current inputs has decimal point
        const hasDecimalPoint = currentInputs.includes(".");


        if (hasDecimalPoint) return false; // if it has decimal point just cancel the flow of this function

        return true;
    } else {
        // -- check input if number or not
        const isNan = isNaN(Number(input));

        if (isNan) return false;

        return true;
    }

}