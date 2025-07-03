import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSocket } from "@/app/lib/utils/socket/socket";
import io from "socket.io-client";


const socket = io(process.env.SOCKET_URL!);


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

    try {

        const { id } = await params;

        const { isFavorite } = await req.json();

        if (!id || typeof isFavorite !== "boolean") {
            return NextResponse.json({ error: "Product id is required" }, { status: 400 });
        }

        await prisma.product.update({
            data: {
                isFavorite,
            },
            where: {
                id: id,
            }
        });


        const dataToEmit = {
            id: id,
            isFavorite: isFavorite,
        }

        if (socket) {
            socket.emit("favorite_event", dataToEmit);
        }

        return NextResponse.json({ message: "Product updated successfully" }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ error: "Intenral Server Error" }, { status: 500 });
    }
}