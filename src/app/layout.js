import localFont from "next/font/local";
import "./globals.css";
import SideBar from "@/app/components/SideBar";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import theme from "@/app/theme";

export default function RootLayout({children}) {
    return (
        <html lang="en" data-toolpad-color-scheme="dark">
        <body>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <SideBar>
                {children}
            </SideBar>
        </ThemeProvider>
        </body>
        </html>
    );
}
