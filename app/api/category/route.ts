import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/utils/db/prisma";
import { getSocket } from "@/app/lib/utils/socket/socket";

const socket = getSocket();

export async function GET(req: NextRequest) {

    try {

        const data = await prisma.category.findMany();

        return NextResponse.json({ data }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {

    const { content } = await req.json();

    try {

        const data = await prisma.category.create({
            data: {
                content,
            },
            select: {
                content: true,
                id: true,
            }
        });

        if (socket) {
            socket.emit("category_event", { payload: data, type: "CREATE" });
        }

        return NextResponse.json({ message: "New Category Added" }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {

    try {

        const { id, content } = await req.json();

        const data = await prisma.category.update({
            data: {
                content,
            },
            where: {
                id,
            },
            select: {
                content: true,
                id: true,
            }
        });

        if (socket) {
            socket.emit("category_event", { payload: data, type: "UPDATE"});
        }

        return NextResponse.json({}, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}