import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { TappitBoard } from "../js/component/TappitBoard.jsx";
import { ProfilePicker } from "../js/component/ProfilePicker.jsx";

const GUEST_PROFILE = { id: "guest", name: "Guest", ageGroup: "", voicePreference: "" };

export const Home = () => {
    const { showSettings, setShowSettings } = useOutletContext();

    const [activeProfile, setActiveProfile] = useState(() => {
        const activeId = localStorage.getItem("mochiActiveProfile");
        if (!activeId) return null;
        const profiles = JSON.parse(localStorage.getItem("mochiProfiles") || "[]");
        return profiles.find((p) => p.id === activeId) || GUEST_PROFILE;
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
                onSkip={() => {
                    setActiveProfile(GUEST_PROFILE);
                    setShowPicker(false);
                }}
            />
        );
    }

    return (
        <div>
            <TappitBoard
                key={activeProfile?.id || "guest"}
                showSettings={showSettings}
                setShowSettings={setShowSettings}
                activeProfile={activeProfile || GUEST_PROFILE}
            />
        </div>
    );
};