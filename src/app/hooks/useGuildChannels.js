import {useEffect, useState} from "react";
import axios from "axios";

export function useGuildChannels(guildId) {
    const [channels, setChannels] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = window.localStorage.getItem("token");

        axios({
            url: `https://api.knerio.tech/vaxbot/guilds/${guildId}/channels`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        })
            .then(async response => {
                const data = response.data.data;

                setChannels(data);
                setLoading(false);
            })
            .catch(err => {
                window.location.replace("/oauth/discord")
                setError(err);
                setLoading(false);
            });
    }, []);

    return {channels, loading, error};
}
