// useGuilds.js
import { useEffect, useState } from "react";
import axios from "axios";

export function usePing() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios({
            url: "https://api.knerio.tech/vaxbot/ping",
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    setError(true)
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return { loading, error };
}
