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
import {WifiIcon} from "@heroicons/react/16/solid";
import logoBanner from "../assets/logo-banner.jpg"
import Image from "next/image";
import BotStatus from "@/app/components/BotStatus";


const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
        icon: <WifiIcon/>
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon/>,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon/>,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon/>,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon/>,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon/>,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon/>,
    },
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
                    customHeader: (
                        <div className="header-extra">
                            <h1 className="text-xl font-bold">Welcome to the Dashboard!</h1>
                        </div>
                    ),
                }}
            >
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </AppProvider>
        </div>
    );
}


export default SideBar;