"use client";
import Image from "next/image";
import posthog from "posthog-js";
import { eventDirectoryLogger } from "@/lib/posthog-logger";

const ExploreBtn = () => {
    const handleExplore = () => {
        console.log("CLICK");
        if (
            process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
            process.env.NEXT_PUBLIC_POSTHOG_HOST
        ) {
            posthog.capture("events_explored");
            eventDirectoryLogger.info("events exploration requested", {
                interaction: "explore_events",
            });
        }
    };

    return (
        <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={handleExplore}>
            <a href="#events">
                Explore Events
                <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} className="w-6 h-auto" />
            </a>
        </button>
    )
}

export default ExploreBtn