import { prisma } from "@/app/lib/utils/db/prisma";
import { generateValidationToken } from "./generateValidationToken";
import { NextResponse } from "next/server";



export async function insertValidationToken({
    email,
    duration = 15,
    updateExpirationDate = false,
    token = "",
    increment = false,
}: {
    email: string,
    token?: string,
    duration?: number,
    updateExpirationDate?: boolean,
    increment?: boolean,
}): Promise<NextResponse | undefined> {

    try {
        const exp_at = new Date();
        exp_at.setMinutes(exp_at.getMinutes() + duration);

        let update = {};

        if (updateExpirationDate) {
            update = {
                ...update,
                exp_at
            };
        }

        if (token) {
            update = {
                ...update,
                token,
            }
        }


        if (increment) {
            update = {
                ...update,
                verification_attempts: {
                    increment: 1
                }
            }
        }

        await prisma.validationToken.upsert({
            where: { email },
            create: {
                email,
                exp_at,
                token,
                verification_attempts: 1,
            },
            update,
        })

    } catch (e) {
        return NextResponse.json(
            { error: "Failed to add validation token" },
            { status: 500 }
        )
    }
}