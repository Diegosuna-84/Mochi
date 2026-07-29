import React, { useState } from "react";
import { getActiveTheme } from "./theme";

export const AlphabetBoard = ({ onBack, activeProfile }) => {
    const [word, setWord] = useState("");
    const [isUppercase, setIsUppercase] = useState(true);
    const t = getActiveTheme();
    const lang = activeProfile?.language || "en";

    const speak = (text) => {
        if (!text) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === "es" ? "es-ES" : "en-US";
        if (activeProfile?.voicePreference) {
            const voices = window.speechSynthesis.getVoices();
            const preferred = voices.find(v => v.name === activeProfile.voicePreference);
            if (preferred) utterance.voice = preferred;
        }
        window.speechSynthesis.speak(utterance);
    };

    const handleLetterPress = (letter) => {
        const actualLetter = isUppercase ? letter : letter.toLowerCase();
        setWord((prev) => prev + actualLetter);
        speak(actualLetter);
    };

    return (
        <div style={{ ...styles.fullBleed, backgroundColor: t.bg }}>
            <div style={styles.wrapper}>
                <div style={styles.topBar}>
                    <button onClick={onBack} style={styles.backButton}>← Back</button>
                    <h1 style={{ ...styles.title, color: t.heading }}>🔤 Alphabet</h1>
                </div>
                <div style={{ ...styles.wordDisplay, backgroundColor: t.card }}>
                    <span style={{ ...styles.wordText, color: t.heading }}>{word || "..."}</span>
                </div>
                <div style={styles.controls}>
                    <button onClick={() => setWord("")} style={styles.controlButton}>🗑️ Clear</button>
                    <button onClick={() => setWord(word.slice(0, -1))} style={styles.controlButton}>⌫ Backspace</button>
                    <button onClick={() => speak(word)} disabled={word.length === 0} style={{ ...styles.controlButton, ...styles.speakButton, ...(word.length === 0 ? styles.disabled : {}) }}>🔊 Speak</button>
                    <button onClick={() => setIsUppercase((prev) => !prev)} style={{ ...styles.controlButton, backgroundColor: t.card, borderColor: t.border, color: t.text }}>
                        {isUppercase ? "Aa" : "AA"}
                    </button>
                </div>
                <div style={styles.grid}>
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                        <button key={letter} onClick={() => handleLetterPress(letter)} style={{ ...styles.letterButton, backgroundColor: t.card, borderColor: t.border, color: t.heading }}>
                            {isUppercase ? letter : letter.toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    fullBleed: { minHeight: "100vh", width: "100%" },
    wrapper: { maxWidth: "680px", margin: "0 auto", padding: "1rem" },
    topBar: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" },
    backButton: { minHeight: "44px", minWidth: "80px", padding: "0.5rem 1rem", border: "2px solid #1f2937", borderRadius: "8px", backgroundColor: "#e5e7eb", color: "#111111", fontWeight: "700", cursor: "pointer", fontSize: "1rem" },
    title: { fontSize: "1.4rem", fontWeight: "800", margin: 0 },
    wordDisplay: { borderRadius: "16px", padding: "1.25rem", marginBottom: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", minHeight: "64px", display: "flex", alignItems: "center" },
    wordText: { fontSize: "2rem", fontWeight: "800", letterSpacing: "0.15em" },
    controls: { display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" },
    controlButton: { minHeight: "44px", padding: "0.5rem 1rem", borderRadius: "50px", border: "2px solid #6b7280", backgroundColor: "#e5e7eb", color: "#111111", fontWeight: "700", cursor: "pointer", fontSize: "0.95rem" },
    speakButton: { backgroundColor: "#fbbf24", border: "2px solid #d97706", color: "#422006" },
    disabled: { opacity: 0.5, cursor: "not-allowed" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: "0.75rem" },
    letterButton: { minHeight: "70px", minWidth: "70px", borderRadius: "16px", border: "2px solid", fontSize: "1.8rem", fontWeight: "800", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" },
};