// app/film/[filmid]/page.tsx (Server Component)
import CreditTrigger from "@/components/CreditTrigger";

export default async function Home({
                                       params,
                                   }: {
    params: Promise<{ filmid: string }>
}) {
    const { filmid } = await params;

    // In a real app, you would fetch your data here using the filmid
    // const filmData = await fetchFilmData(filmid);

    // Using mock data for illustration
    const filmData = {
        title: filmid.replace(/-/g, ' ').toUpperCase(),
        description: "This is a detailed description of the film project.",
        credits: [
            { role: "Director", name: "Director Name" },
            { role: "DP", name: "Cinematographer Name" }
        ]
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-8">{filmData.title}</h1>

            {/* Pass the dynamic data into the interactive trigger */}
            <CreditTrigger
                title={filmData.title}
                description={filmData.description}
                credits={filmData.credits}
            />
        </div>
    );
}