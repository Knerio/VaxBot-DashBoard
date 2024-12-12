import {useEffect, useState} from "react";
import axios from "axios";


async function fetchAttachment(attachmentId) {
    console.log(attachmentId)
    const token = window.localStorage.getItem("token");
    const response = await axios({
        url: `https://api.knerio.tech/vaxbot/ticket/attachment/${attachmentId}`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json"
        }
    });
    const res = response.data.data;
    return {src: res.data, width: res.width, height: res.height};
}

function fetchUserdata(guildId, userId) {
    const token = window.localStorage.getItem("token");
    return axios({
        url: `https://api.knerio.tech/vaxbot/guilds/${guildId}/users/${userId}?toString=true`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json"
        }
    })
        .then(response => {
            return response.data.data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            throw error;
        });
}

export function useTicket(ticketId) {
    const [ticket, setTicket] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = window.localStorage.getItem("token");

        axios({
            url: `https://api.knerio.tech/vaxbot/ticket/${ticketId}?toString=true`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        })
            .then(async response => {
                const data = response.data.data;
                setTicket(data);
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

    return {ticket, loading, error, fetchAttachment, fetchUserdata};
}
