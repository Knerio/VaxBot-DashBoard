"use client"

import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useTicket} from "@/app/hooks/useTicketLog";
import Base64Image from "@/app/components/Base64Image";

const Ticket = () => {
    const {ticketid} = useParams();
    const {ticket, loading, fetchAttachment, fetchUserdata} = useTicket(ticketid);
    const history = ticket.history;

    if (loading) return <h1 className="text-center text-white">Loading...</h1>;


    return (
        <div className="bg-[#2f3136] text-white p-6 max-w-3xl mx-auto rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-6 text-[#7289da]">Ticket #{ticketid}</h1>
            <div className="space-y-4">
                {history.map((message) => (
                    <Message
                        key={message.id}
                        messageId={message.id}
                        guildId={ticket.guildId}
                        senderId={message.senderId}
                        content={message.content}
                        files={message.files}
                        fetchAttachment={fetchAttachment}
                        fetchUserdata={fetchUserdata}
                    />
                ))}
            </div>
        </div>
    );
};

export default Ticket;
const Message = ({messageId, guildId, senderId, content, files, fetchAttachment, fetchUserdata}) => {
    // State to hold the fetched username
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState(null);

    // Extract timestamp from messageId (ObjectId)
    const messageTimestamp = parseInt(messageId.toString().substring(0, 8), 16) * 1000;
    const messageDate = new Date(messageTimestamp);

    const now = new Date();
    const isSameDay = now.toDateString() === messageDate.toDateString();

    // Format time as HH:mm if same day, DD.MM.YYYY HH:mm if different day
    const formattedTime = isSameDay
        ? messageDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) // HH:mm
        : messageDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }); // DD.MM.YYYY HH:mm

    // Format content to handle newlines
    const formatContent = (text) => {
        return text.split('\n').map((str, index) => (
            <React.Fragment key={index}>
                {str}
                {index !== text.split('\n').length - 1 && <br/>}
            </React.Fragment>
        ));
    };

    // Fetch username on component mount
    useEffect(() => {
        const fetchData = async () => {
            if (fetchUserdata && senderId) {
                try {
                    if (senderId === '-1') {
                        setUsername("Varilx.DE | System")
                        setAvatar("https://cdn.knerio.tech/u/t9GCh9.png")
                        return
                    }

                    const data = await fetchUserdata(guildId, senderId);
                    setUsername(data.effectiveName);
                    setAvatar(data.avatar.data);
                } catch (error) {
                    console.error("Failed to fetch username", error);
                }
            }
        };

        fetchData();
    }, [senderId, fetchUserdata]);

    return (
        <div className="bg-[#36393f] text-white p-4 rounded-md mb-4 shadow-md">
            <div className="flex items-start space-x-4"> {/* Changed items-center to items-start */}
                <Base64Image src={avatar}/>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div className="font-bold text-lg">{username || senderId}</div>
                        <div className="text-sm text-gray-400">{formattedTime}</div>
                    </div>
                    <div className="mt-2">{formatContent(content) || <em>No content</em>}</div>
                </div>
            </div>
            {files && files.length > 0 && (
                <div className="mt-3">
                    {files.map((file, index) => (
                        <div key={index}>
                            {file.reference && <Base64Image promise={fetchAttachment(file.reference)}/>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};