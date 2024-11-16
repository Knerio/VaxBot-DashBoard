"use client"

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {createTheme} from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import {AppProvider} from '@toolpad/core/AppProvider';
import {DashboardLayout} from '@toolpad/core/DashboardLayout';
import {useDemoRouter} from '@toolpad/core/internal';
import {HomeIcon, WifiIcon} from "@heroicons/react/16/solid";
import logoBanner from "../assets/logo-banner.jpg"
import Image from "next/image";
import BotStatus from "@/app/components/BotStatus";
import {useRouter} from "next/router";
import {useEffect} from "react";
import Home from "@/app/page";
import Dashboard from "@/app/dashboard/page";
import RedirectPage from "@/app/oauth/discord/page";


const NAVIGATION = [
    {
        kind: 'header',
        title: 'Items',
    },
    {
        segment: '',
        title: 'Home',
        icon: <HomeIcon/>,
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon/>,
    }
];

function SideBar({children}) {
    return (
        <div className={"w-[20%]"}>
            <AppProvider
                navigation={NAVIGATION}
                branding={{
                    logo: <Image
                        src={logoBanner}
                        alt="Logo"
                        width={100}
                        height={100}
                    />,
                    title: "",
                }}
            >
                <DashboardLayout>
                    <BotStatus />
                    {children}
                </DashboardLayout>
            </AppProvider>
        </div>
    );
}


export default SideBar;