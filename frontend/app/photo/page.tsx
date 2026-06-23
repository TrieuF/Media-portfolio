import VideoLink from "@/components/VideoLink";


export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">photoooos</h1>
            <VideoLink
                videoId="dQw4w9WgXcQ"
                title="Never Gonna Give You Up"
                href="/photo/3"
            />
            <VideoLink
                videoId="dQw4w9WgXcQ"
                title="Never Gonna Give You Up"
                href="/photo/2"
            />
        </div>
    );
}