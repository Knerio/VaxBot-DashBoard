"use client"

import {useEffect} from "react";

export default function App() {
    useEffect(() => {
        if (window.localStorage.getItem("token") === undefined) window.location.replace("/")
    }, []);

    return <>

    </>
}