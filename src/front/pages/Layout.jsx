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

    const handleFeedbackClick = () => {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSdjJCN0q_dzvchhAsbbNdBQ2kSGEsc_VxtPn2tDbfYHDahx_Q/viewform", "_blank", "noopener,noreferrer");
    };

    if (showAbout) {
        return (
            <>
                <Navbar
                    onSettingsClick={() => { setShowAbout(false); setShowSettings(true); }}
                    onAboutClick={() => setShowAbout(true)}
                    onLogoClick={handleLogoClick}
                    onFeedbackClick={handleFeedbackClick}
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
                onFeedbackClick={handleFeedbackClick}
            />
            <Outlet context={{ showSettings, setShowSettings }} />
            <Footer />
        </ScrollToTop>
    )
}