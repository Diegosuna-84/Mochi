import React, { useState, useEffect } from "react";
import { DrawingArea } from "./DrawingArea";
import { CalmCorner } from "./CalmCorner";
import { SettingsPage } from "./SettingsPage";
import { WelcomeBanner } from "./WelcomeBanner";

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
		],
	},
];

const quickTappits = [
	{ word: "Help", emoji: "🆘" },
	{ word: "Bathroom", emoji: "🚽" },
	{ word: "Break", emoji: "☕" },
];

export const TappitBoard = ({ showSettings, setShowSettings, activeProfile }) => {
	const [phrase, setPhrase] = useState([]);
	const [welcomeSeen, setWelcomeSeen] = useState(
		() => !!localStorage.getItem("mochiWelcomeSeen")
	);
	const [showDrawing, setShowDrawing] = useState(false);
	const [showCalm, setShowCalm] = useState(false);
	const [theme, setTheme] = useState("blue");
	const defaultSettings = {
		showDraw: true,
		showCalmCorner: true,
		showQuickTappit: true,
		simplifiedMode: false,
		theme: "blue",
		tapSounds: false,
	};
	const settingsKey = activeProfile ? `mochiSettings_${activeProfile.id}` : "mochiSettings_guest";
	const [settings, setSettings] = useState(() => {
		const saved = localStorage.getItem(settingsKey);
		return saved ? JSON.parse(saved) : defaultSettings;
	});
	const t = THEMES[settings.theme] || THEMES["blue"];

	const defaultProfile = { name: "", ageGroup: "", voicePreference: "" };
	const [profile, setProfile] = useState(() => {
		const saved = localStorage.getItem("mochiProfile");
		return saved ? JSON.parse(saved) : defaultProfile;
	});

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

	const saveProfile = (updatedProfile) => {
		setProfile(updatedProfile);
		localStorage.setItem("mochiProfile", JSON.stringify(updatedProfile));
		syncProfile(updatedProfile);
	};

	const handleSymbolClick = (word) => {
		playTapSound();
		setPhrase((cur) => [...cur, word]);
	};

	const clearPhrase = () => setPhrase([]);

	const speakPhrase = () => {
		if (phrase.length === 0) return;
		const utterance = new SpeechSynthesisUtterance(phrase.join(" "));
		window.speechSynthesis.speak(utterance);
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

	const speakQuickWord = (word) => {
		playTapSound();
		const utterance = new SpeechSynthesisUtterance(word);
		window.speechSynthesis.speak(utterance);
	};

	if (showDrawing) return <DrawingArea onBack={() => setShowDrawing(false)} />;
	if (showCalm) return <CalmCorner onBack={() => setShowCalm(false)} />;
	if (showSettings) return (
		<SettingsPage
			profile={profile}
			settings={settings}
			onProfileChange={(updated) => setProfile(updated)}
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
			{/* Theme Switcher */}
			<div style={styles.themeRow}>
				{Object.keys(THEMES).map((key) => (
					<button
						key={key}
						onClick={() => setSettings({ ...settings, theme: key })}
						style={{
							...styles.themeButton,
							backgroundColor: THEMES[key].bg,
							border: settings.theme === key ? `3px solid ${t.heading}` : "3px solid transparent",
							color: THEMES[key].text,
						}}
					>
						{key === "blue" ? "☀️" : key === "pink" ? "🌸" : key === "white" ? "⬜" : key === "dark" ? "🌙" : "⚡"}
					</button>
				))}
			</div>

			{/* Quick Tappit */}
			{settings.showQuickTappit && (
				<section style={styles.quickSection}>
					<h2 style={{ ...styles.sectionHeading, color: t.heading }}>
						Quick Tappit
					</h2>
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
					<h2 style={{ ...styles.sectionHeading, color: t.heading }}>
						{cat.label}
					</h2>
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
			<div
				style={{
					...styles.tappitBar,
					backgroundColor: t.card,
					border: `2px solid ${t.border}`,
					color: t.text,
				}}
			>
				{phrase.length > 0 ? phrase.join(" ") : "Tap a symbol to start..."}
			</div>

			{/* Action Buttons */}
			<div style={styles.buttonRow}>
				<button
					type="button"
					onClick={speakPhrase}
					disabled={phrase.length === 0}
					style={{
						...styles.speakButton,
						...(phrase.length === 0 ? styles.speakButtonDisabled : {}),
					}}
				>
					Speak 🔊
				</button>
				<button type="button" onClick={clearPhrase} style={styles.clearButton}>
					Clear
				</button>
				{settings.showDraw && (
					<button
						type="button"
						onClick={() => setShowDrawing(true)}
						style={styles.drawButton}
					>
						✏️ Draw
					</button>
				)}
				{settings.showCalmCorner && (
					<button
						type="button"
						onClick={() => setShowCalm(true)}
						style={styles.calmButton}
					>
						🌿 Calm
					</button>
				)}
			</div>
		</div>
	);
};

const styles = {
	wrapper: {
		maxWidth: "780px",
		margin: "0 auto",
		padding: "1rem",
		minHeight: "100vh",
	},
	themeRow: {
		display: "flex",
		gap: "0.5rem",
		marginBottom: "1rem",
		justifyContent: "flex-end",
	},
	themeButton: {
		width: "44px",
		height: "44px",
		borderRadius: "50%",
		cursor: "pointer",
		fontSize: "1.2rem",
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
		minHeight: "52px",
		padding: "0.75rem",
		borderRadius: "14px",
		fontSize: "1rem",
		fontWeight: "500",
	},
	buttonRow: {
		marginTop: "0.75rem",
		display: "flex",
		gap: "0.75rem",
		alignItems: "center",
		flexWrap: "wrap",
	},
	speakButton: {
		minWidth: "85px",
		minHeight: "85px",
		padding: "0.5rem",
		border: "2px solid #d97706",
		borderRadius: "16px",
		backgroundColor: "#fbbf24",
		color: "#422006",
		fontWeight: "700",
		cursor: "pointer",
		fontSize: "0.95rem",
	},
	speakButtonDisabled: {
		opacity: 0.5,
		cursor: "not-allowed",
	},
	clearButton: {
		padding: "0.6rem 1rem",
		border: "2px solid #6b7280",
		borderRadius: "12px",
		backgroundColor: "#e5e7eb",
		color: "#111111",
		fontWeight: "700",
		cursor: "pointer",
	},
	drawButton: {
		minWidth: "85px",
		minHeight: "85px",
		padding: "0.5rem",
		border: "2px solid #7c3aed",
		borderRadius: "16px",
		backgroundColor: "#ede9fe",
		color: "#3b0764",
		fontWeight: "700",
		cursor: "pointer",
		fontSize: "0.95rem",
	},
	calmButton: {
		minWidth: "85px",
		minHeight: "85px",
		padding: "0.5rem",
		border: "2px solid #059669",
		borderRadius: "16px",
		backgroundColor: "#d1fae5",
		color: "#064e3b",
		fontWeight: "700",
		cursor: "pointer",
		fontSize: "0.95rem",
	},
};
