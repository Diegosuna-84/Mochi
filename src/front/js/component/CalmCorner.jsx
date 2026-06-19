import React, { useState, useEffect, useRef } from "react";

const MODES = [
    { label: "Bubbles", emoji: "🫧" },
    { label: "Breathe", emoji: "🌬️" },
    { label: "Colors", emoji: "🎨" },
];

const COLORS = ["#a5f3fc", "#bbf7d0", "#fde68a", "#fecaca", "#ddd6fe", "#fed7aa"];

export const CalmCorner = ({ onBack }) => {
    const [mode, setMode] = useState("Bubbles");
    const [breatheIn, setBreatheIn] = useState(true);
    const [colorIndex, setColorIndex] = useState(0);
    const [bubbles, setBubbles] = useState([]);
    const audioCtx = useRef(null);

    // Breathe cycle
    useEffect(() => {
        if (mode !== "Breathe") return;
        const interval = setInterval(() => {
            setBreatheIn((prev) => !prev);
        }, 4000);
        return () => clearInterval(interval);
    }, [mode]);

    // Color cycle
    useEffect(() => {
        if (mode !== "Colors") return;
        const interval = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % COLORS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [mode]);

    // Bubbles
    useEffect(() => {
        if (mode !== "Bubbles") return;
        const interval = setInterval(() => {
            setBubbles((prev) => [
                ...prev.slice(-15),
                {
                    id: Date.now(),
                    x: Math.random() * 90,
                    size: 20 + Math.random() * 40,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    duration: 4 + Math.random() * 4,
                }
            ]);
        }, 600);
        return () => clearInterval(interval);
    }, [mode]);

    const playSound = (type) => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtx.current = ctx;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        if (type === "chime") {
            oscillator.frequency.setValueAtTime(528, ctx.currentTime);
            oscillator.type = "sine";
        } else {
            oscillator.frequency.setValueAtTime(174, ctx.currentTime);
            oscillator.type = "sine";
        }

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 3);
    };

    return (
        <div style={styles.wrapper}>
            {/* Top bar */}
            <div style={styles.topBar}>
                <button onClick={onBack} style={styles.backButton}>
                    ← Back
                </button>
                <div style={styles.soundRow}>
                    <button onClick={() => playSound("chime")} style={styles.soundButton}>
                        🔔 Chime
                    </button>
                    <button onClick={() => playSound("wave")} style={styles.soundButton}>
                        🌊 Wave
                    </button>
                </div>
            </div>

            {/* Mode selector */}
            <div style={styles.modeRow}>
                {MODES.map((m) => (
                    <button
                        key={m.label}
                        onClick={() => setMode(m.label)}
                        style={{
                            ...styles.modeButton,
                            border: mode === m.label
                                ? "3px solid #111111"
                                : "3px solid transparent",
                            backgroundColor: mode === m.label ? "#e0f2fe" : "#f9fafb"
                        }}
                    >
                        <span style={{ fontSize: "1.8rem" }}>{m.emoji}</span>
                        <span style={{ fontSize: "0.9rem", fontWeight: "700" }}>{m.label}</span>
                    </button>
                ))}
            </div>

            {/* Visual area */}
            <div style={styles.visualArea}>

                {/* Bubbles mode */}
                {mode === "Bubbles" && (
                    <div style={styles.bubblesContainer}>
                        {bubbles.map((b) => (
                            <div
                                key={b.id}
                                style={{
                                    position: "absolute",
                                    left: `${b.x}%`,
                                    bottom: "-60px",
                                    width: `${b.size}px`,
                                    height: `${b.size}px`,
                                    borderRadius: "50%",
                                    backgroundColor: b.color,
                                    opacity: 0.8,
                                    animation: `floatUp ${b.duration}s ease-in forwards`
                                }}
                            />
                        ))}
                        <style>{`
                            @keyframes floatUp {
                                0% { transform: translateY(0); opacity: 0.8; }
                                100% { transform: translateY(-110vh); opacity: 0; }
                            }
                        `}</style>
                    </div>
                )}

                {/* Breathe mode */}
                {mode === "Breathe" && (
                    <div style={styles.breatheContainer}>
                        <div style={{
                            ...styles.breatheCircle,
                            transform: breatheIn ? "scale(1.4)" : "scale(0.8)",
                            transition: "transform 4s ease-in-out",
                            backgroundColor: breatheIn ? "#a5f3fc" : "#ddd6fe"
                        }} />
                        <p style={styles.breatheText}>
                            {breatheIn ? "Breathe In 🌬️" : "Breathe Out 😮‍💨"}
                        </p>
                    </div>
                )}

                {/* Colors mode */}
                {mode === "Colors" && (
                    <div style={{
                        ...styles.colorWash,
                        backgroundColor: COLORS[colorIndex],
                        transition: "background-color 2s ease"
                    }} />
                )}

            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f9ff",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1rem",
        backgroundColor: "#f9fafb",
        borderBottom: "2px solid #e5e7eb"
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
        fontSize: "1rem"
    },
    soundRow: {
        display: "flex",
        gap: "0.5rem"
    },
    soundButton: {
        minHeight: "44px",
        padding: "0.5rem 1rem",
        border: "2px solid #059669",
        borderRadius: "8px",
        backgroundColor: "#d1fae5",
        color: "#064e3b",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "0.9rem"
    },
    modeRow: {
        display: "flex",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        backgroundColor: "#f9fafb",
        borderBottom: "2px solid #e5e7eb",
        justifyContent: "center"
    },
    modeButton: {
        minHeight: "70px",
        minWidth: "90px",
        padding: "0.5rem",
        borderRadius: "10px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.25rem"
    },
    visualArea: {
        flex: 1,
        position: "relative",
        overflow: "hidden"
    },
    bubblesContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    },
    breatheContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem"
    },
    breatheCircle: {
        width: "150px",
        height: "150px",
        borderRadius: "50%"
    },
    breatheText: {
        fontSize: "1.5rem",
        fontWeight: "700",
        color: "#111111"
    },
    colorWash: {
        position: "absolute",
        width: "100%",
        height: "100%"
    }
};