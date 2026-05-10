import React from "react";
import { useOutletContext } from "react-router-dom";
import { TappitBoard } from "../js/component/TappitBoard.jsx";

export const Home = () => {
    const { showSettings, setShowSettings } = useOutletContext();

    return (
        <div>
            <TappitBoard
                showSettings={showSettings}
                setShowSettings={setShowSettings}
            />
        </div>
    );
};