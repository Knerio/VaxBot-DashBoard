"use client"

import {IconBrandDiscord} from "@tabler/icons-react";
import logoBanner from "./assets/logo-banner.jpg"
import Image from "next/image";
import {useEffect} from "react";

export default function Home() {

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            window.location.replace("/dashboard")
        }
    }, []);

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    src={logoBanner}
                    alt="Logo"
                    width={300}
                    height={50}
                    priority
                />
                <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2">
                        Get started by logging in
                    </li>
                    <li>Configure the discord bot.</li>
                </ol>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <a
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        href="/oauth/discord"
                    >
                        <IconBrandDiscord size={20}/>
                        Login with Discord
                    </a>

                </div>
            </main>
        </div>
    );
}