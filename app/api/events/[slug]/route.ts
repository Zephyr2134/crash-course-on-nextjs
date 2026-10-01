import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

type RouteParams = {
    params: Promise<{ slug: string }>;
};

export async function GET(
    req: NextRequest,
    { params }: RouteParams
): Promise<NextResponse> {
    try {
        const { slug } = await params;

        if (!slug || typeof slug !== 'string') {
            return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
        }

        await connectDB();

        const event = await Event.findOne({ slug: slug.toLowerCase().trim() }).lean();

        if (!event) {
            return NextResponse.json({ message: `Event "${slug}" not found` }, { status: 404 });
        }

        return NextResponse.json({ message: 'Event fetched successfully', event }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { message: 'Failed to fetch event', error: e instanceof Error ? e.message : 'Unknown error' },
            { status: 500 }
        );
    }
}