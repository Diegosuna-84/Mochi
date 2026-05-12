import React, { useState, useEffect } from "react";
import { DrawingArea } from "./DrawingArea";
import { CalmCorner } from "./CalmCorner";
import { SettingsPage } from "./SettingsPage";
import { WelcomeBanner } from "./WelcomeBanner";
import { RhymesCorner } from "./RhymesCorner";

const THEMES = {
    blue: { bg: "#e0f2fe", card: "#ffffff", text: "#111111", border: "#7dd3fc", heading: "#0369a1" },
    pink: { bg: "#fce7f3", card: "#ffffff", text: "#111111", border: "#f9a8d4", heading: "#9d174d" },
    white: { bg: "#ffffff", card: "#f9fafb", text: "#111111", border: "#d1d5db", heading: "#111111" },
    dark: { bg: "#1e1e2e", card: "#2e2e3e", text: "#ffffff", border: "#4b5563", heading: "#93c5fd" },
    energy: { bg: "#fff7ed", card: "#ffffff", text: "#111111", border: "#fb923c", heading: "#ea580c" },
};

const CATEGORIES = [
    {
        label: "🗣️ Core Words",
        symbols: [
            { word: "I", emoji: "👁️" },
            { word: "Want", emoji: "🙋" },
            { word: "More", emoji: "🔁" },
            { word: "Give", emoji: "🤲" },
            { word: "Me", emoji: "👤" },
            { word: "Please", emoji: "🙏" },
            { word: "Yes", emoji: "✅" },
            { word: "No", emoji: "❌" },
            { word: "Stop", emoji: "✋" },
            { word: "Done", emoji: "🏁" },
            { word: "Help", emoji: "🆘" },
            { word: "Hot", emoji: "🔥" },
            { word: "Cold", emoji: "🧊" },
        ],
    },
    {
        label: "🍎 Food & Drink",
        symbols: [
            { word: "Apple", emoji: "🍎" },
            { word: "Banana", emoji: "🍌" },
            { word: "Pizza", emoji: "🍕" },
            { word: "Chicken", emoji: "🍗" },
            { word: "Sandwich", emoji: "🥪" },
            { word: "Bread", emoji: "🍞" },
            { word: "Ice Cream", emoji: "🍦" },
            { word: "Drink", emoji: "🥤" },
            { word: "Milk", emoji: "🥛" },
            { word: "Food", emoji: "🍽️" },
        ],
    },
    {
        label: "😊 Feelings",
        symbols: [
            { word: "Happy", emoji: "😊" },
            { word: "Sad", emoji: "😢" },
            { word: "Tired", emoji: "😴" },
            { word: "Hurt", emoji: "🤕" },
            { word: "Angry", emoji: "😠" },
            { word: "Scared", emoji: "😨" },
            { word: "Excited", emoji: "🤩" },
            { word: "Calm", emoji: "😌" },
        ],
    },
    {
        label: "🏠 Places & Things",
        symbols: [
            { word: "Home", emoji: "🏠" },
            { word: "School", emoji: "🏫" },
            { word: "Park", emoji: "🌳" },
            { word: "Bathroom", emoji: "🚽" },
            { word: "Outside", emoji: "🌤️" },
            { word: "Inside", emoji: "🏡" },
            { word: "Break", emoji: "☕" },
            { word: "Car", emoji: "🚗" },
            { word: "Store", emoji: "🏪" },
            { word: "Hospital", emoji: "🏥" },
        ],
    },
    {
        label: "🐶 Animals",
        symbols: [
            { word: "Dog", emoji: "🐶" },
            { word: "Cat", emoji: "🐱" },
            { word: "Bird", emoji: "🐦" },
            { word: "Fish", emoji: "🐟" },
            { word: "Bear", emoji: "🐻" },
            { word: "Horse", emoji: "🐴" },
            { word: "Cow", emoji: "🐄" },
            { word: "Rabbit", emoji: "🐰" },
            { word: "Duck", emoji: "🦆" },
            { word: "Lion", emoji: "🦁" },
        ],
    },
    {
        label: "🎨 Objects",
        symbols: [
            { word: "Ball", emoji: "⚽" },
            { word: "Book", emoji: "📚" },
            { word: "Toy", emoji: "🧸" },
            { word: "Chair", emoji: "🪑" },
            { word: "Bed", emoji: "🛏️" },
            { word: "Door", emoji: "🚪" },
            { word: "Phone", emoji: "📱" },
            { word: "TV", emoji: "📺" },
            { word: "Cup", emoji: "☕" },
            { word: "Bag", emoji: "🎒" },
        ],
    },
    {
        label: "👨‍👩‍👧 People",
        symbols: [
            { word: "Mom", emoji: "👩" },
            { word: "Dad", emoji: "👨" },
            { word: "Brother", emoji: "👦" },
            { word: "Sister", emoji: "👧" },
            { word: "Grandma", emoji: "👵" },
            { word: "Grandpa", emoji: "👴" },
            { word: "Baby", emoji: "👶" },
            { word: "Friend", emoji: "🧑" },
            { word: "Teacher", emoji: "👩‍🏫" },
            { word: "Doctor", emoji: "👨‍⚕️" },
            { word: "Family", emoji: "👨‍👩‍👧" },
        ],
    },
    {
        label: "🔢 Numbers",
        symbols: [
            { word: "1", emoji: "1️⃣" },
            { word: "2", emoji: "2️⃣" },
            { word: "3", emoji: "3️⃣" },
            { word: "4", emoji: "4️⃣" },
            { word: "5", emoji: "5️⃣" },
            { word: "6", emoji: "6️⃣" },
            { word: "7", emoji: "7️⃣" },
            { word: "8", emoji: "8️⃣" },
            { word: "9", emoji: "9️⃣" },
            { word: "10", emoji: "🔟" },
        ],
    },
];

