import React, { useState, useEffect } from "react";
import { DrawingArea } from "./DrawingArea";
import { CalmCorner } from "./CalmCorner";
import { SettingsPage } from "./SettingsPage";
import { WelcomeBanner } from "./WelcomeBanner";
import { RhymesCorner } from "./RhymesCorner";

const THEMES = {
    blue:   { bg: "#e0f2fe", card: "#ffffff", text: "#111111", border: "#7dd3fc", heading: "#0369a1" },
    pink:   { bg: "#fce7f3", card: "#ffffff", text: "#111111", border: "#f9a8d4", heading: "#9d174d" },
    white:  { bg: "#ffffff", card: "#f9fafb", text: "#111111", border: "#d1d5db", heading: "#111111" },
    dark:   { bg: "#1e1e2e", card: "#2e2e3e", text: "#ffffff", border: "#4b5563", heading: "#93c5fd" },
    energy: { bg: "#fff7ed", card: "#ffffff", text: "#111111", border: "#fb923c", heading: "#ea580c" },
};

const CATEGORIES = [
    {
        label: "🗣️ Core Words",
        symbols: [
            { word: "I", es: "Yo", emoji: "👁️" },
            { word: "Want", es: "Quiero", emoji: "🙋" },
            { word: "More", es: "Más", emoji: "🔁" },
            { word: "Give", es: "Dame", emoji: "🤲" },
            { word: "Me", es: "Me", emoji: "👤" },
            { word: "Please", es: "Por favor", emoji: "🙏" },
            { word: "Yes", es: "Sí", emoji: "✅" },
            { word: "No", es: "No", emoji: "❌" },
            { word: "Stop", es: "Para", emoji: "✋" },
            { word: "Done", es: "Listo", emoji: "🏁" },
            { word: "Help", es: "Ayuda", emoji: "🆘" },
            { word: "Hot", es: "Caliente", emoji: "🔥" },
            { word: "Cold", es: "Frío", emoji: "🧊" },
        ],
    },
    {
        label: "🍎 Food & Drink",
        symbols: [
            { word: "Apple", es: "Manzana", emoji: "🍎" },
            { word: "Banana", es: "Plátano", emoji: "🍌" },
            { word: "Pizza", es: "Pizza", emoji: "🍕" },
            { word: "Chicken", es: "Pollo", emoji: "🍗" },
            { word: "Sandwich", es: "Sándwich", emoji: "🥪" },
            { word: "Bread", es: "Pan", emoji: "🍞" },
            { word: "Ice Cream", es: "Helado", emoji: "🍦" },
            { word: "Drink", es: "Bebida", emoji: "🥤" },
            { word: "Milk", es: "Leche", emoji: "🥛" },
            { word: "Food", es: "Comida", emoji: "🍽️" },
        ],
    },
    {
        label: "😊 Feelings",
        symbols: [
            { word: "Happy", es: "Feliz", emoji: "😊" },
            { word: "Sad", es: "Triste", emoji: "😢" },
            { word: "Tired", es: "Cansado", emoji: "😴" },
            { word: "Hurt", es: "Duele", emoji: "🤕" },
            { word: "Angry", es: "Enojado", emoji: "😠" },
            { word: "Scared", es: "Asustado", emoji: "😨" },
            { word: "Excited", es: "Emocionado", emoji: "🤩" },
            { word: "Calm", es: "Tranquilo", emoji: "😌" },
        ],
    },
    {
        label: "🏠 Places & Things",
        symbols: [
            { word: "Home", es: "Casa", emoji: "🏠" },
            { word: "School", es: "Escuela", emoji: "🏫" },
            { word: "Park", es: "Parque", emoji: "🌳" },
            { word: "Bathroom", es: "Baño", emoji: "🚽" },
            { word: "Outside", es: "Afuera", emoji: "🌤️" },
            { word: "Inside", es: "Adentro", emoji: "🏡" },
            { word: "Break", es: "Descanso", emoji: "☕" },
            { word: "Car", es: "Carro", emoji: "🚗" },
            { word: "Store", es: "Tienda", emoji: "🏪" },
            { word: "Hospital", es: "Hospital", emoji: "🏥" },
        ],
    },
    {
        label: "🐶 Animals",
        symbols: [
            { word: "Dog", es: "Perro", emoji: "🐶" },
            { word: "Cat", es: "Gato", emoji: "🐱" },
            { word: "Bird", es: "Pájaro", emoji: "🐦" },
            { word: "Fish", es: "Pez", emoji: "🐟" },
            { word: "Bear", es: "Oso", emoji: "🐻" },
            { word: "Horse", es: "Caballo", emoji: "🐴" },
            { word: "Cow", es: "Vaca", emoji: "🐄" },
            { word: "Rabbit", es: "Conejo", emoji: "🐰" },
            { word: "Duck", es: "Pato", emoji: "🦆" },
            { word: "Lion", es: "León", emoji: "🦁" },
        ],
    },
    {
        label: "🎨 Objects",
        symbols: [
            { word: "Ball", es: "Pelota", emoji: "⚽" },
            { word: "Book", es: "Libro", emoji: "📚" },
            { word: "Toy", es: "Juguete", emoji: "🧸" },
            { word: "Chair", es: "Silla", emoji: "🪑" },
            { word: "Bed", es: "Cama", emoji: "🛏️" },
            { word: "Door", es: "Puerta", emoji: "🚪" },
            { word: "Phone", es: "Teléfono", emoji: "📱" },
            { word: "TV", es: "Televisión", emoji: "📺" },
            { word: "Cup", es: "Taza", emoji: "☕" },
            { word: "Bag", es: "Bolsa", emoji: "🎒" },
        ],
    },
    {
        label: "👨‍👩‍👧 People",
        symbols: [
            { word: "Mom", es: "Mamá", emoji: "👩" },
            { word: "Dad", es: "Papá", emoji: "👨" },
            { word: "Brother", es: "Hermano", emoji: "👦" },
            { word: "Sister", es: "Hermana", emoji: "👧" },
            { word: "Grandma", es: "Abuela", emoji: "👵" },
            { word: "Grandpa", es: "Abuelo", emoji: "👴" },
            { word: "Baby", es: "Bebé", emoji: "👶" },
            { word: "Friend", es: "Amigo", emoji: "🧑" },
            { word: "Teacher", es: "Maestro", emoji: "👩‍🏫" },
            { word: "Doctor", es: "Doctor", emoji: "👨‍⚕️" },
            { word: "Family", es: "Familia", emoji: "👨‍👩‍👧" },
        ],
    },
    {
        label: "🏃 Actions",
        symbols: [
            { word: "Go", es: "Ir", emoji: "🚶" },
            { word: "Come", es: "Ven", emoji: "👋" },
            { word: "Eat", es: "Comer", emoji: "🍴" },
            { word: "Drink", es: "Tomar", emoji: "🥤" },
            { word: "Sleep", es: "Dormir", emoji: "😴" },
            { word: "Play", es: "Jugar", emoji: "🎮" },
            { word: "Read", es: "Leer", emoji: "📖" },
            { word: "Watch", es: "Ver", emoji: "👀" },
            { word: "Run", es: "Correr", emoji: "🏃" },
            { word: "Walk", es: "Caminar", emoji: "🚶" },
            { word: "Sit", es: "Sentarse", emoji: "🪑" },
            { word: "Open", es: "Abrir", emoji: "🔓" },
            { word: "Close", es: "Cerrar", emoji: "🔒" },
        ],
    },
    {
        label: "🎨 Colors",
        symbols: [
            { word: "Red", es: "Rojo", emoji: "🔴" },
            { word: "Blue", es: "Azul", emoji: "🔵" },
            { word: "Green", es: "Verde", emoji: "🟢" },
            { word: "Yellow", es: "Amarillo", emoji: "🟡" },
            { word: "Orange", es: "Naranja", emoji: "🟠" },
            { word: "Purple", es: "Morado", emoji: "🟣" },
            { word: "Pink", es: "Rosa", emoji: "🩷" },
            { word: "White", es: "Blanco", emoji: "⬜" },
            { word: "Black", es: "Negro", emoji: "⬛" },
            { word: "Brown", es: "Café", emoji: "🟤" },
        ],
    },
    {
        label: "🫀 Body",
        symbols: [
            { word: "Head", es: "Cabeza", emoji: "🗣️" },
            { word: "Hand", es: "Mano", emoji: "✋" },
            { word: "Foot", es: "Pie", emoji: "🦶" },
            { word: "Eye", es: "Ojo", emoji: "👁️" },
            { word: "Ear", es: "Oreja", emoji: "👂" },
            { word: "Mouth", es: "Boca", emoji: "👄" },
            { word: "Nose", es: "Nariz", emoji: "👃" },
            { word: "Belly", es: "Barriga", emoji: "🫃" },
            { word: "Back", es: "Espalda", emoji: "🔙" },
            { word: "Arm", es: "Brazo", emoji: "💪" },
        ],
    },
    {
        label: "🔢 Numbers",
        symbols: [
            { word: "1", es: "1", emoji: "1️⃣" },
            { word: "2", es: "2", emoji: "2️⃣" },
            { word: "3", es: "3", emoji: "3️⃣" },
            { word: "4", es: "4", emoji: "4️⃣" },
            { word: "5", es: "5", emoji: "5️⃣" },
            { word: "6", es: "6", emoji: "6️⃣" },
            { word: "7", es: "7", emoji: "7️⃣" },
            { word: "8", es: "8", emoji: "8️⃣" },
            { word: "9", es: "9", emoji: "9️⃣" },
            { word: "10", es: "10", emoji: "🔟" },
        ],
    },
    {
        label: "⭐ Vowels",
        symbols: [
            { word: "Ay", es: "A", emoji: "A" },
            { word: "Ee", es: "E", emoji: "E" },
            { word: "Eye", es: "I", emoji: "I" },
            { word: "Oh", es: "O", emoji: "O" },
            { word: "You", es: "U", emoji: "U" },
        ]
    }
];

