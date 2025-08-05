import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { resendSendEmail } from "../services/createNewEmail";
import EmailTemplateNewUser from "@/app/lib/components/EmailTemplates/EmailTemplateNewUser";
import bcrypt from "bcryptjs";
import { generateValidationToken } from "../services/token/generateValidationToken";
import { generateOTP } from "../services/generateOTP";
import { AuthProvider } from "@/app/lib/enum/authProvider";
import { createSessionCookie } from "../services/cookies/createCookies";



export async function POST(req: NextRequest) {
    const exp_date = new Date();
    exp_date.setMinutes(exp_date.getMinutes() + 15)

    try {
        const { email, password, username } = await req.json();
        const _otp = generateOTP();

        const _hashedPasswoord = await bcrypt.hash(password, 10);
        const _hashedOtp = await bcrypt.hash(_otp, 10);

        const _validationToken = await generateValidationToken(email);

        const _users = await prisma.users.findUnique({
            where: {
                email,
            }
        });

        if (_users) {
            return NextResponse.json(
                { error: "Email Address is existing" },
                { status: 400 },
            )
        }

        const token = await prisma.validationToken.create({
            data: {
                email,
                exp_at: exp_date,
                token: _validationToken,
            },
            select: {
                id: true,
            }
        })

        await prisma.users.create({
            data: {
                provider: AuthProvider.PASSWORD,
                username,
                email,
                password: _hashedPasswoord,
                otp: _hashedOtp,
            },
        });

        await resendSendEmail({
            email: email,
            fullname: username,
            subject: "Email Confirmation",
            template: EmailTemplateNewUser({ email, username, otp: _otp }),
        });

        return NextResponse.json({ message: "User created" }, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {

    try {
        const email = req.cookies.get("email")?.value;
        const token = req.cookies.get("session_token")?.value;


        if (!email || !token) {
            return NextResponse.json(
                { error: "No credentials found" },
                { status: 404 }
            )
        };

        const session = await prisma.sessionToken.findUnique({
            where: { email },
            select: {
                token: true,
                exp_at: true,
            },
        });

        if (!session) {
            return NextResponse.json(
                { error: "No credentials found" },
                { status: 404 }
            )
        };

        // compare token 
        const isTokenVerified = token === session.token;

        if (!isTokenVerified) {
            return NextResponse.json(
                { error: "User token is not verified" },
                { status: 404 }
            )
        };

        const now = new Date();
        const exp = new Date(session.exp_at.toISOString());

        if (exp < now) {
            return NextResponse.json(
                { error: "USer token expires" },
                { status: 401 }
            )
        }

        return NextResponse.json(
            { message: "User verified" },
            { status: 200 }
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

        const { email, password } = await req.json();

        const _users = await prisma.users.findUnique({
            where: {
                email,
            },
            select: {
                password: true,
            }
        });

        if (!_users) {
            return NextResponse.json(
                { error: "Account not existin" },
                { status: 404 }
            )
        }

        const _dbPassword = _users.password;

        const isMatch = await bcrypt.compare(password, _dbPassword);

        if (!isMatch) {
            return NextResponse.json(
                { error: "Password did not match" },
                { status: 404 },
            )
        }

        const exp_date = new Date();
        exp_date.setHours(exp_date.getHours() + 2);

        const sessionToken = await generateValidationToken(email);

        await createSessionCookie({
            key: "email",
            value: email,
        });

        await createSessionCookie({
            key: "session_token",
            value: sessionToken,
        })

        await prisma.sessionToken.update({
            where: {
                email,
            },
            data: {
                created_at: new Date(),
                exp_at: exp_date,
                token: sessionToken,
            }
        });

        return NextResponse.json(
            { message: "Logged in successfully" },
            { status: 200 }
        )

    } catch (e) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}