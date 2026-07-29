import React, { useState, useRef } from "react";
import { getActiveTheme } from "./theme";

const RHYMES = [
    { title: "Wheels on the Bus", emoji: "🚌", file: "/audio/wheels-on-the-bus.mp3" },
    { title: "Twinkle Twinkle", emoji: "⭐", file: "/audio/twinkle-twinkle.mp3" },
    { title: "Old MacDonald", emoji: "🐄", file: "/audio/old-macdonald.mp3" },
    { title: "If You're Happy", emoji: "😊", file: "/audio/if-youre-happy.mp3" },
    { title: "Bingo", emoji: "🐕", file: "/audio/bingo.mp3" },
    { title: "Five Little Monkeys", emoji: "🐒", file: "/audio/five-little-monkeys.mp3" },
    { title: "Alphabet Song", emoji: "🔤", file: "/audio/alphabet-song.mp3" },
    { title: "Itsy Bitsy Spider", emoji: "🕷️", file: "/audio/itsy-bitsy-spider.mp3" },
];

export const RhymesCorner = ({ onBack }) => {
    const [playing, setPlaying] = useState(null);
    const audioRef = useRef(null);
    const t = getActiveTheme();

    const handlePlay = (rhyme) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        if (playing?.title === rhyme.title) {
            setPlaying(null);
            return;
        }
        const audio = new Audio(rhyme.file);
        audio.play();
        audio.onended = () => setPlaying(null);
        audioRef.current = audio;
        setPlaying(rhyme);
    };

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setPlaying(null);
    };

    return (
        <div style={{ ...styles.fullBleed, backgroundColor: t.bg }}>
            <div style={styles.wrapper}>
                {/* Top Bar */}
                <div style={styles.topBar}>
                    <button onClick={() => { handleStop(); onBack(); }} style={styles.backButton}>
                        ← Back
                    </button>
                    <h1 style={{ ...styles.title, color: t.heading }}>🎵 Rhymes Corner</h1>
                    {playing && (
                        <button onClick={handleStop} style={styles.stopButton}>
                            ⏹ Stop
                        </button>
                    )}
                </div>

                {/* Now Playing */}
                {playing && (
                    <div style={{ ...styles.nowPlaying, backgroundColor: t.heading }}>
                        <span style={styles.nowPlayingEmoji}>{playing.emoji}</span>
                        <span style={styles.nowPlayingText}>Now Playing: {playing.title}</span>
                    </div>
                )}

                {/* Rhyme Grid */}
                <div style={styles.grid}>
                    {RHYMES.map((rhyme) => (
                        <button
                            key={rhyme.title}
                            onClick={() => handlePlay(rhyme)}
                            style={{
                                ...styles.rhymeButton,
                                backgroundColor: playing?.title === rhyme.title ? t.heading : t.card,
                                color: playing?.title === rhyme.title ? "#ffffff" : t.text,
                                border: playing?.title === rhyme.title ? `3px solid ${t.heading}` : `2px solid ${t.border}`,
                                transform: playing?.title === rhyme.title ? "scale(1.05)" : "scale(1)",
                            }}
                        >
                            <span style={styles.rhymeEmoji}>{rhyme.emoji}</span>
                            <span style={styles.rhymeTitle}>{rhyme.title}</span>
                            <span style={styles.playIcon}>
                                {playing?.title === rhyme.title ? "⏸" : "▶️"}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    fullBleed: {
        minHeight: "100vh",
        width: "100%",
    },
    wrapper: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1rem",
    },
    topBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
        flexWrap: "wrap",
        gap: "0.5rem",
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
    title: {
        fontSize: "1.5rem",
        fontWeight: "800",
        margin: 0,
    },
    stopButton: {
        minHeight: "44px",
        padding: "0.5rem 1rem",
        border: "2px solid #dc2626",
        borderRadius: "8px",
        backgroundColor: "#fee2e2",
        color: "#dc2626",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "1rem",
    },
    nowPlaying: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        color: "#ffffff",
        padding: "0.75rem 1rem",
        borderRadius: "12px",
        marginBottom: "1rem",
        fontSize: "1rem",
        fontWeight: "600",
    },
    nowPlayingEmoji: {
        fontSize: "1.8rem",
    },
    nowPlayingText: {
        flex: 1,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "1rem",
    },
    rhymeButton: {
        minHeight: "120px",
        padding: "1rem",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontWeight: "700",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
        gap: "0.5rem",
    },
    rhymeEmoji: {
        fontSize: "2.5rem",
    },
    rhymeTitle: {
        fontSize: "0.9rem",
        fontWeight: "700",
        textAlign: "center",
    },
    playIcon: {
        fontSize: "1.2rem",
    },
};