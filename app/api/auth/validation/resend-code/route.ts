import { handleAccountManagement } from "@/app/api/services/account-management/handleAccountManagement";
import { resendCode } from "@/app/api/services/auth/resendCode";
import { createCookie } from "@/app/api/services/cookies/createCookies";
import { resendSendEmail } from "@/app/api/services/createNewEmail";
import { generateOTP } from "@/app/api/services/generateOTP";
import { getIpAddress } from "@/app/api/services/ip/getIpAddress";
import { generateValidationToken } from "@/app/api/services/token/generateValidationToken";
import EmailTemplateNewUser from "@/app/lib/components/EmailTemplates/EmailTemplateNewUser";
import { prisma } from "@/app/lib/utils/db/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse, userAgent } from "next/server";


export async function PUT(req: NextRequest) {

    try {
        const cookieStore = await cookies();
        const email = cookieStore.get('email')?.value;

        if (!email) {
            return NextResponse.json(
                { error: "Email not found" },
                { status: 404 }
            )
        }

        const user = await prisma.users.findUnique({
            where: {
                email,
            },
            select: {
                username: true,
            }
        });

        if (!user || !user.username) {
            return NextResponse.json(
                { error: "No User found" },
                { status: 404 },
            )
        }

        const accountManagement = await handleAccountManagement(req);
        const sendCode = await resendCode({
            email,
            username: user.username,
        });

        if (accountManagement) return accountManagement;
        if (sendCode) return sendCode;

        const exp_at = new Date();
        exp_at.setMinutes(exp_at.getMinutes() + 15);

        // return exp date
        return NextResponse.json(
            { new_exp_date: exp_at },
            { status: 200 }
        );

    } catch (e) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}