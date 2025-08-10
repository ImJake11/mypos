import { NextRequest, NextResponse } from "next/server";
import { generateValidationToken } from "../../services/token/generateValidationToken";
import { insertValidationToken } from "@/app/api/services/token/insertNewValidationToken";
import { resendSendEmail } from "../../services/createNewEmail";
import EmailTemplateResetPassword from "@/app/lib/components/EmailTemplates/EmailTemplateResetPassword";
import { prisma } from "@/app/lib/utils/db/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {

    try {

        const { email } = await req.json();
        const base64Email = btoa(email);

        /** check first if email is existing */
        const users = await prisma.users.findUnique({
            where: { email },
        })

        if (!users) return NextResponse.json(
            { error: "No account with this email existing" },
            { status: 404 }
        );

        const token = await generateValidationToken(email);

        const query = `${token}_${base64Email}`;

        await resendSendEmail({
            subject: "Reset password",
            template: EmailTemplateResetPassword({
                email,
                query,
            }),
            email,
        })

        await insertValidationToken({
            token,
            updateExpirationDate: true,
            email,
            duration: 30,
        });

        return NextResponse.json(
            { message: "Sucessfully sent the link" },
            { status: 200 },
        )

    } catch (e) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}


export async function PUT(req: NextRequest) {

    try {

        const { password, query } = await req.json();

        const [token, base64Email] = query.split("_");

        const email = atob(base64Email);

        const user = await prisma.users.findUnique({
            where: { email },
        })

        console.log(query);

        if (!user) return NextResponse.json(
            { error: "Failed no user found" },
            { status: 404 }
        )

        /** verify token */
        const validationToken = await prisma.validationToken.findUnique({
            where: { email },
            select: {
                token: true,
                exp_at: true,
            }
        });

        if (!validationToken ||
            token !== validationToken.token) return NextResponse.json(
                { error: "This link is expired, Please resend new link" },
                { status: 420 }
            )


        const now = new Date();
        const eat = new Date(validationToken.exp_at);

        if (eat < now) return NextResponse.json(
            { error: "Link is expired, Please resend link" },
            { status: 420 },
        )

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.users.update({
            where: { email },
            data: {
                password: hashedPassword,
            }
        })

        /** delete the token when verified */
        await prisma.validationToken.delete({
            where: { email }
        })

        return NextResponse.json(
            { redirect: "/ui/auth/sign-in-page" },
            { status: 200 }
        )

    } catch (e) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}