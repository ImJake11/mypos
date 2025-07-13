
export function isBase64Image(str: string): boolean {
    return /^data:image\/[a-zA-Z]+;base64,/.test(str);
}