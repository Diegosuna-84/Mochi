import React, { useState } from "react";

export const WelcomeBanner = ({ onDismiss }) => {
    const [visible, setVisible] = useState(true);

    const handleDismiss = () => {
        setVisible(false);
        localStorage.setItem("mochiWelcomeSeen", "true");
        onDismiss();
    };

    if (!visible) return null;

    return (
        <div style={styles.banner}>
            <div style={styles.content}>
                <p style={styles.heading}>👋 Welcome to Mochi</p>
                <div style={styles.tips}>
                    <span style={styles.tip}>👆 Tap a symbol to start talking</span>
                    <span style={styles.tip}>⚙️ Use Settings to personalize Mochi</span>
                    <span style={styles.tip}>👤 Add profiles for each user</span>
                </div>
            </div>
            <button onClick={handleDismiss} style={styles.dismissButton}>
                Got it ✓
            </button>
        </div>
    );
};

const styles = {
    banner: {
        backgroundColor: "#fffbeb",
        border: "2px solid #fcd34d",
        borderRadius: "16px",
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
        animation: "fadeIn 0.4s ease forwards",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        flex: 1,
    },
    heading: {
        fontSize: "1rem",
        fontWeight: "700",
        color: "#92400e",
        margin: 0,
    },
    tips: {
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
    },
    tip: {
        fontSize: "0.85rem",
        color: "#78350f",
    },
    dismissButton: {
        minHeight: "44px",
        padding: "0.5rem 1.25rem",
        borderRadius: "12px",
        border: "none",
        backgroundColor: "#002366",
        color: "#ffffff",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "0.9rem",
        flexShrink: 0,
    },
};