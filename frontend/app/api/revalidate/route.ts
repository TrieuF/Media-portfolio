import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookPayload = {
    _type: string;
    slug?: {
        current?: string;
    };
};

export async function POST(req: NextRequest) {
    try {
        // 1. Verify the webhook signature using your environment secret
        const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(
            req,
            process.env.SANITY_REVALIDATE_SECRET
        );

        if (!isValidSignature) {
            return new NextResponse("Invalid signature", { status: 401 });
        }

        if (!body?._type) {
            return new NextResponse("Bad Request: Missing _type", { status: 400 });
        }

        // 2. Revalidate general tag for document type (e.g., "project", "siteSettings")
        revalidateTag(body._type, 'max');

        // 3. Revalidate specific document tag if a slug is present (e.g., "project:my-photo-slug")
        if (body.slug?.current) {
            revalidateTag(`${body._type}:${body.slug.current}`, 'max');
        }

        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            type: body._type,
            slug: body.slug?.current || null,
        });
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        console.error("Revalidation Error:", err);
        return new NextResponse(errorMessage, { status: 500 });
    }
}