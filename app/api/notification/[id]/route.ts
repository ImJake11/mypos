import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import io from "socket.io-client";

const socket = io(process.env.SOCKET_URL!);

export async function PUT(req: NextRequest,
    { params }:
        { params: { id: string } }
) {

    const { id } = await params;

    try {

        await prisma.notifications.update({
            where: {
                id,
            },
            data: {
                isRead: true,
            }
        });

        if (socket) {
            console.log("Emitted");
            socket.emit("notification_event", { id, type: "delete" });
        }

        return NextResponse.json({ message: "Success dismissed the notification" }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal  Server Error" }, { status: 500 });
    }
}