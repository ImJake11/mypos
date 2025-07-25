import { prisma } from "@/app/lib/utils/db/prisma";



export async function upsertProductExpenses(
    productID: string,
    stock: number,
    costPrice: number,
) {

    try {
        await prisma.productExpenses.upsert({
            create: {
                total: stock * costPrice,
                productID,
            },
            update: {
                total: stock * costPrice,
            },
            where: {
                productID: productID,
            }
        });

    } catch (e) {
        throw new Error("Failed to create or update expenses");
    }
}