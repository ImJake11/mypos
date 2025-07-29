

export function createValidationToken(email: string): string {

    const token = crypto.randomUUID();
    const eat = Date.now() + + 1000 * 60 * 15;

    const rawData = JSON.stringify({ token, eat, email });
    const hasedData = Buffer.from(rawData).toString("base64");

    return hasedData;
}