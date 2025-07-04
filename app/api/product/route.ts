
import { Prisma } from "@/app/generated/prisma";
import { BulkTableProp, ProductProps, VariantsProps } from "@/app/lib/models/productModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

    try {

        const body = await req.json();


        const { name,
            description,
            vatId,
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
            coverImageId,
            bulkEnabled, } = body;


        if (!name || !categoryID || !sellingPrice || !costPrice || !tax || !stock || !lowStock) {
            console.log("Some fields are empty");
            return NextResponse.json({ error: "Some field left empty" }, { status: 404 });
        }

        const rawBulkTier = bulkTier as BulkTableProp[];


        const { id } = await prisma.product.create({
            data: {
                coverImageId,
                highlights,
                categoryID,
                costPrice,
                coverImage,
                vatId,
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


        const newData: ProductProps = updatedRawData;

        console.log(newData);

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
            variants,
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
                promotionalDiscount: {
                    upsert: {
                        create: {
                            discountRate: promotionalDiscount.discountRate,
                            expirationDate: promotionalDiscount.expirationDate,
                            description: promotionalDiscount.description,
                        },
                        update: {
                            description: promotionalDiscount.description,
                            discountRate: promotionalDiscount.discountRate,
                            expirationDate: promotionalDiscount.expirationDate,

                        },
                        where: {
                            id: promotionalDiscount.id,
                        }
                    }
                },
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
                variants: {
                    upsert: variants.map(v => ({
                        create: {
                            isArchived: v.isArchived,
                            imageUrl: v.imageUrl,
                            name: v.name,
                            price: v.price,
                            stock: v.stock,
                            isPositive: v.isPositive,
                            details: v.details,
                        },
                        update: {
                            isArchived: v.isArchived,
                            imageUrl: v.imageUrl,
                            name: v.name,
                            price: v.price,
                            stock: v.stock,
                            details: v.details,
                            isPositive: v.isPositive,
                        },
                        where: {
                            id: v.id
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

        const productData = await prisma.product.findMany({
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

        return NextResponse.json({ productData }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}