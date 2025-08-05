import { resendSendEmail } from "@/app/api/services/createNewEmail";
import { generateOTP } from "@/app/api/services/generateOTP";
import { generateValidationToken } from "@/app/api/services/token/generateValidationToken";
import EmailTemplateNewUser from "@/app/lib/components/EmailTemplates/EmailTemplateNewUser";
import { prisma } from "@/app/lib/utils/db/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const exp_date = new Date();
exp_date.setMinutes(exp_date.getMinutes() + 15);

export async function PUT(req: NextRequest,
    { params }: { params: Promise<{ email: string }> }
) {
    const { email } = await params;

    console.log(email);
    try {
        const _otp = generateOTP();
        const hashedOtp = await bcrypt.hash(_otp, 10);

        // get user details and current token id
        const user = await prisma.users.findUnique({
            where: {
                email,
            },
            select: {
                username: true,
            }
        });

        if (!user) {
            return NextResponse.json(
                { error: "No User found" },
                { status: 404 },
            )
        }

        // send new code
        await resendSendEmail({
            email,
            subject: "Confirmation Code",
            template: EmailTemplateNewUser({ email, otp: _otp, username: user?.username ?? "" })
        });

        // generate new validation token
        const _newToken = await generateValidationToken(email);

        // update new token data to database
        const _token = await prisma.validationToken.update({
            where: {
                email,
            },
            data: {
                token: _newToken,
                exp_at: exp_date,
                created_at: new Date(),
            },
            select: {
                id: true,
            }
        })

        // update new otp to user data base
        await prisma.users.update({
            where: {
                email,
            },
            data: {
                otp: hashedOtp,
            }
        });

        // return exp date
        return NextResponse.json(
            { new_exp_date: exp_date },
            { status: 200 }
        )

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}