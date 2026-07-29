import React, { useState } from "react";
import { getActiveTheme } from "./theme";

const TIPS = [
    { emoji: "👆", title: "Tap to Talk", body: "Tap any symbol to add it to your phrase." },
    { emoji: "⚙️", title: "Customize", body: "Use Settings to change theme, voice, and what appears on the board." },
    { emoji: "👤", title: "Add Profiles", body: "Create a profile for each user with their own settings." },
];

export const WelcomeBanner = ({ onDismiss }) => {
    const [visible, setVisible] = useState(true);
    const t = getActiveTheme();

    const handleDismiss = () => {
        setVisible(false);
        localStorage.setItem("mochiWelcomeSeen", "true");
        onDismiss();
    };

    if (!visible) return null;

    return (
        <div style={styles.overlay}>
            <div style={{ ...styles.banner, backgroundColor: t.card, borderColor: t.border }}>
                <p style={{ ...styles.title, color: t.heading }}>👋 Welcome to Mochi!</p>
                <p style={{ ...styles.subtitle, color: t.text }}>Here are a few tips to get started:</p>

                {TIPS.map((tip) => (
                    <div key={tip.title} style={styles.tip}>
                        <span style={styles.tipEmoji}>{tip.emoji}</span>
                        <div style={styles.tipContent}>
                            <p style={{ ...styles.tipTitle, color: t.heading }}>{tip.title}</p>
                            <p style={{ ...styles.tipBody, color: t.text }}>{tip.body}</p>
                        </div>
                    </div>
                ))}

                <button onClick={handleDismiss} style={{ ...styles.dismissButton, backgroundColor: t.heading }}>
                    Got it ✓
                </button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 300,
        padding: "1.5rem",
    },
    banner: {
        borderRadius: "24px",
        padding: "1.5rem",
        width: "100%",
        maxWidth: "420px",
        border: "2px solid",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        animation: "fadeIn 0.3s ease forwards",
    },
    title: {
        fontSize: "1.4rem",
        fontWeight: "800",
        margin: "0 0 0.25rem 0",
        textAlign: "center",
    },
    subtitle: {
        fontSize: "0.9rem",
        textAlign: "center",
        margin: "0 0 1.25rem 0",
    },
    tip: {
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        marginBottom: "1rem",
    },
    tipEmoji: {
        fontSize: "1.5rem",
    },
    tipContent: {
        flex: 1,
    },
    tipTitle: {
        fontSize: "0.95rem",
        fontWeight: "700",
        margin: "0 0 0.1rem 0",
    },
    tipBody: {
        fontSize: "0.85rem",
        lineHeight: "1.4",
        margin: 0,
    },
    dismissButton: {
        width: "100%",
        marginTop: "0.5rem",
        padding: "0.9rem",
        borderRadius: "50px",
        border: "none",
        color: "#ffffff",
        fontWeight: "800",
        fontSize: "1rem",
        cursor: "pointer",
    },
};