'use client';

import { createBooking } from "@/lib/actions/booking.actions";
import { useState } from "react";
import posthog from "posthog-js";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const { success } = await createBooking({ eventId, slug, email });

        if (success) {
            setSubmitted(true);
            posthog.capture('event_booked', { eventId, slug, email });
        } else {
            console.error('Booking failed:');
            posthog.captureException("Booking failed");
        }
    }

    return (
        <div className="book-event">
            {submitted ? (
                <p className="text-sm text-green-600">
                    Thank you for booking your spot!
                </p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="button-submit">Book Now</button>
                </form>
            )}
        </div>
    )
}

export default BookEvent;