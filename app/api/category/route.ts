import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/utils/db/prisma";
import io from "socket.io-client";

const socket = io(process.env.SOCKET_URL || "");

export async function GET(req: NextRequest) {

    try {

        const categoryData = await prisma.category.findMany();

        return NextResponse.json({ categoryData }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {

    const { content, url, id, imageId } = await req.json();

    try {

        const data = await prisma.category.upsert({
            create: {
                imageId,
                content,
                url,
            },
            update: {
                content,
                url,
            },
            where: {
                id
            },
            select: {
                id: true,
                content: true,
                imageId: true,
                url: true,
            }
        })

        const categoryEventType = id ? "UPDATE" : "CREATE";

        if (socket) {
            socket.emit("category_event", { payload: data, type: categoryEventType });
            console.log("Socket Emmited", categoryEventType);
        }

        return NextResponse.json({ message: "New Category Added", id: data.id }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
