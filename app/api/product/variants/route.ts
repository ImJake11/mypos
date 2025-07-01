import { VariantsProps } from "@/app/lib/models/productModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {

        const { variants, productID } = await req.json();


        const rawVariants = variants as VariantsProps[];


        await prisma.variants.createMany({
            data: rawVariants.map(v => ({
                isPositive: v.isPositive,
                imageUrl: v.imageUrl,
                name: v.name,
                price: v.price,
                productId: productID,
                stock: v.stock,
                details: v.details,
            }))
        });


        return NextResponse.json({ message: "Successfully addedd the product variant" }, { status: 200 })

    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

