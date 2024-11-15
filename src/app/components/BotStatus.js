"use client";

import {Box, Tooltip, Paper} from "@mui/material";
import {IconWifi} from "@tabler/icons-react";
import {usePing} from "@/app/hooks/usePing";

export default function BotStatus() {
    const {error, loading} = usePing();

    const statusColor = error ? "red" : loading ? "gray" : "green";
    const statusMessage = error
        ? "Der Bot reagiert aktuell nicht."
        : "Der Bot reagiert auf die Ping-Anfrage.";

    return (
        <Box padding={3} className={"grid justify-items-end "}>
            <Paper elevation={3} className={""}>
                <Tooltip title={statusMessage}>
                    <IconWifi size={50}  color={statusColor}></IconWifi>
                </Tooltip>
            </Paper>
        </Box>
    );
}
