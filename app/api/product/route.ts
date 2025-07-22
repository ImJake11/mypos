
import { BulkTableProp, ProductProps } from "@/app/lib/models/productModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import io from "socket.io-client";
import { createNewNotification } from "../services/createNotification";
import { NotificationFilterType } from "@/app/lib/enum/notificationType";

const socket = io(process.env.SOCKET_URL || "");

export async function POST(req: NextRequest) {

    try {

        const { data } = await req.json();

        const rawdata: ProductProps = data;

        const rawBulkTier = rawdata.bulkTier as BulkTableProp[];


        const { bulkEnabled,
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

        if (socket) {
            const payload = await createNewNotification({
                message: `Product ${name} added to you list, with a stock of ${stock}`,
                title: "New Product",
                type: NotificationFilterType.SYSTEM,
                relatedID: id,
            });

            socket.emit("notification_event", {
                data: payload,
                type: "add",
            });
        }

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

        if (socket) {
            const payload = await createNewNotification({
                message: `Product ${name} changes saved successfully`,
                title: "Product Update",
                type: NotificationFilterType.SUCCESSFUL,
                relatedID: id,
            });

            socket.emit("notification_event", {
                data: payload,
                type: "add",
            });
        }

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
            select: {
                stock: true,
                name: true,
                sellingPrice: true,
                coverImage: true,
                id: true,
                isActive: true,
                lowStock: true,
                isFavorite: true,
                variants: {
                    select: {
                        id: true,
                    }
                }
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