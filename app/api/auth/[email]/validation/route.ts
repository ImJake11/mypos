
import { createSessionCookie } from "@/app/api/services/cookies/createCookies";
import { generateValidationToken } from "@/app/api/services/token/generateValidationToken";
import { prisma } from "@/app/lib/utils/db/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {

    try {

        const { email } = await params;

        const user_token = await prisma.validationToken.findUnique({
            where: {
                email,
            },
            select: {
                exp_at: true
            }
        })

        return NextResponse.json({ token_exp: user_token?.exp_at }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {

    try {

        const _session_exp_date = new Date();
        _session_exp_date.setHours(_session_exp_date.getHours() + 2);

        const { email } = await params;

        const { otp } = await req.json();

        const _user = await prisma.users.findUnique({
            where: {
                email,
            },
            select: {
                otp: true,
            }
        });

        if (!_user) {
            return NextResponse.json(
                { error: "No User token found" },
                { status: 404 });
        }

        const _userOtp = _user.otp;

        if (!_userOtp) {
            return NextResponse.json(
                { error: "No credentials found" },
                { status: 404 });
        }

        const isVerified = await bcrypt.compare(otp, _userOtp);

        if (!isVerified) {
            return NextResponse.json(
                { error: "OTP did not match" },
                { status: 401 });
        }

        await prisma.validationToken.delete({
            where: {
                email
            }
        });

        const _sessionToken = await generateValidationToken(email);


        // store session token to cookie
        await createSessionCookie({
            key: "session_token",
            value: _sessionToken,
        });

        //store user email to cookie
        await createSessionCookie({
            key: "email",
            value: email,
        })

        await prisma.sessionToken.create({
            data: {
                email,
                token: _sessionToken,
                exp_at: _session_exp_date,
            },
        })

        await prisma.users.update({
            where: {
                email,
            },
            data: {
                isActive: true,
                isVerified: true,
                otp: null,
            }
        })

        return NextResponse.json({ message: "Verified Successfully" }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}