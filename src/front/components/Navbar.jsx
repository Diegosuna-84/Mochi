import { Link } from "react-router-dom";
import { useState } from "react";
import { useLongPress } from "../js/component/useLongPress";


export const Navbar = ({ onSettingsClick, onAboutClick, onLogoClick, onFeedbackClick }) => {
    const profile = JSON.parse(localStorage.getItem("mochiProfile"));
    const settings = JSON.parse(localStorage.getItem(`mochiSettings_${profile?.id}`));
    const caregiverLockEnabled = settings?.caregiverLockEnabled ?? false;
    const longPressProps = useLongPress(() => {
        onSettingsClick();
    }, 2000);
    return (
        <nav style={styles.nav}>
            <style>{`
                @media (max-width: 600px) {
                    .mochi-btn-label { display: none !important; }
                    .mochi-logo-title { display: none !important; }
                    .mochi-logo-box { padding: 0.4rem 0.75rem !important; }
                }
            `}</style>
            <div onClick={onLogoClick} style={styles.logoWrap}>
                <div style={styles.logoContainer} className="mochi-logo-box">
                    <span style={styles.logo}>🍡</span>
                    <span style={styles.titleText} className="mochi-logo-title">Mochi</span>
                </div>
            </div>
            <div style={styles.buttonGroup}>
                <button
                    {...longPressProps}
                    onClick={caregiverLockEnabled ? undefined : onFeedbackClick}
                    style={{ ...styles.navBtn }}
                    aria-label="Feedback"
                >
                    <span style={styles.btnIcon}>💬</span>
                    <span className="mochi-btn-label" style={styles.btnLabel}>Feedback</span>
                </button>
                <button
                    {...longPressProps}
                    onClick={caregiverLockEnabled ? undefined : onAboutClick}
                    style={{ ...styles.navBtn, backgroundColor: "#e0f2fe", color: "#002366" }}
                    aria-label="About Mochi"
                >
                    <span style={styles.btnIcon}>🍡</span>
                    <span className="mochi-btn-label" style={styles.btnLabel}>About Mochi</span>
                </button>
                <button
                    {...longPressProps}
                    onClick={caregiverLockEnabled ? undefined : onSettingsClick}
                    style={{ ...styles.navBtn, backgroundColor: "#ffffff", color: "#002366" }}
                    aria-label="Settings"
                >
                    <span style={styles.btnIcon}>⚙️</span>
                    <span className="mochi-btn-label" style={styles.btnLabel}>Settings</span>
                </button>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: "#002366",
        padding: "0.5rem 0.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 200,
    },
    logoWrap: {
        cursor: "pointer",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "#ffffff",
        padding: "0.4rem 1.25rem",
        borderRadius: "50px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    logo: {
        fontSize: "1.6rem",
        lineHeight: "1",
    },
    titleText: {
        fontSize: "1.4rem",
        fontWeight: "800",
        color: "#002366",
        letterSpacing: "2px",
        fontFamily: "Georgia, serif",
    },
    buttonGroup: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    },
    navBtn: {
        minHeight: "40px",
        padding: "0.4rem 0.75rem",
        backgroundColor: "#fbbf24",
        color: "#422006",
        border: "none",
        borderRadius: "50px",
        fontWeight: "700",
        fontSize: "0.85rem",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
    },
    btnIcon: {
        fontSize: "1.1rem",
        lineHeight: "1",
    },
    btnLabel: {
        fontSize: "0.85rem",
        fontWeight: "700",
    },
};