const quickTappits = [
    { word: "Help", es: "Ayuda", emoji: "🆘" },
    { word: "Bathroom", es: "Baño", emoji: "🚽" },
    { word: "Break", es: "Descanso", emoji: "☕" },
];

export const TappitBoard = ({ showSettings, setShowSettings, activeProfile }) => {
    const [phrase, setPhrase] = useState([]);
    const [welcomeSeen, setWelcomeSeen] = useState(() => !!localStorage.getItem("mochiWelcomeSeen"));
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
        return saved ? JSON.parse(saved) : { name: "", ageGroup: "", voicePreference: "", language: "en" };
    });

    const t = THEMES[settings.theme] || THEMES["blue"];
    const lang = profile.language || "en";
    const getWord = (symbol) => lang === "es" ? (symbol.es || symbol.word) : symbol.word;

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
        const voices = window.speechSynthesis.getVoices();
        if (profile.voicePreference) {
            const selected = voices.find(v => v.name === profile.voicePreference);
            if (selected) {
                utterance.voice = selected;
                return utterance;
            }
        }
        const langPrefix = lang === "es" ? "es" : "en";
        const autoVoice = voices.find(v => v.lang.startsWith(langPrefix));
        if (autoVoice) utterance.voice = autoVoice;
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
            onProfileChange={(updated) => { setProfile(updated); syncProfile(updated); }}
            onSettingsChange={(updated) => setSettings(updated)}
            onBack={() => setShowSettings(false)}
            onSwitchProfile={() => { localStorage.removeItem("mochiActiveProfile"); window.location.reload(); }}
        />
    );

    return (
        <div style={{ ...styles.wrapper, backgroundColor: t.bg }}>
            {!welcomeSeen && (
                <WelcomeBanner onDismiss={() => { localStorage.setItem("mochiWelcomeSeen", "true"); setWelcomeSeen(true); }} />
            )}

            {settings.showQuickTappit && (
                <section style={styles.quickSection}>
                    <h2 style={{ ...styles.sectionHeading, color: t.heading }}>Quick Tappit</h2>
                    <div style={styles.quickRow}>
                        {quickTappits.map((item) => (
                            <button key={item.word} type="button" onClick={() => speakQuickWord(getWord(item))} style={{ ...styles.symbolButton, backgroundColor: "#fed7aa", border: "2px solid #c2410c", color: "#431407" }}>
                                <span style={styles.emoji}>{item.emoji}</span>
                                <span style={styles.word}>{getWord(item)}</span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {CATEGORIES.map((cat) => (
                <section key={cat.label} style={styles.categorySection}>
                    <h2 style={{ ...styles.sectionHeading, color: t.heading }}>{cat.label}</h2>
                    <div style={styles.grid}>
                        {cat.symbols.map((symbol) => (
                            <button key={symbol.word} type="button" onClick={() => handleSymbolClick(getWord(symbol))} style={{ ...styles.symbolButton, backgroundColor: t.card, border: `2px solid ${t.border}`, color: t.text }}>
                                <span style={styles.emoji}>{symbol.emoji}</span>
                                <span style={styles.word}>{getWord(symbol)}</span>
                            </button>
                        ))}
                    </div>
                </section>
            ))}

            <div style={{ ...styles.tappitBar, backgroundColor: t.card, border: `2px solid ${t.border}`, color: t.text }}>
                {phrase.length > 0 ? phrase.join(" ") : lang === "es" ? "Toca un símbolo para comenzar..." : "Tap a symbol to start..."}
            </div>

            <div style={{ ...styles.stickyBar, backgroundColor: t.bg, borderTop: `2px solid ${t.border}` }}>
                <button type="button" onClick={speakPhrase} disabled={phrase.length === 0} style={{ ...styles.actionButton, backgroundColor: "#fbbf24", border: "2px solid #d97706", color: "#422006", ...(phrase.length === 0 ? styles.disabled : {}) }}>
                    <span style={styles.actionEmoji}>🔊</span>
                    <span style={styles.actionLabel}>{lang === "es" ? "Hablar" : "Speak"}</span>
                </button>
                <button type="button" onClick={clearPhrase} style={{ ...styles.actionButton, backgroundColor: "#e5e7eb", border: "2px solid #6b7280", color: "#111111" }}>
                    <span style={styles.actionEmoji}>🗑️</span>
                    <span style={styles.actionLabel}>{lang === "es" ? "Borrar" : "Clear"}</span>
                </button>
                {settings.showDraw && (
                    <button type="button" onClick={() => setShowDrawing(true)} style={{ ...styles.actionButton, backgroundColor: "#ede9fe", border: "2px solid #7c3aed", color: "#3b0764" }}>
                        <span style={styles.actionEmoji}>✏️</span>
                        <span style={styles.actionLabel}>{lang === "es" ? "Dibujar" : "Draw"}</span>
                    </button>
                )}
                {settings.showCalmCorner && (
                    <button type="button" onClick={() => setShowCalm(true)} style={{ ...styles.actionButton, backgroundColor: "#d1fae5", border: "2px solid #059669", color: "#064e3b" }}>
                        <span style={styles.actionEmoji}>🌿</span>
                        <span style={styles.actionLabel}>{lang === "es" ? "Calma" : "Calm"}</span>
                    </button>
                )}
                {settings.showRhymes && (
                    <button type="button" onClick={() => setShowRhymes(true)} style={{ ...styles.actionButton, backgroundColor: "#fce7f3", border: "2px solid #db2777", color: "#831843" }}>
                        <span style={styles.actionEmoji}>🎵</span>
                        <span style={styles.actionLabel}>{lang === "es" ? "Rimas" : "Rhymes"}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: { maxWidth: "100%", margin: "0 auto", padding: "1rem", paddingBottom: "120px", minHeight: "100vh" },
    quickSection: { marginBottom: "1.5rem" },
    categorySection: { marginBottom: "1.5rem" },
    sectionHeading: { margin: "0 0 0.75rem 0", fontSize: "1.1rem", fontWeight: "700" },
    quickRow: { display: "flex", flexWrap: "wrap", gap: "0.75rem" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(85px, 1fr))", gap: "0.75rem" },
    symbolButton: { minHeight: "85px", minWidth: "85px", padding: "0.5rem", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: "700", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
    emoji: { fontSize: "2rem", lineHeight: "1.2" },
    word: { marginTop: "0.25rem", fontSize: "0.85rem", fontWeight: "700", textAlign: "center" },
    tappitBar: { marginTop: "1rem", marginBottom: "1rem", minHeight: "52px", padding: "0.75rem", borderRadius: "14px", fontSize: "1rem", fontWeight: "500" },
    stickyBar: { position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem", flexWrap: "wrap", zIndex: 100, boxShadow: "0 -4px 12px rgba(0,0,0,0.1)" },
    actionButton: { minWidth: "70px", minHeight: "70px", padding: "0.4rem", borderRadius: "14px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: "700", gap: "0.2rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
    actionEmoji: { fontSize: "1.6rem", lineHeight: "1" },
    actionLabel: { fontSize: "0.7rem", fontWeight: "700" },
    disabled: { opacity: 0.5, cursor: "not-allowed" },
};