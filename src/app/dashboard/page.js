"use client";

import { useGuilds } from "@/app/hooks/useGuild";
import {
    Avatar,
    Box,
    Button,
    List,
    Grid2,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography, Skeleton
} from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import BotStatus from "@/app/components/BotStatus";
import SideBar from "@/app/components/SideBar";



export default function Dashboard() {
    const { guilds, loading, error } = useGuilds();

    if (error) return <Typography color="error">Error fetching guilds: {error.message}</Typography>;

    return (
        <>
            <Box>
                <Typography variant="h4" className={"font-bold ml-4 rounded-2xl"} gutterBottom>
                    Verfügbare Server:
                </Typography>
                <Paper className={"w-fit ml-4 rounded-2xl"} elevation={3} sx={{ p: 2 }}>
                    <Grid2 container spacing={2}>
                        <List>
                            {loading ? <FakeListItems/> :  <ListItems guilds={guilds}/>}
                        </List>
                    </Grid2>
                </Paper>
            </Box>
        </>
    );
}

function FakeListItems() {
    return <ListItem
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 2,
            "&:hover": {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            },
        }}
    >
        <ListItemAvatar>
            <Avatar
                sx={{ width: 56, height: 56 }}
            />
        </ListItemAvatar>
        <div>
            <Skeleton variant={"text"} width={200}></Skeleton>
            <Skeleton variant={"text"} width={180}></Skeleton>
        </div>
        <Button
            className={"rounded-3xl"}
            variant="contained"
            color="primary"
            startIcon={<LaunchIcon />}
            sx={{ textTransform: 'none', borderRadius: 999 }}
        >
            Open
        </Button>
    </ListItem>;
}


function ListItems(props) {
    return props.guilds.map(guild => (
            <ListItem
                key={guild.id}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    "&:hover": {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <ListItemAvatar>
                    <Avatar
                        src={guild.icon || "../assets/discord-logo.png"}
                        alt={guild.name}
                        sx={{ width: 56, height: 56 }}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={guild.name}
                    primaryTypographyProps={{
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}
                    secondary={`ID: ${guild.id}`}
                />
                <Button
                    className={"rounded-3xl"}
                    href={`/dashboard/${guild.id}`}
                    variant="contained"
                    color="primary"
                    startIcon={<LaunchIcon />}
                    sx={{ textTransform: 'none', borderRadius: 999 }}
                >
                    Open
                </Button>
            </ListItem>
        ));
}