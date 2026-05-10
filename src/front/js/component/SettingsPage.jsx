import React, { useState, useEffect } from "react";

export const SettingsPage = ({ profile, settings, onProfileChange, onSettingsChange, onBack, onSwitchProfile }) => {
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    return (
        <div style={styles.wrapper}>

            {/* Top Bar */}
            <div style={styles.topBar}>
                <button onClick={onBack} style={styles.backButton}>
                    ← Back
                </button>
                <h1 style={styles.pageTitle}>Profile & Settings</h1>
                <button onClick={onSwitchProfile} style={styles.switchButton}>
                    Switch Profile
                </button>
            </div>

            {/* Section 1 — Profile */}
            <section style={styles.section}>
                <h2 style={styles.sectionHeading}>👤 Profile</h2>

                <div style={styles.field}>
                    <label style={styles.label}>Name</label>
                    <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => onProfileChange({ ...profile, name: e.target.value })}
                        style={styles.input}
                        placeholder="Enter name"
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Preferred Voice</label>
                    <select
                        value={profile.voicePreference}
                        onChange={(e) => onProfileChange({ ...profile, voicePreference: e.target.value })}
                        style={styles.input}
                    >
                        <option value="">Default voice</option>
                        {voices.map((voice) => (
                            <option key={voice.name} value={voice.name}>
                                {voice.name} ({voice.lang})
                            </option>
                        ))}
                    </select>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Age Group</label>
                    <select
                        value={profile.ageGroup}
                        onChange={(e) => onProfileChange({ ...profile, ageGroup: e.target.value })}
                        style={styles.input}
                    >
                        <option value="">Select age group</option>
                        <option value="child">Child</option>
                        <option value="teen">Teen</option>
                        <option value="adult">Adult</option>
                    </select>
                </div>
            </section>

            {/* Section 2 — Board Settings */}
            <section style={styles.section}>
                <h2 style={styles.sectionHeading}>🎛️ Board Settings</h2>

                <div style={styles.toggleRow}>
                    <span style={styles.toggleLabel}>Show Quick Tappit</span>
                    <button
                        onClick={() => onSettingsChange({ ...settings, showQuickTappit: !settings.showQuickTappit })}
                        style={{
                            ...styles.toggle,
                            backgroundColor: settings.showQuickTappit ? "#002366" : "#e5e7eb",
                            color: settings.showQuickTappit ? "#ffffff" : "#111111",
                        }}
                    >
                        {settings.showQuickTappit ? "On" : "Off"}
                    </button>
                </div>

                <div style={styles.toggleRow}>
                    <span style={styles.toggleLabel}>Show Draw Button</span>
                    <button
                        onClick={() => onSettingsChange({ ...settings, showDraw: !settings.showDraw })}
                        style={{
                            ...styles.toggle,
                            backgroundColor: settings.showDraw ? "#002366" : "#e5e7eb",
                            color: settings.showDraw ? "#ffffff" : "#111111",
                        }}
                    >
                        {settings.showDraw ? "On" : "Off"}
                    </button>
                </div>

                <div style={styles.toggleRow}>
                    <span style={styles.toggleLabel}>Show Calm Corner</span>
                    <button
                        onClick={() => onSettingsChange({ ...settings, showCalmCorner: !settings.showCalmCorner })}
                        style={{
                            ...styles.toggle,
                            backgroundColor: settings.showCalmCorner ? "#002366" : "#e5e7eb",
                            color: settings.showCalmCorner ? "#ffffff" : "#111111",
                        }}
                    >
                        {settings.showCalmCorner ? "On" : "Off"}
                    </button>
                </div>

                <div style={styles.toggleRow}>
                    <span style={styles.toggleLabel}>Simplified Mode</span>
                    <button
                        onClick={() => onSettingsChange({ ...settings, simplifiedMode: !settings.simplifiedMode })}
                        style={{
                            ...styles.toggle,
                            backgroundColor: settings.simplifiedMode ? "#002366" : "#e5e7eb",
                            color: settings.simplifiedMode ? "#ffffff" : "#111111",
                        }}
                    >
                        {settings.simplifiedMode ? "On" : "Off"}
                    </button>
                </div>
                <div style={styles.toggleRow}>
                    <span style={styles.toggleLabel}>Learning Mode</span>
                    <button
                        onClick={() => onSettingsChange({ ...settings, learningMode: !settings.learningMode })}
                        style={{
                            ...styles.toggle,
                            backgroundColor: settings.learningMode ? "#002366" : "#e5e7eb",
                            color: settings.learningMode ? "#ffffff" : "#111111",
                        }}
                    >
                        {settings.learningMode ? "On" : "Off"}
                    </button>
                </div>
                <div style={styles.toggleRow}>
                    <span style={styles.toggleLabel}>Tap Sounds</span>
                    <button
                        onClick={() => onSettingsChange({ ...settings, tapSounds: !settings.tapSounds })}
                        style={{
                            ...styles.toggle,
                            backgroundColor: settings.tapSounds ? "#002366" : "#e5e7eb",
                            color: settings.tapSounds ? "#ffffff" : "#111111",
                        }}
                    >
                        {settings.tapSounds ? "On" : "Off"}
                    </button>
                </div>
            </section>

            {/* Section 3 — Appearance */}
            <section style={styles.section}>
                <h2 style={styles.sectionHeading}>🎨 Appearance</h2>

                <div style={styles.field}>
                    <label style={styles.label}>Theme</label>
                    <div style={styles.themeRow}>
                        {["blue", "pink", "white", "dark", "energy"].map((t) => (
                            <button
                                key={t}
                                onClick={() => onSettingsChange({ ...settings, theme: t })}
                                style={{
                                    ...styles.themeButton,
                                    border: settings.theme === t ? "3px solid #002366" : "3px solid #e5e7eb",
                                }}
                            >
                                {t === "blue" ? "☀️" : t === "pink" ? "🌸" : t === "white" ? "⬜" : t === "dark" ? "🌙" : "⚡"}
                                <span style={styles.themeLabel}>{t}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

const styles = {
    wrapper: {
        maxWidth: "680px",
        margin: "0 auto",
        padding: "1rem",
        minHeight: "100vh",
        backgroundColor: "#f0f9ff",
    },
    topBar: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1.5rem",
    },
    backButton: {
        minHeight: "44px",
        minWidth: "80px",
        padding: "0.5rem 1rem",
        border: "2px solid #1f2937",
        borderRadius: "8px",
        backgroundColor: "#e5e7eb",
        color: "#111111",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "1rem",
    },
    pageTitle: {
        fontSize: "1.4rem",
        fontWeight: "800",
        color: "#002366",
        margin: 0,
    },
    section: {
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "1.25rem",
        marginBottom: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
    sectionHeading: {
        fontSize: "1.1rem",
        fontWeight: "700",
        color: "#002366",
        margin: "0 0 1rem 0",
    },
    field: {
        marginBottom: "1rem",
    },
    label: {
        display: "block",
        fontWeight: "600",
        marginBottom: "0.4rem",
        color: "#374151",
        fontSize: "0.95rem",
    },
    input: {
        width: "100%",
        padding: "0.6rem 0.75rem",
        borderRadius: "8px",
        border: "2px solid #d1d5db",
        fontSize: "1rem",
        color: "#111111",
        backgroundColor: "#f9fafb",
        boxSizing: "border-box",
    },
    toggleRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.6rem 0",
        borderBottom: "1px solid #f3f4f6",
    },
    toggleLabel: {
        fontSize: "1rem",
        color: "#374151",
        fontWeight: "500",
    },
    toggle: {
        minWidth: "60px",
        minHeight: "36px",
        borderRadius: "50px",
        border: "none",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "0.9rem",
    },
    themeRow: {
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
    },
    themeButton: {
        minWidth: "60px",
        minHeight: "60px",
        borderRadius: "12px",
        backgroundColor: "#f9fafb",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.25rem",
        fontSize: "1.4rem",
    },
    themeLabel: {
        fontSize: "0.7rem",
        fontWeight: "600",
        color: "#374151",
        textTransform: "capitalize",
    },
    switchButton: {
        minHeight: "44px",
        padding: "0.5rem 1rem",
        border: "2px solid #002366",
        borderRadius: "8px",
        backgroundColor: "#f0f9ff",
        color: "#002366",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "0.9rem",
    },
};
