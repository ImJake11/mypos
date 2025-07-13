import { CartCacheModel, CartModel } from "@/app/lib/models/cartModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import io from "socket.io-client";
import { URL } from "url";

const socket = io(process.env.SOCKET_URL || "");

export async function POST(req: NextRequest) {

    try {
        const { cartCacheData } = await req.json();

        const data: CartCacheModel = cartCacheData;

        if (data.cartId === undefined) {

            const savedData = await prisma.cartCache.create({
                data: {
                    quantity: data.quantity,
                    total: data.total,
                    userId: data.userId,
                    vatStatus: data.vatStatus,
                    variantUnitPrice: data.variantUnitPrice,
                    bulkPricingID: data.bulkPricingID ? data.bulkPricingID : null,
                    mainProductID: data.mainProductID,
                    productId: data.productId,
                    promotionalDiscountID: data.promotionalDiscountID ? data.promotionalDiscountID : null,
                }
            });

            if (socket) {
                socket.emit("cart_cached_event", {
                    type: "CREATE",
                    payload: savedData,
                });
            }

            return NextResponse.json({ message: "Successfully saved new cache" }, { status: 200 });
        } else {

            await prisma.cartCache.update({
                where: {
                    cartId: data.cartId,
                },
                data: {
                    quantity: data.quantity,
                    total: data.total,
                }

            });

            if (socket) {
                socket.emit("cart_cached_event", {
                    type: 'UPDATE',
                    payload: {
                        quantity: data.quantity,
                        total: data.total,
                    }
                });
            }
        }

        console.log("Product updated");

        return NextResponse.json({ message: "Successfully updated the product" }, { status: 200 });
    } catch (e) {

        console.log(e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {

    try {

        const { searchParams } = new URL(req.url);

        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User id required" }, { status: 400 });
        }

        await prisma.cartCache.deleteMany({
            where: {
                userId,
            }
        });


        return NextResponse.json({ message: "Successfully deleted all items" }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}


export async function GET() {

    try {

        const cachedData = await prisma.cartCache.findMany({

            where: {
                userId: "tempo"
            },
            orderBy: {
                total: "desc",
            },
            include: {
                product: true,
                mainProduct: true,
                bulkPricing: true,
                promotionalDiscount: true,
            }
        });

        return NextResponse.json({ cachedData }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}