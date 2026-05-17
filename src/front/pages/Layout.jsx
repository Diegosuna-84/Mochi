import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { AboutMochi } from "../js/component/AboutMochi"
import { useState } from "react"

export const Layout = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const handleLogoClick = () => {
        setShowSettings(false);
        setShowAbout(false);
    };

    if (showAbout) {
        return (
            <>
                <Navbar
                    onSettingsClick={() => { setShowAbout(false); setShowSettings(true); }}
                    onAboutClick={() => setShowAbout(true)}
                    onLogoClick={handleLogoClick}
                />
                <AboutMochi onBack={() => setShowAbout(false)} />
            </>
        );
    }

    return (
        <ScrollToTop>
            <Navbar
                onSettingsClick={() => setShowSettings(true)}
                onAboutClick={() => setShowAbout(true)}
                onLogoClick={handleLogoClick}
            />
            <Outlet context={{ showSettings, setShowSettings }} />
            <Footer />
        </ScrollToTop>
    )
}