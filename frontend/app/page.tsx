import Link from "next/link";


export default function Home() {
    return (
        <div className="min-h-screen bg-blue-400 text-white flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">Titlepage</h1>
            <Link href={"/film"}>this is a link</Link>
        </div>
    );
}