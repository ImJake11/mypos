import { createNewActivityLog } from "@/app/api/services/createNewActivityLog";
import { createNewNotification } from "@/app/api/services/createNotification";
import { TransactionStatus } from "@/app/lib/enum/transactionStatus";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import io from "socket.io-client";

const socket = io(process.env.SOCKET_URL || "");

export async function PUT(req: NextRequest, { params }: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    try {

        const { reason, password } = await req.json();

        await prisma.transactionDetails.update({
            where: {
                transactionId: id,
            },
            data: {
                reason,
                status: TransactionStatus.VOID,
            }
        });

        await createNewActivityLog({
            action: "Void a transaction",
            relatedId: id,
            status: "SUCCESSFUL",
        })

        return NextResponse.json({ message: "Successfully Updated" }, { status: 200 });

    } catch (e) {
        await createNewActivityLog({
            action: "Void a transaction",
            relatedId: id,
            status: "FAILED",
        })


        return NextResponse.json({ error: "Internal  Server Error" }, { status: 500 });
    }
}