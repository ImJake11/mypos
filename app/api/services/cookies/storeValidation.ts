import { createCookie } from "./createCookies";

export async function storeValidationCookie(
    email: string,
    token: string,
) {
    const maxAge = 60 * 15;

    await createCookie({
        key: "email",
        value: email,
        maxAge,
    });

    await createCookie({
        key: `${email}_validation_token`,
        value: token,
        maxAge,
    });
}