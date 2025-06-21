
import { Prisma } from "@/app/generated/prisma";
import { BulkTableProp, NewProductProps, VariantsProps } from "@/app/lib/models/newProductModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

    try {

        const body = await req.json();


        const { name,
            description,
            categoryID,
            sellingPrice,
            costPrice,
            tax,
            stock,
            lowStock,
            variants,
            coverImage,
            photoSnapshots,
            promotionalDiscount,
            highlights,
            bulkTier,
            bulkEnabled, } = body;


        if (!name || !categoryID || !sellingPrice || !costPrice || !tax || !stock || !lowStock) {
            console.log("Some fields are empty");
            return NextResponse.json({ error: "Some field left empty" }, { status: 404 });
        }

        const rawBulkTier = bulkTier as BulkTableProp[];
        const rawVariants = variants as VariantsProps[]


        const { id } = await prisma.product.create({
            data: {
                highlights,
                categoryID,
                costPrice,
                coverImage,
                lowStock,
                name,
                sellingPrice,
                stock,
                tax,
                bulkTier: rawBulkTier ? {
                    create: rawBulkTier.map(v => ({
                        discount: v.discount,
                        quantity: v.quantity,
                    }))
                } : undefined,
                variants: undefined, // set to undefined because later we will update it once all photo url are retrieved
                photoSnapshots,
                description,
                bulkEnabled,
                promotionalDiscount: promotionalDiscount ? {
                    create: {
                        discountRate: promotionalDiscount.discountRate,
                        expirationDate: promotionalDiscount.expirationDate,
                        description: promotionalDiscount.description,
                    }
                } : undefined,
            },
            select: {
                id: true,
            }
        });

        return NextResponse.json({ productID: id }, { status: 200 })

    } catch (e) {
        console.log("Prisma error", e);
        return NextResponse.json({ error: "Error nga ni" }, { status: 500 })
    }
}


export async function PUT(req: NextRequest) {

    try {

        const { updatedRawData } = await req.json();


        const newData: NewProductProps = updatedRawData;

        const {
            bulkEnabled,
            bulkTier,
            categoryID,
            costPrice,
            coverImage,
            description,
            highlights,
            isActive,
            isFavorite,
            lowStock,
            name,
            photoSnapshots,
            promotionalDiscount,
            sellingPrice,
            stock,
            tax,
            variants,
            id,
        } = newData;

        console.log(id);

        await prisma.product.update({
            data: {
                categoryID,
                bulkEnabled,
                costPrice,
                coverImage,
                highlights,
                description,
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
                            id: tier.id!,
                        }
                    }))
                } : undefined,
                variants: {
                    upsert: variants.map(v => ({
                        create: {
                            isArchived: v.isArchived,
                            imageUrl: v.imageUrl,
                            name: v.name,
                            price: v.price,
                            stock: v.stock,
                            isPositive: v.isPositive,

                        },
                        update: {
                            isArchived: v.isArchived,
                            imageUrl: v.imageUrl,
                            name: v.name,
                            price: v.price,
                            stock: v.stock,
                            isPositive: v.isPositive,
                        },
                        where: {
                            id: v.id!
                        }
                    }))
                }

            }, where: {
                id: id!,
            }
        });

        return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}

export async function GET() {

    try {

        const data = await prisma.product.findMany({

            include: {
                bulkTier: true,
                category: true,
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
                    }
                },
            }
        });

        return NextResponse.json({ data }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}