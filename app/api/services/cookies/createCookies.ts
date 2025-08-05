import { cookies } from "next/headers";

export async function createSessionCookie({
    key,
    value,
}: {
    key: string;
    value: string;
}) {

    const cookieStore = await cookies();

    cookieStore.set({
        name: key,
        value: value,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
        maxAge: 60 * 60 * 2,
        sameSite: "strict",
    });
}