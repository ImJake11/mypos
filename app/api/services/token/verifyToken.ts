import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const verifyToken = async (): Promise<boolean> => {

    const cookieStore = cookies();
    const cookieHeader = (await cookieStore).getAll().map(c => `${c.name}=${c.value}`).join("; ")

    const port = process.env.WEBSITE_PORT;
    const host = process.env.WEBSITE_HOST;
    const protocol = process.env.WEBSITE_PROTOCOL;

    const baseUrl = `${protocol}://${host}:${port}/api/auth`

    const res = await fetch(baseUrl, {
        method: "GET",
        headers: {
            Cookie: cookieHeader,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const { error } = await res.json();
        console.log(error);
        return false;
    }

    return true;

}