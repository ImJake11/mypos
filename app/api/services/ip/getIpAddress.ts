import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";


export async function getIpAddress(request: NextRequest) {

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
        request.headers.get("x-real-ip");

    const hashedIp = await bcrypt.hash(String(ip), 10)
    return hashedIp;
}