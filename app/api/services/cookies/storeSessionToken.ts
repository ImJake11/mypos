import { createCookie } from "./createCookies";


export async function storeSessionToken(
    email: string,
    token: string,
) {
    const maxAge = 60 * 60 * 3;

    await createCookie({
        key: "email",
        value: email,
        maxAge,
    });

    await createCookie({
        key: "session_token",
        value: token,
        maxAge,
    })
}