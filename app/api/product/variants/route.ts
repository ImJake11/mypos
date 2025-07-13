import { VariantsProps } from "@/app/lib/models/productModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {

        const { variants, productID } = await req.json();


        const rawVariants = variants as VariantsProps[];


        for (const variant of rawVariants) {

            if (variant.id) {
                await prisma.variants.update({
                    where: {
                        id: variant.id,
                    },
                    data: {
                        details: variant.details,
                        imageUrl: variant.imageUrl,
                        isArchived: variant.isArchived,
                        isPositive: variant.isPositive,
                        name: variant.name,
                        price: variant.price,
                        stock: variant.stock,
                    }
                })
            } else {
                await prisma.variants.create({
                    data: {
                        imageUrl: variant.imageUrl,
                        name: variant.name,
                        price: variant.price,
                        stock: variant.stock,
                        details: variant.details ?? "",
                        isArchived: variant.isArchived,
                        productId: productID,
                        isPositive: variant.isPositive,
                    },
                })
            }
        }

        return NextResponse.json({ message: "Successfully addedd the product variant" }, { status: 200 })

    } catch (e) {

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

