import { cookies } from "next/headers";


export async function getUserId(): Promise<string | undefined> {

    const cookieStore = await cookies();
    const user = cookieStore.get('email')?.value;

    return user;
}   