const quickTappits = [
    { word: "Help", emoji: "🆘" },
    { word: "Bathroom", emoji: "🚽" },
    { word: "Break", emoji: "☕" },
];

const getVoice = (voicePreference) => {
    if (!voicePreference) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.name === voicePreference) || null;
};

export const TappitBoard = ({ showSettings, setShowSettings, activeProfile }) => {
    const [phrase, setPhrase] = useState([]);
    const [welcomeSeen, setWelcomeSeen] = useState(
        () => !!localStorage.getItem("mochiWelcomeSeen")
    );
    const [showDrawing, setShowDrawing] = useState(false);
    const [showCalm, setShowCalm] = useState(false);
    const [showRhymes, setShowRhymes] = useState(false);

    const defaultSettings = {
        showDraw: true,
        showCalmCorner: true,
        showQuickTappit: true,
        simplifiedMode: false,
        theme: "blue",
        tapSounds: false,
        learningMode: false,
        showRhymes: true,
    };

    const settingsKey = activeProfile ? `mochiSettings_${activeProfile.id}` : "mochiSettings_guest";

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem(settingsKey);
        return saved ? JSON.parse(saved) : defaultSettings;
    });

    const [profile, setProfile] = useState(() => {
        if (activeProfile) return activeProfile;
        const saved = localStorage.getItem("mochiProfile");
        return saved ? JSON.parse(saved) : { name: "", ageGroup: "", voicePreference: "" };
    });

    const t = THEMES[settings.theme] || THEMES["blue"];

    useEffect(() => {
        localStorage.setItem("mochiProfile", JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem(settingsKey, JSON.stringify(settings));
    }, [settings]);

    const syncProfile = async (updatedProfile) => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProfile),
            });
        } catch (error) {
            console.log("Profile sync skipped. App still works offline.");
        }
    };

    const applyVoice = (utterance) => {
        const voice = getVoice(profile.voicePreference);
        if (voice) utterance.voice = voice;
        return utterance;
    };

    const playTapSound = () => {
        if (!settings.tapSounds) return;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.setValueAtTime(880, ctx.currentTime);
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
    };

    const handleSymbolClick = (word) => {
        playTapSound();
        if (settings.learningMode) {
            const utterance = applyVoice(new SpeechSynthesisUtterance(word));
            window.speechSynthesis.speak(utterance);
        }
        setPhrase((cur) => [...cur, word]);
    };

    const clearPhrase = () => setPhrase([]);

    const speakPhrase = () => {
        if (phrase.length === 0) return;
        const utterance = applyVoice(new SpeechSynthesisUtterance(phrase.join(" ")));
        window.speechSynthesis.speak(utterance);
    };

    const speakQuickWord = (word) => {
        playTapSound();
        const utterance = applyVoice(new SpeechSynthesisUtterance(word));
        window.speechSynthesis.speak(utterance);
    };

    if (showDrawing) return <DrawingArea onBack={() => setShowDrawing(false)} />;
    if (showCalm) return <CalmCorner onBack={() => setShowCalm(false)} />;
    if (showRhymes) return <RhymesCorner onBack={() => setShowRhymes(false)} />;
    if (showSettings) return (
        <SettingsPage
            profile={profile}
            settings={settings}
            onProfileChange={(updated) => {
                setProfile(updated);
                syncProfile(updated);
            }}
            onSettingsChange={(updated) => setSettings(updated)}
            onBack={() => setShowSettings(false)}
            onSwitchProfile={() => {
                localStorage.removeItem("mochiActiveProfile");
                window.location.reload();
            }}
        />
    );

    return (
        <div style={{ ...styles.wrapper, backgroundColor: t.bg }}>

            {/* Welcome Banner */}
            {!welcomeSeen && (
                <WelcomeBanner onDismiss={() => {
                    localStorage.setItem("mochiWelcomeSeen", "true");
                    setWelcomeSeen(true);
                }} />
            )}

            {/* Quick Tappit */}
            {settings.showQuickTappit && (
                <section style={styles.quickSection}>
                    <h2 style={{ ...styles.sectionHeading, color: t.heading }}>Quick Tappit</h2>
                    <div style={styles.quickRow}>
                        {quickTappits.map((item) => (
                            <button
                                key={item.word}
                                type="button"
                                onClick={() => speakQuickWord(item.word)}
                                style={{
                                    ...styles.symbolButton,
                                    backgroundColor: "#fed7aa",
                                    border: `2px solid #c2410c`,
                                    color: "#431407",
                                }}
                            >
                                <span style={styles.emoji}>{item.emoji}</span>
                                <span style={styles.word}>{item.word}</span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Categories */}
            {CATEGORIES.map((cat) => (
                <section key={cat.label} style={styles.categorySection}>
                    <h2 style={{ ...styles.sectionHeading, color: t.heading }}>{cat.label}</h2>
                    <div style={styles.grid}>
                        {cat.symbols.map((symbol) => (
                            <button
                                key={symbol.word}
                                type="button"
                                onClick={() => handleSymbolClick(symbol.word)}
                                style={{
                                    ...styles.symbolButton,
                                    backgroundColor: t.card,
                                    border: `2px solid ${t.border}`,
                                    color: t.text,
                                }}
                            >
                                <span style={styles.emoji}>{symbol.emoji}</span>
                                <span style={styles.word}>{symbol.word}</span>
                            </button>
                        ))}
                    </div>
                </section>
            ))}

            {/* Tappit Bar */}
            <div style={{
                ...styles.tappitBar,
                backgroundColor: t.card,
                border: `2px solid ${t.border}`,
                color: t.text,
            }}>
                {phrase.length > 0 ? phrase.join(" ") : "Tap a symbol to start..."}
            </div>

            {/* Sticky Bottom Action Bar */}
            <div style={{ ...styles.stickyBar, backgroundColor: t.bg, borderTop: `2px solid ${t.border}` }}>
                <button
                    type="button"
                    onClick={speakPhrase}
                    disabled={phrase.length === 0}
                    style={{
                        ...styles.actionButton,
                        backgroundColor: "#fbbf24",
                        border: "2px solid #d97706",
                        color: "#422006",
                        ...(phrase.length === 0 ? styles.disabled : {}),
                    }}
                >
                    <span style={styles.actionEmoji}>🔊</span>
                    <span style={styles.actionLabel}>Speak</span>
                </button>

                <button type="button" onClick={clearPhrase} style={{
                    ...styles.actionButton,
                    backgroundColor: "#e5e7eb",
                    border: "2px solid #6b7280",
                    color: "#111111",
                }}>
                    <span style={styles.actionEmoji}>🗑️</span>
                    <span style={styles.actionLabel}>Clear</span>
                </button>

                {settings.showDraw && (
                    <button type="button" onClick={() => setShowDrawing(true)} style={{
                        ...styles.actionButton,
                        backgroundColor: "#ede9fe",
                        border: "2px solid #7c3aed",
                        color: "#3b0764",
                    }}>
                        <span style={styles.actionEmoji}>✏️</span>
                        <span style={styles.actionLabel}>Draw</span>
                    </button>
                )}

                {settings.showCalmCorner && (
                    <button type="button" onClick={() => setShowCalm(true)} style={{
                        ...styles.actionButton,
                        backgroundColor: "#d1fae5",
                        border: "2px solid #059669",
                        color: "#064e3b",
                    }}>
                        <span style={styles.actionEmoji}>🌿</span>
                        <span style={styles.actionLabel}>Calm</span>
                    </button>
                )}

                {settings.showRhymes && (
                    <button type="button" onClick={() => setShowRhymes(true)} style={{
                        ...styles.actionButton,
                        backgroundColor: "#fce7f3",
                        border: "2px solid #db2777",
                        color: "#831843",
                    }}>
                        <span style={styles.actionEmoji}>🎵</span>
                        <span style={styles.actionLabel}>Rhymes</span>
                    </button>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        maxWidth: "100%",
        margin: "0 auto",
        padding: "1rem",
        paddingBottom: "120px",
        minHeight: "100vh",
    },
    quickSection: {
        marginBottom: "1.5rem",
    },
    categorySection: {
        marginBottom: "1.5rem",
    },
    sectionHeading: {
        margin: "0 0 0.75rem 0",
        fontSize: "1.1rem",
        fontWeight: "700",
    },
    quickRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(85px, 1fr))",
        gap: "0.75rem",
    },
    symbolButton: {
        minHeight: "85px",
        minWidth: "85px",
        padding: "0.5rem",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontWeight: "700",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    emoji: {
        fontSize: "2rem",
        lineHeight: "1.2",
    },
    word: {
        marginTop: "0.25rem",
        fontSize: "0.85rem",
        fontWeight: "700",
        textAlign: "center",
    },
    tappitBar: {
        marginTop: "1rem",
        marginBottom: "1rem",
        minHeight: "52px",
        padding: "0.75rem",
        borderRadius: "14px",
        fontSize: "1rem",
        fontWeight: "500",
    },
    stickyBar: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1rem",
        flexWrap: "wrap",
        zIndex: 100,
        boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
    },
    actionButton: {
        minWidth: "70px",
        minHeight: "70px",
        padding: "0.4rem",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontWeight: "700",
        gap: "0.2rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    actionEmoji: {
        fontSize: "1.6rem",
        lineHeight: "1",
    },
    actionLabel: {
        fontSize: "0.7rem",
        fontWeight: "700",
    },
    disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
    },
};