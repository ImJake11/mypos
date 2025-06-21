import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/utils/db/prisma";
import io from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

const socket = io(String(process.env.SOCKET_URL));

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

        socket.emit("add_category", data)

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

        socket.emit("update_category", data);

        return NextResponse.json({}, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}