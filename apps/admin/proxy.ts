import { createServerSupabaseClient } from '@swastik/supabase';
import { NextResponse, type NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request,
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    // If env variables are not loaded yet, let request pass
    if (!supabaseUrl || !supabaseAnonKey) {
        return response;
    }

    const supabase = await createServerSupabaseClient()

    // Refresh session and fetch current logged-in user
    const { data: { user } } = await supabase.auth.getUser();

    const isLoginPage = request.nextUrl.pathname.startsWith('/login');

    // Case 1: Not logged in, trying to access protected admin pages
    if (!user && !isLoginPage) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // Case 2: Logged in, trying to access the login page
    if (user && isLoginPage) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - api (API routes)
         * - Any file extensions (e.g. svg, png, jpg, jpeg, gif, webp)
         */
        '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
