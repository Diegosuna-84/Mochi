import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { TappitBoard } from "../js/component/TappitBoard.jsx";
import { ProfilePicker } from "../js/component/ProfilePicker.jsx";

export const Home = () => {
    const { showSettings, setShowSettings } = useOutletContext();
    const [activeProfile, setActiveProfile] = useState(() => {
        const activeId = localStorage.getItem("mochiActiveProfile");
        if (!activeId) return null;
        const profiles = JSON.parse(localStorage.getItem("mochiProfiles") || "[]");
        return profiles.find((p) => p.id === activeId) || null;
    });
    const [showPicker, setShowPicker] = useState(() => {
        const activeId = localStorage.getItem("mochiActiveProfile");
        return !activeId;
    });

    if (showPicker) {
        return (
            <ProfilePicker
                onSelectProfile={(profile) => {
                    setActiveProfile(profile);
                    setShowPicker(false);
                }}
                onSkip={() => setShowPicker(false)}
            />
        );
    }

    return (
        <div>
            <TappitBoard
                showSettings={showSettings}
                setShowSettings={setShowSettings}
                activeProfile={activeProfile}
            />
        </div>
    );
};