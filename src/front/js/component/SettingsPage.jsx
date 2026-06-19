import React, { useState, useEffect } from "react";
import { SectionShell } from "./SectionShell";

export const SettingsPage = ({ profile, settings, onProfileChange, onSettingsChange, onBack, onSwitchProfile }) => {
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const lang = profile.language || "en";
    const filteredVoices = voices.filter(v => v.lang.startsWith(lang));

    return (
        <SectionShell
            title="Profile & Settings"
            onBack={onBack}
            lang={lang}
            headerActions={
                <button onClick={onSwitchProfile} style={styles.switchButton}>Switch Profile</button>
            }
        >
            <section style={styles.section}>
                <h2 style={styles.sectionHeading}>👤 Profile</h2>
                <div style={styles.field}>
                    <label style={styles.label}>Name</label>
                    <input type="text" value={profile.name} onChange={(e) => onProfileChange({ ...profile, name: e.target.value })} style={styles.input} placeholder="Enter name" />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Age Group</label>
                    <select value={profile.ageGroup} onChange={(e) => onProfileChange({ ...profile, ageGroup: e.target.value })} style={styles.input}>
                        <option value="">Select age group</option>
                        <option value="child">Child</option>
                        <option value="teen">Teen</option>
                        <option value="adult">Adult</option>
                    </select>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Language</label>
                    <select value={lang} onChange={(e) => onProfileChange({ ...profile, language: e.target.value, voicePreference: "" })} style={styles.input}>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Preferred Voice</label>
                    <select value={profile.voicePreference} onChange={(e) => onProfileChange({ ...profile, voicePreference: e.target.value })} style={styles.input}>
                        <option value="">Default voice</option>
                        {filteredVoices.map((voice) => (
                            <option key={voice.name} value={voice.name}>{voice.name} ({voice.lang})</option>
                        ))}
                    </select>
                </div>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionHeading}>🎛️ Board Settings</h2>
                {[
                    { label: "Show Quick Tappit", key: "showQuickTappit" },
                    { label: "Show Draw Button", key: "showDraw" },
                    { label: "Show Calm Corner", key: "showCalmCorner" },
                    { label: "Show Rhymes Corner", key: "showRhymes" },
                    { label: "Simplified Mode", key: "simplifiedMode" },
                    { label: "Learning Mode", key: "learningMode" },
                    { label: "Tap Sounds", key: "tapSounds" },
                    { label: "🔤 Show Alphabet", key: "showAlphabet" },
                    { label: "🔒 Caregiver Lock", key: "caregiverLockEnabled" },
                ].map(({ label, key }) => (
                    <div key={key} style={styles.toggleRow}>
                        <span style={styles.toggleLabel}>{label}</span>
                        <button onClick={() => onSettingsChange({ ...settings, [key]: !settings[key] })} style={{ ...styles.toggle, backgroundColor: settings[key] ? "#002366" : "#e5e7eb", color: settings[key] ? "#ffffff" : "#111111" }}>
                            {settings[key] ? "On" : "Off"}
                        </button>
                    </div>
                ))}
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionHeading}>🎨 Appearance</h2>
                <div style={styles.field}>
                    <label style={styles.label}>Theme</label>
                    <div style={styles.themeRow}>
                        {[
                            { key: "blue", emoji: "☀️" },
                            { key: "pink", emoji: "🌸" },
                            { key: "white", emoji: "⬜" },
                            { key: "dark", emoji: "🌙" },
                            { key: "energy", emoji: "⚡" },
                        ].map(({ key, emoji }) => (
                            <button key={key} onClick={() => onSettingsChange({ ...settings, theme: key })} style={{ ...styles.themeButton, border: settings.theme === key ? "3px solid #002366" : "3px solid #e5e7eb" }}>
                                <span style={{ fontSize: "1.4rem" }}>{emoji}</span>
                                <span style={styles.themeLabel}>{key}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </SectionShell>
    );
};

const styles = {
    section: { backgroundColor: "#ffffff", borderRadius: "16px", padding: "1.25rem", marginBottom: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
    sectionHeading: { fontSize: "1.1rem", fontWeight: "700", color: "#002366", margin: "0 0 1rem 0" },
    field: { marginBottom: "1rem" },
    label: { display: "block", fontWeight: "600", marginBottom: "0.4rem", color: "#374151", fontSize: "0.95rem" },
    input: { width: "100%", padding: "0.6rem 0.75rem", borderRadius: "8px", border: "2px solid #d1d5db", fontSize: "1rem", color: "#111111", backgroundColor: "#f9fafb", boxSizing: "border-box" },
    toggleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: "1px solid #f3f4f6" },
    toggleLabel: { fontSize: "1rem", color: "#374151", fontWeight: "500" },
    toggle: { minWidth: "60px", minHeight: "36px", borderRadius: "50px", border: "none", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem", fontFamily: "inherit" },
    themeRow: { display: "flex", gap: "0.75rem", flexWrap: "wrap" },
    themeButton: { minWidth: "60px", minHeight: "60px", borderRadius: "12px", backgroundColor: "#f9fafb", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.25rem", fontFamily: "inherit" },
    themeLabel: { fontSize: "0.7rem", fontWeight: "600", color: "#374151", textTransform: "capitalize", fontFamily: "inherit" },
    switchButton: { minHeight: "44px", padding: "0.5rem 1rem", border: "2px solid #002366", borderRadius: "8px", backgroundColor: "#f0f9ff", color: "#002366", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem" },
};