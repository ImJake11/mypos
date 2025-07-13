
import { Prisma } from "@/app/generated/prisma";
import { BulkTableProp, ProductProps, VariantsProps } from "@/app/lib/models/productModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

    try {

        const { data } = await req.json();

        const rawdata: ProductProps = data;

        const rawBulkTier = rawdata.bulkTier as BulkTableProp[];

        const promotionalDiscount = rawdata.promotionalDiscount;

        const { bulkEnabled,
            categoryID,
            costPrice,
            coverImage,
            description,
            discountEnabled,
            highlights,
            isActive,
            isFavorite,
            lowStock,
            name,
            photoSnapshots,
            sellingPrice,
            stock,
            tax,
            coverImageId,
            vatId,
        } = rawdata;

        const { id } = await prisma.product.create({
            data: {
                costPrice,
                coverImage,
                coverImageId: coverImageId!,
                lowStock,
                sellingPrice,
                stock,
                tax,
                bulkEnabled,
                categoryID,
                description,
                highlights,
                isActive,
                isFavorite,
                name,
                photoSnapshots,
                vatId,
                bulkTier: rawBulkTier ? {
                    create: rawBulkTier.map(v => ({
                        discount: v.discount,
                        quantity: v.quantity,
                    }))
                } : undefined,
                variants: undefined, // set to undefined because later we will update it once all photo url are retrieved
            },
            select: {
                id: true,
            }
        });

        return NextResponse.json({ id }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}


export async function PUT(req: NextRequest) {

    try {

        const { data } = await req.json();

        const newData: ProductProps = data;

        const {
            bulkEnabled,
            bulkTier,
            categoryID,
            costPrice,
            coverImage,
            description,
            highlights,
            vatId,
            isActive,
            isFavorite,
            lowStock,
            name,
            photoSnapshots,
            promotionalDiscount,
            sellingPrice,
            stock,
            tax,
            id,
        } = newData;

        await prisma.product.update({
            data: {
                categoryID,
                bulkEnabled,
                costPrice,
                coverImage,
                highlights,
                description,
                vatId,
                isActive,
                isFavorite,
                lowStock,
                photoSnapshots,
                sellingPrice,
                stock,
                tax,
                name,
                bulkTier: bulkTier.length > 0 ? {
                    upsert: bulkTier.map(tier => ({
                        create: {
                            discount: tier.discount,
                            quantity: tier.quantity,
                        },
                        update: {
                            discount: tier.discount,
                            quantity: tier.quantity,

                        },
                        where: {
                            id: tier.id ?? "",
                        }
                    }))
                } : undefined,
                variants: undefined,
            }, where: {
                id: id!,
            },
        });

        console.log(name.toUpperCase(), coverImage)
        return NextResponse.json({ id }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {

    try {

        const productData = await prisma.product.findMany({
            orderBy: {
                stock: 'desc'
            },
            include: {
                bulkTier: true,
                category: true,
                vatStatus: true,
                promotionalDiscount: true,
                variants: {
                    select: {
                        isArchived: true,
                        id: true,
                        imageUrl: true,
                        isPositive: true,
                        name: true,
                        price: true,
                        product: true,
                        productId: true,
                        stock: true,
                        details: true,
                    }
                },
            }
        });

        productData.map(p => {

            console.log(p.coverImage)
        })

        return NextResponse.json({ productData }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}