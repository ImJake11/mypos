import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { signIn } from "../services/auth/signIn";
import { signUp } from "../services/auth/signUp";

// sign up or create a user
export async function POST(req: NextRequest) {

    return await signUp(req)
}


// get user session token
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
                { error: "User token expires" },
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

    return await signIn(req);
}

/** functions */

