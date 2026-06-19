import React, { useState } from "react";
import { SectionShell } from "./SectionShell";

export const AlphabetBoard = ({ onBack, activeProfile, lang = "en" }) => {
    const [word, setWord] = useState("");

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        if (activeProfile?.voicePreference) {
            const voices = window.speechSynthesis.getVoices();
            const preferred = voices.find(v => v.name === activeProfile.voicePreference);
            if (preferred) utterance.voice = preferred;
        }
        window.speechSynthesis.speak(utterance);
    };

    return (
        <SectionShell title="🔤 Alphabet" onBack={onBack} lang={lang}>
            <div style={styles.wordDisplay}>
                <span style={styles.wordText}>{word || "..."}</span>
            </div>
            <div style={styles.controls}>
                <button onClick={() => setWord("")} style={styles.controlButton}>🗑️ Clear</button>
                <button onClick={() => setWord(word.slice(0, -1))} style={styles.controlButton}>⌫ Backspace</button>
                <button onClick={() => speak(word)} disabled={word.length === 0} style={{ ...styles.controlButton, ...styles.speakButton, ...(word.length === 0 ? styles.disabled : {}) }}>🔊 Speak</button>
            </div>
            <div style={styles.grid}>
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                    <button key={letter} onClick={() => { setWord(word + letter); speak(letter); }} style={styles.letterButton}>
                        {letter}
                    </button>
                ))}
            </div>
        </SectionShell>
    );
};

const styles = {
    wordDisplay: { backgroundColor: "#ffffff", borderRadius: "16px", padding: "1.25rem", marginBottom: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", minHeight: "64px", display: "flex", alignItems: "center" },
    wordText: { fontSize: "2rem", fontWeight: "800", color: "#002366", letterSpacing: "0.15em" },
    controls: { display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" },
    controlButton: { minHeight: "44px", padding: "0.5rem 1rem", borderRadius: "50px", border: "2px solid #6b7280", backgroundColor: "#e5e7eb", color: "#111111", fontWeight: "700", cursor: "pointer", fontSize: "0.95rem" },
    speakButton: { backgroundColor: "#fbbf24", border: "2px solid #d97706", color: "#422006" },
    disabled: { opacity: 0.5, cursor: "not-allowed" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: "0.75rem" },
    letterButton: { minHeight: "70px", minWidth: "70px", borderRadius: "16px", backgroundColor: "#ffffff", border: "2px solid #7dd3fc", color: "#002366", fontSize: "1.8rem", fontWeight: "800", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" },
};