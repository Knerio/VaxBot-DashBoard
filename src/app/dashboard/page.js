"use client"

import {Suspense, useEffect, useState} from "react";
import axios from "axios";

function Logic() {
    const [guilds, setGuilds] = useState([]);

    useEffect(() => {
        const token = window.localStorage.getItem("token")

        axios( {
            url: "https://api.knerio.tech/vaxbot/guilds",
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }

        }).then(r => {
            console.log(r);
        })
    }, []);

    return <h1>
    </h1>
}

export default function App() {
    return <Suspense>
        <Logic/>
    </Suspense>
}