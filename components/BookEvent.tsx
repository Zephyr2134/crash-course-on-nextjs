'use client';

import { useState } from "react";

const BookEvent = () => {

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
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