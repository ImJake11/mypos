import { prisma } from "@/app/lib/utils/db/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { handleAccountManagement } from "../account-management/handleAccountManagement";
import { resendCode } from "./resendCode";
import { insetSessioToken } from "../token/insetSessionToken";
import { createNewActivityLog } from "../createNewActivityLog";
import { storeUserPayload } from "../cookies/storeUserPayload";

export async function signIn(req: NextRequest): Promise<NextResponse> {
    try {
        const { email, password } = await req.json();

        const _userData = await prisma.users.findUnique({
            where: { email },
            select: {
                isVerified: true,
                password: true,
                username: true,
                role: true,
                id: true,
            }
        });

        if (!_userData) {
            await createNewActivityLog({
                action: "User not found",
                relatedId: email,
                status: "FAILED",
                userId: email,
            });

            return NextResponse.json(
                { error: "No user found" },
                { status: 404 }
            );
        }

        const isPasswordMatch = await bcrypt.compare(password, _userData.password);

        if (!isPasswordMatch) {
            await createNewActivityLog({
                action: "Password not match",
                relatedId: email,
                status: "FAILED",
                userId: email,
            });

            return NextResponse.json(
                { error: "Password did not match, Please try again later" },
                { status: 420 }
            );
        }

        /** if user is not verified  */
        if (!_userData.isVerified) {
            const mannageAccount = await handleAccountManagement(req);
            const sendCode = await resendCode({
                email,
                username: _userData.username,
            });

            await createNewActivityLog({
                action: "Account not verified - verification code sent",
                relatedId: email,
                status: "FAILED",
                userId: email,
            });

            if (mannageAccount) return mannageAccount;
            if (sendCode) return sendCode;

            /** return 401 response to redirect user to confirmation page */
            return NextResponse.json(
                { redirect: "/ui/auth/confirm-email" },
                { status: 401 }
            );
        }

        const sessionError = await insetSessioToken(email);

        if (sessionError) {
            await createNewActivityLog({
                action: "Failed to sign in - session token error",
                relatedId: email,
                status: "FAILED",
                userId: email,
            });

            return sessionError;
        }

        // store user payload
        await storeUserPayload({
            id: _userData.id,
            role: _userData.role,
        });

        // Log successful login
        await createNewActivityLog({
            action: "User successfully logged in",
            relatedId: email,
            status: "SUCCESS",
            userId: email,
        });

        return NextResponse.json(
            {
                message: "Successfully logged in",
                role: _userData.role,
            },
            { status: 200 }
        );

    } catch (e) {
        await createNewActivityLog({
            action: "Internal server error",
            relatedId: "SYSTEM",
            status: "FAILED",
            userId: "SYSTEM",
        });

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
