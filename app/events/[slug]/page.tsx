import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

const EventDetailsPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    return (
        <main>
            <Suspense fallback={<div>Loading event details...</div>}>
                <EventLoader params={params} />
            </Suspense>
        </main>
    );
};

async function EventLoader({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <EventDetails slug={slug} />;
}

export default EventDetailsPage;