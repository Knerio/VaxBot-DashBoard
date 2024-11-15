"use client"

import {useGuilds} from "@/app/hooks/useGuild";
import {Avatar, Button, Grid, Grid2, List, ListItem, ListItemAvatar, ListItemText, Paper} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import DashboardLayoutBasic from "@/app/components/SideBar";
import BotStatus from "@/app/components/BotStatus";
import {IconExternalLink} from "@tabler/icons-react";
import LaunchIcon from '@mui/icons-material/Launch';
import Box from "@mui/material/Box";

export default function Dashboard() {
    const {guilds, loading, error} = useGuilds();

    if (error) return <p>Error fetching guilds: {error.message}</p>;

    return (
        <>
            <BotStatus/>
            <Box>
                <h1 className={"font-bold ml-4 rounded-2xl"}>Verfügbare Server:</h1>
                <br/>
                <Paper className={"w-fit ml-4 rounded-2xl"} elevation={3}>
                    <Grid2 xs={12} md={6}>
                        <List>
                            {guilds.map(guild => (
                                <ListItem key={guild.id}>
                                    <ListItemText
                                        primary={guild.name}
                                    />
                                    <ListItemAvatar>
                                        <Button className={"rounded-3xl"} href={"/dashboard/" + guild.id}>
                                            <LaunchIcon/>
                                        </Button>
                                    </ListItemAvatar>
                                </ListItem>)
                            )}
                        </List>
                    </Grid2>
                </Paper>
            </Box>
        </>
    );
}