import { prisma } from "@/app/lib/utils/db/prisma";
import { cookies } from "next/headers";

export const getUserRole = async (): Promise<string | undefined> => {
    try {
        const cookieStore = await cookies();

        const payload = cookieStore.get("user-payload")?.value;

        if (!payload) return undefined;

        const payloadJSON = JSON.parse(payload);

        const { role } = payloadJSON.payload;

        return role;

    } catch (e) {
        console.error(e);
        throw new Error("Failed to get user role");
    }
}
