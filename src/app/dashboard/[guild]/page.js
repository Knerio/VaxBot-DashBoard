"use client"
import React, {useState} from 'react';
import {useGuildConfig} from "@/app/hooks/useGuildConfig";
import {useParams} from "next/navigation";

const JsonViewer = ({data}) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    if (typeof data === 'object' && data !== null) {
        return (
            <div className="ml-6">
                <button
                    onClick={toggle}
                    className="text-blue-500 font-semibold"
                >
                    {isOpen ? '[-]' : '[+]'}
                </button>
                <div className="ml-4">
                    {isOpen && (
                        <div>
                            {Array.isArray(data) ? (
                                data.map((item, index) => (
                                    <div key={index} className="py-1">
                                        <JsonViewer data={item}/>
                                    </div>
                                ))
                            ) : (
                                Object.keys(data).map((key, index) => (
                                    <div key={index} className="py-1">
                                        <span className="font-bold text-gray-300">{key}:</span>
                                        <JsonViewer data={data[key]}/>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <span className="text-gray-200">{JSON.stringify(data)}</span>
        );
    }
};

const GuildConfig = () => {
    const {guild} = useParams();
    const {config, error, loading} = useGuildConfig(guild);

    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">Error fetching guilds: {error.message}</p>;


    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Guild Configuration</h1>
            <div className="bg-gray-800 text-white w-[40%] h-[80vh] p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                <JsonViewer data={config}/>
            </div>
        </div>
    );
};

export default GuildConfig;
