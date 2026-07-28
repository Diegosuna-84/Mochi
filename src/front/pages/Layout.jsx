import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { AboutMochi } from "../js/component/AboutMochi"
import { FeedbackPage } from "../js/component/FeedbackPage"
import { useState } from "react"

export const Layout = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleLogoClick = () => {
        setShowSettings(false);
        setShowAbout(false);
        setShowFeedback(false);
    };

    if (showAbout) {
        return (
            <>
                <Navbar
                    onSettingsClick={() => { setShowAbout(false); setShowSettings(true); }}
                    onAboutClick={() => setShowAbout(true)}
                    onLogoClick={handleLogoClick}
                    onFeedbackClick={() => { setShowAbout(false); setShowFeedback(true); }}
                />
                <AboutMochi onBack={() => setShowAbout(false)} />
            </>
        );
    }

    if (showFeedback) {
        return (
            <>
                <Navbar
                    onSettingsClick={() => { setShowFeedback(false); setShowSettings(true); }}
                    onAboutClick={() => { setShowFeedback(false); setShowAbout(true); }}
                    onLogoClick={handleLogoClick}
                    onFeedbackClick={() => setShowFeedback(true)}
                />
                <FeedbackPage onBack={() => setShowFeedback(false)} />
            </>
        );
    }

    return (
        <ScrollToTop>
            <Navbar
                onSettingsClick={() => setShowSettings(true)}
                onAboutClick={() => setShowAbout(true)}
                onLogoClick={handleLogoClick}
                onFeedbackClick={() => setShowFeedback(true)}
            />
            <Outlet context={{ showSettings, setShowSettings }} />
            <Footer />
        </ScrollToTop>
    )
}