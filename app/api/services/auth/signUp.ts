import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/utils/db/prisma";
import { generateOTP } from "../generateOTP";
import bcrypt from "bcryptjs";
import { generateValidationToken } from "../token/generateValidationToken";
import { AuthProvider } from "@/app/lib/enum/authProvider";
import { insertValidationToken } from "../token/insertNewValidationToken";
import { handleAccountManagement } from "../account-management/handleAccountManagement";
import { resendCode } from "./resendCode";
import { createNewActivityLog } from "../createNewActivityLog";
import { storeUserPayload } from "../cookies/storeUserPayload";

export async function signUp(req: NextRequest): Promise<NextResponse> {
    try {
        const { email, password, username } = await req.json();

        /** Check if current email is already registered */
        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            await createNewActivityLog({
                action: "SIGN UP - Email already exists",
                relatedId: email,
                status: "FAILED",
                userId: email,
            });

            return NextResponse.json(
                { error: "Email is already existing" },
                { status: 420 }
            );
        }

        /** Handle account restrictions / validations */
        const manageAccount = await handleAccountManagement(req);
        if (manageAccount) {
            await createNewActivityLog({
                action: "SIGN UP - Account management restriction",
                relatedId: email,
                status: "FAILED",
                userId: email,
            });
            return manageAccount;
        }

        /** Generate OTP and validation token */
        const otp = generateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);
        const token = await generateValidationToken(email);

        const insertValidation = await insertValidationToken({
            email,
            duration: 15,
            token,
            updateExpirationDate: true,
        });

        if (insertValidation) {
            await createNewActivityLog({
                action: "SIGN UP - Failed to insert validation token",
                relatedId: email,
                status: "FAILED",
                userId: email,
            });
            return insertValidation;
        }

        /** Create the new user */
        const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                provider: AuthProvider.PASSWORD,
                username,
                otp: hashedOTP,
            },
            select: {
                id: true,
                role: true,
            }
        });

        /** Send verification code */
        const sendCode = await resendCode({ email, username });
        if (sendCode) {
            await createNewActivityLog({
                action: "SIGN UP - Verification code sent",
                relatedId: email,
                status: "SUCCESS",
                userId: email,
            });
            return sendCode;
        }

        /** Successful signup */
        await createNewActivityLog({
            action: "SIGN UP - Account created successfully",
            relatedId: email,
            status: "SUCCESS",
            userId: email,
        });

        await storeUserPayload({
            id: newuser.id,
            role: newuser.role,
        })

        return NextResponse.json(
            {
                message: "Account created successfully",
                role: newuser.role,
            },
            { status: 200 }
        );

    } catch (e) {
        await createNewActivityLog({
            action: "SIGN UP - Internal server error",
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
