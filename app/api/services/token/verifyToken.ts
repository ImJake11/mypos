import { prisma } from "@/app/lib/utils/db/prisma";
import { cookies } from "next/headers";

export const verifyToken = async (): Promise<boolean> => {

    try {
        const cookieStore = await cookies();

        const email = cookieStore.get("email")?.value;
        const token = cookieStore.get("session_token")?.value;

        if (!email || !token) {
            return false
        };

        const session = await prisma.sessionToken.findUnique({
            where: { email },
            select: {
                token: true,
                exp_at: true,
            },
        });

        if (!session) {
            return false
        };

        // compare token 
        const isTokenVerified = token === session.token;

        if (!isTokenVerified) {
            return false
        };

        const now = new Date();
        const exp = new Date(session.exp_at.toISOString());

        if (exp < now) {
            return false;
        }

        return true
    } catch (e) {
        return false
    }

}