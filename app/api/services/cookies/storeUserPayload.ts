import { createCookie } from "./createCookies";



export async function storeUserPayload({
    id, role,
}:
    { id: string, role: string }) {

    const maxAge = 60 * 60 * 5;

    const payload = {
        id,
        role,
    }

    await createCookie({
        key: "user-payload",
        maxAge,
        value: JSON.stringify({ payload }),
    });


}