export default function isValidDecimalInput({
    currentInputs, // current list of text that will check for decimal point
    input,
}: {
    currentInputs: string,
    input: string,
}): boolean {

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