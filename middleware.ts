import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const session_token = request.cookies.get("session_token")?.value;
    const email = request.cookies.get("email")?.value;

    const protectedRoutes = [
        "/",
        "/ui/point-of-sale"
    ];

    const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname === route);

    if (isProtectedRoute && (!session_token || !email)) {
        const landingUrl = new URL("/ui/auth/sign-up-page", request.nextUrl.origin);
        return NextResponse.redirect(landingUrl);
    }

    return NextResponse.next();
}

