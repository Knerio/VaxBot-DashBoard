"use client"

import {useEffect} from "react";

export default function App() {


    useEffect(() => {
        const domain = window.location.hostname;
        const port = window.location.port ? `:${window.location.port}` : '';

        const encodedUrl = encodeURIComponent(`http${domain === "localhost" ? "" : "s"}://${domain}${port}/oauth/redirect`)

        const discordOauthURL = `https://discord.com/oauth2/authorize?client_id=1249334347513729094&response_type=code&redirect_uri=${encodedUrl}&scope=identify`

        window.location.replace(discordOauthURL)
    }, []);

    return <h1>Redirecting...</h1>
}