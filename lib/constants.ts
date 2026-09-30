export type EventItem = {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

export const events: EventItem[] = [
    {
        image: '/images/event1.png',
        title: "React Summit 2026",
        slug: "react-summit-2026",
        location: "Amsterdam, Netherlands",
        date: "2026-11-12",
        time: "09:00 AM",
    },
    {
        image: '/images/event2.png',
        title: "Global AI Hackathon",
        slug: "global-ai-hackathon",
        location: "Online",
        date: "2026-11-21",
        time: "10:00 AM",
    },
    {
        image: '/images/event3.png',
        title: "Next.js Conf",
        slug: "nextjs-conf",
        location: "San Francisco, CA, USA",
        date: "2026-12-03",
        time: "09:30 AM",
    },
    {
        image: '/images/event4.png',
        title: "Oslo Web Dev Meetup",
        slug: "oslo-web-dev-meetup",
        location: "Oslo, Norway",
        date: "2026-12-10",
        time: "06:00 PM",
    },
    {
        image: '/images/event5.png',
        title: "DevOps Days Berlin",
        slug: "devops-days-berlin",
        location: "Berlin, Germany",
        date: "2027-01-22",
        time: "08:45 AM",
    },
    {
        image: '/images/event6.png',
        title: "TypeScript Workshop Weekend",
        slug: "typescript-workshop-weekend",
        location: "London, UK",
        date: "2027-02-06",
        time: "10:00 AM",
    },
]