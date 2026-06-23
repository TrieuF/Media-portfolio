// app/page.tsx (Server Component)
import CreditTrigger from "@/components/CreditTrigger";

export default async function Home({ params }: { params: Promise<{ photoid: string }> }) {
    const { photoid } = await params;

    // Simulate fetching project data from a database
    const projectData = {
        title: "NEON NIGHTS",
        description: "A short film exploring the intersection of urban light...",
        credits: [{ role: "Director", name: "Jane Doe" }]
    };

    return (
        <div className="min-h-screen bg-red-400 text-white flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">{photoid}</h1>

            {/* This remains a Server Component, only the child below is interactive */}
            <CreditTrigger
                title={projectData.title}
                description={projectData.description}
                credits={projectData.credits}
            />
        </div>
    );
}