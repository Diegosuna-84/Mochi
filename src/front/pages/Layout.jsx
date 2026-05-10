import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useState } from "react"

export const Layout = () => {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <ScrollToTop>
            <Navbar onSettingsClick={() => setShowSettings(true)} />
            <Outlet context={{ showSettings, setShowSettings }} />
            <Footer />
        </ScrollToTop>
    )
}