import monthsName from "@/app/lib/constants/MonthsList";


export function extractPromotionalDiscountExpirationDate(date: string) {

    const parts = date.split("-");

    // added plus 1 since we save the date and month based on index so if user choose oct for example 
    // it will saved sa 9 in db

    const day = Number(parts[1]) + 1;
    const month = Number(parts[0]);
    const year = parts[2];

    // get the month name
    const monthName = monthsName[month];

    return `${monthName} ${day}, ${year}`
}