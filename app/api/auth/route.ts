import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createCookie } from "../services/cookies/createCookies";
import { createValidationToken } from "../services/createValidationToken";
import { resendSendEmail } from "../services/createNewEmail";
import EmailTemplateNewUser from "@/app/lib/components/EmailTemplates/EmailTemplateNewUser";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {

    try {

        const { email, password, username } = await req.json();


        const _validationToken = createValidationToken(email);

        const _hashedPasswoord = await bcrypt.hash(password, 10);

        await resendSendEmail({
            email: email,
            fullname: username,
            subject: "Email confirmation",
            template: EmailTemplateNewUser({ email, username, }),
        })

        await createCookie({
            req,
            cookieName: "verification_token",
            key: "validation_tokan",
            value: _validationToken,
        });

        await prisma.users.create({
            data: {
                username,
                email,
                password: _hashedPasswoord,
                validationToken: _validationToken,
            }
        });

        return NextResponse.json({ message: "User created" }, { status: 200 });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}