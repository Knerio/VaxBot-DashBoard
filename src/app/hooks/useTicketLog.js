import {useEffect, useState} from "react";
import axios from "axios";


async function fetchAttachment(attachmentId) {
    const token = window.localStorage.getItem("token");
    return await axios({
        url: `https://api.knerio.tech/vaxbot/ticket/attachment/${attachmentId}`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json"
        }
    }).then(response => {
        const body = response.data;
        const data = body.data;
        const fileData = data.data;
        const base64String = fileData.data;
        return {src: base64String, height: data.height, width: data.width};
    }).catch(error => {
        const newVar = {src: "https://cdn.knerio.tech/u/MhbZzp.png", width: 100, height: 100};
        return newVar;
    });
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
