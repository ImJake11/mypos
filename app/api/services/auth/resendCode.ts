import EmailTemplateNewUser from "@/app/lib/components/EmailTemplates/EmailTemplateNewUser";
import { prisma } from "@/app/lib/utils/db/prisma";
import bcrypt from "bcryptjs";
import { storeValidationCookie } from "../cookies/storeValidation";
import { resendSendEmail } from "../createNewEmail";
import { generateOTP } from "../generateOTP";
import { generateValidationToken } from "../token/generateValidationToken";
import { insertValidationToken } from "../token/insertNewValidationToken";
import { NextResponse } from "next/server";



export async function resendCode({
    email, username
}: {
    email: string,
    username: string,
}): Promise<NextResponse | undefined> {

    try {

        const token = await generateValidationToken(email);
        const otp = generateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);


        /** store otp and token to db */
        await prisma.users.update({
            where: { email },
            data: {
                otp: hashedOTP,
            }
        })

        await insertValidationToken({
            email,
            duration: 15,
            updateExpirationDate: true,
            token,
        })

        await storeValidationCookie(
            email, token
        );

        /** send new email */
        await resendSendEmail({
            email,
            subject: "Email Verification",
            template: EmailTemplateNewUser({
                email,
                otp,
                username: username,
            })
        })

    } catch (e) {
        return NextResponse.json(
            { error: "Failed to send code" },
            { status: 500 }
        )
    }
}