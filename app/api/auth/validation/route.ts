
import { generateValidationToken } from "@/app/api/services/token/generateValidationToken";
import { prisma } from "@/app/lib/utils/db/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createCookie } from "../../services/cookies/createCookies";
import { insetSessioToken } from "../../services/token/insetSessionToken";
import { storeSessionToken } from "../../services/cookies/storeSessionToken";
import { storeUserPayload } from "../../services/cookies/storeUserPayload";

// get user token
export async function GET(req: NextRequest) {

    try {
        const cookieStore = await cookies();

        const email = cookieStore.get('email')?.value;
        const token = cookieStore.get(`${email}_validation_token`)?.value;

        if (!email || !token) {
            return NextResponse.json(
                { error: "No credentials found" },
                { status: 404 },
            )
        }

        const user_token = await prisma.validationToken.findUnique({
            where: {
                email,
            },
            select: {
                exp_at: true
            }
        })

        return NextResponse.json({ token_exp: user_token?.exp_at, email }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


// user verified the otp
export async function PUT(req: NextRequest) {

    return await verifyOTP(req);
}


async function verifyOTP(req: NextRequest): Promise<NextResponse> {

    try {

        const { otp } = await req.json();

        const cookieStore = await cookies();

        const email = cookieStore.get('email')?.value;
        const cookieToken = cookieStore.get(`${email}_validation_token`)?.value;

        if (!email || !cookieToken) return NextResponse.json(
            { error: "No valid credentials found, Please resend a code" },
            { status: 404 },
        )

        const _userData = await prisma.users.findUnique({
            where: { email },
            select: {
                otp: true,
            }
        })

        const _validationToken = await prisma.validationToken.findUnique({
            where: { email },
            select: {
                token: true,
                exp_at: true,
                verification_attempts: true
            }
        });

        if (!_validationToken || !_userData) {
            return NextResponse.json(
                { error: "OTP Verification failed, Please resend a code" },
                { status: 420 }
            )
        }

        const isExpired = new Date(_validationToken.exp_at) < new Date();

        if (isExpired) return NextResponse.json(
            { error: "Token expired, Please resend a code" },
            { status: 420 }
        );

        const isReachedLimit = (_validationToken.verification_attempts ?? 0) >= 5;

        if (isReachedLimit) return NextResponse.json(
            { error: "Failed to verify this OTP, too many request Please resend a new code" },
            { status: 420 }
        );

        const isOTPMatched = await bcrypt.compare(otp, _userData.otp ?? "");

        if (!isOTPMatched) {

            /** increment the attempt number */
            await prisma.validationToken.update({
                where: { email },
                data: {
                    verification_attempts: { increment: 1 }
                }
            });

            return NextResponse.json(
                { error: "OTP did not matched" },
                { status: 420 }
            )
        }

        const user = await prisma.users.update({
            where: { email },
            data: {
                otp: null,
                isVerified: true,
                isActive: true,
            },
            select: {
                id: true,
                role: true,
            }
        });

        await prisma.validationToken.delete({
            where: { email }
        })

        /** generate session token */
        const token = await generateValidationToken(email);
        const exp_at = new Date();
        exp_at.setHours(exp_at.getHours() + 3);

        await prisma.sessionToken.upsert({
            where: { email },
            create: {
                email,
                exp_at,
                token,
            },
            update: {
                token,
                exp_at,
            }
        });

        const session = await insetSessioToken(email);

        if (session) return session;

        await storeUserPayload({
            id: user.id,
            role: user.role,
        });

        return NextResponse.json(
            {
                message: "User account verified",
                role: user.role,
            },
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}