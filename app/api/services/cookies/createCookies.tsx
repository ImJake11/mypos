import { strict } from "assert";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function createCookie(
    {
        req,
        cookieName,
        key,
        value,
    }:
        {
            req: NextRequest,
            cookieName: string,
            key: string,
            value: string,
        }
) {

    try {

        const cookie = serialize(key, value, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 1,
        });

        req.headers.set(cookieName, cookie);

    } catch (e) {

        throw new Error("Failed to set cookie");
    }
}