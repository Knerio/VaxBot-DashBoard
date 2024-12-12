"use client"

import {Suspense, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import axios from "axios";

function Validation() {
    const params = useSearchParams();
    const [error, setError] = useState("")

    useEffect(() => {
        const domain = window.location.hostname;
        const port = window.location.port ? `:${window.location.port}` : '';
        const redirectUri = `http${domain === "localhost" ? "" : "s"}://${domain}${port}/oauth/redirect`

        const code = params.get("code")
        axios({
            method: "POST",
            url: "https://api.knerio.tech/vaxbot/login",
            data: {
                code: code,
                "redirect-uri": redirectUri
            }
        })
            .then(json => {
                window.localStorage.setItem("token", json.data.data.token)
                window.location.replace("/dashboard")
            })
            .catch(error => {
                setError(error.response?.data?.message)
            })
    }, []);

    return <h1>
        {error}
    </h1>
}

export default function App() {
    return <Suspense>
        <Validation/>
    </Suspense>
}