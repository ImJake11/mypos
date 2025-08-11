import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "./app/api/services/auth/getUserRole";

const protectedRoutes = [
    "/ui/inventory/product-form",
    "/ui/settings/store-setup/categories",
];

export async function middleware(request: NextRequest) {

    const session_token = request.cookies.get("session_token")?.value;
    const email = request.cookies.get("email")?.value;

    const userRole = await getUserRole();

    const isProtectedRoute = protectedRoutes.some(route => route === request.nextUrl.pathname);

    if (!session_token || !email) {
        const landingUrl = new URL("/ui/auth/sign-up-page", request.nextUrl.origin);
        return NextResponse.redirect(landingUrl);
    }

    if (isProtectedRoute && (!userRole || userRole === "user")) {
        const landingUrl = new URL("/", request.nextUrl.origin);
        return NextResponse.redirect(landingUrl);
    }


    return NextResponse.next();
}


export const config = {
    matcher: [
        /**
         * Protect everything except:
         * - /ui/auth/** (login, sign-up, forgot password, etc.)
         * - /_next/static (Next.js build files)
         * - /_next/image (Next.js image optimization)
         * - /favicon.ico (favicon)
         * - /public assets like /images, /css, etc.
         */
        "/((?!api/auth|ui/auth|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)).*)",
    ],
};
