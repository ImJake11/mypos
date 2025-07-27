import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    id: string,
    url: string,
    stock: number,
    minStock: number,
    lastSoldDate: string | null,
    name: string,
}

export async function GET(req: NextRequest) {

    try {

        const products = await prisma.product.findMany({
            select: {
                coverImage: true,
                stock: true,
                lowStock: true,
                lastSoldDate: true,
                id: true,
                name: true,
            }
        });

        let slowProducts: Props[] = [];
        let lowStocks: Props[] = []


        products.forEach(product => {

            const now = new Date();

            const daysQuery = new Date(now);
            daysQuery.setDate(now.getDate() - 30)

            const stock = product.stock;
            const lowStock = product.lowStock;
            const lastSoldDate = product.lastSoldDate;

            const performanceVal = stock / lowStock;

            if (!lastSoldDate || lastSoldDate <= daysQuery) {
                slowProducts.push({
                    id: product.id,
                    minStock: product.lowStock,
                    stock: product.stock,
                    url: product.coverImage,
                    name: product.name,
                    lastSoldDate: product.lastSoldDate?.toISOString() ?? null,
                });
            }

            if (performanceVal <= 1.2) {
                lowStocks.push({
                    id: product.id,
                    minStock: product.lowStock,
                    stock: product.stock,
                    url: product.coverImage,
                    name: product.name,
                    lastSoldDate: product.lastSoldDate?.toISOString() ?? null,
                });
            }

        });

        return NextResponse.json({ slowProducts, lowStocks }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}