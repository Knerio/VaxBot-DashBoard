import {useEffect, useState} from "react";
import axios from "axios";

async function fetchChannelName(guildId, channelId, token) {
    const response = await axios({
        url: `https://api.knerio.tech/vaxbot/guilds/${guildId}/channel/${channelId}`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json"
        }
    });
    return response.data.data.name
}

async function fetchRoleName(guildId, roleId, token) {
    const response = await axios({
        url: `https://api.knerio.tech/vaxbot/guilds/${guildId}/role/${roleId}`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json"
        }
    });
    return response.data.data.name
}

export function useGuildConfig(guildId) {
    const [config, setConfig] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = window.localStorage.getItem("token");

        axios({
            url: `https://api.knerio.tech/vaxbot/guilds/${guildId}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        })
            .then(async response => {
                const data = response.data.data;

                const channelNames = await Promise.all(
                    Object.values(data.channels).map(channelId =>
                        fetchChannelName(guildId, channelId, token)
                    )
                );

                data.channels = Object.keys(data.channels).reduce((acc, key, index) => {
                    acc[key] = channelNames[index];
                    return acc;
                }, {});


                const roleNames = await Promise.all(
                    Object.entries(data.roles).map(async ([key, roleIds]) => {
                        const names = await Promise.all(
                            roleIds.map(roleId => fetchRoleName(guildId, roleId, token))
                        );
                        return [key, names];
                    })
                );

                data.roles = roleNames.reduce((acc, [key, names]) => {
                    acc[key] = names;
                    return acc;
                }, {});

                setConfig(data);
                setLoading(false);
            })
            .catch(err => {
                window.location.replace("/oauth/discord")
                setError(err);
                setLoading(false);
            });
    }, []);

    return {config, loading, error};
}
