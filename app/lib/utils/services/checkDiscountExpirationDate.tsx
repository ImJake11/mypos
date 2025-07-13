
export function checkDiscountExpiration(date: string): boolean {

    const [month, day, year] = date.split("-").map(Number);

    const expirationDate = new Date(year, month, day);

    console.log(expirationDate);

    const current = new Date();

    if (expirationDate > current) {
        return true;
    }

    return false;

}