import { prisma } from "@/app/lib/utils/db/prisma";
import { storeSessionToken } from "../cookies/storeSessionToken";
import { generateValidationToken } from "./generateValidationToken";
import { NextResponse } from "next/server";
import { createNewActivityLog } from "../createNewActivityLog";


export async function insetSessioToken(email: string): Promise<NextResponse | undefined> {

    try {

        /** set user as active when it is already verified */
        const sessionToken = await generateValidationToken(email);
        const exp_at = new Date();
        exp_at.setHours(exp_at.getHours() + 5);

        await prisma.users.update({
            where: { email },
            data: {
                isActive: true,
            }
        });

        /** set user session token */
        await prisma.sessionToken.upsert({
            where: { email },
            create: {
                email,
                exp_at,
                created_at: new Date(),
                token: sessionToken,
            },
            update: {
                token: sessionToken,
                exp_at,
            }
        })

        await storeSessionToken(email, sessionToken);


    } catch (e) {
        return NextResponse.json(
            { error: "Failed to add session token" },
            { status: 500 }
        )
    }
}