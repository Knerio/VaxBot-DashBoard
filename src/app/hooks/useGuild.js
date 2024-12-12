// useGuilds.js
import { useEffect, useState } from "react";
import axios from "axios";

export function useGuilds() {
    const [guilds, setGuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = window.localStorage.getItem("token");

        axios({
            url: "https://api.knerio.tech/vaxbot/guilds?toString=true",
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        })
            .then(response => {
                setGuilds(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.message !== "Network Error") {
                    window.location.replace("/oauth/discord")
                }
                setError(err);
                setLoading(false);
            });
    }, []);

    return { guilds, loading, error };
}
