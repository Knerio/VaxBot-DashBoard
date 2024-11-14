"use client"

import {useGuilds} from "@/app/hooks/useGuild";

export default function Logic() {
    const {guilds, loading, error} = useGuilds();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching guilds: {error.message}</p>;

    return (
        <>
            {guilds.map(value => (
                <a href={"/dashboard/" + value.id} key={value.id}>{value.name}</a>
            ))}
        </>
    );
}