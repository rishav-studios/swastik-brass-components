import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation endpoint.
 * Called by the admin panel after sector CRUD operations.
 *
 * POST body: { secret: string, tag: string }
 */
export async function POST(req: NextRequest) {
    try {
        const { secret, tag } = await req.json();

        if (secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!tag || typeof tag !== "string") {
            return NextResponse.json({ error: "Missing or invalid 'tag'" }, { status: 400 });
        }

        // revalidateTag(tag);
        return NextResponse.json({ revalidated: true, tag });
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
