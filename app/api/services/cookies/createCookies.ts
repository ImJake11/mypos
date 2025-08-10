import { cookies } from "next/headers";

export async function createCookie({
    key,
    value,
    maxAge,
}: {
    key: string;
    value: string;
    maxAge: number,
}) {

    const cookieStore = await cookies();

    cookieStore.set({
        name: key,
        value: value,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
        maxAge: maxAge,
        sameSite: "strict",
    });
}