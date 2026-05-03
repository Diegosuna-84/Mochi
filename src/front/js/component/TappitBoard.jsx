import React, { useState, useEffect } from "react";

const SYMBOLS = [
	{ word: "Apple", emoji: "🍎" },
	{ word: "Drink", emoji: "🥤" },
	{ word: "Bathroom", emoji: "🚽" },
	{ word: "Tired", emoji: "😴" },
	{ word: "Hurt", emoji: "🤕" },
	{ word: "Please", emoji: "🙏" },
	{ word: "Yes", emoji: "✅" },
	{ word: "No", emoji: "❌" },
	{ word: "Home", emoji: "🏠" },
	{ word: "Happy", emoji: "😊" },
	{ word: "Sad", emoji: "😢" },
	{ word: "Food", emoji: "🍽️" },
	{ word: "Give", emoji: "🤲" },
	{ word: "Me", emoji: "👤" },
	{ word: "More", emoji: "🔁" },
	{ word: "I", emoji: "👁️" },
	{ word: "Want", emoji: "🙋" },
	{ word: "Stop", emoji: "✋" },
	{ word: "Done", emoji: "🏁" },
];

const quickTappits = [
	{ word: "Help", emoji: "🆘" },
	{ word: "Bathroom", emoji: "🚽" },
	{ word: "Break", emoji: "☕" }
];

export const TappitBoard = () => {
	const [phrase, setPhrase] = useState([]);
	const defaultProfile = { name: "", ageGroup: "", voicePreference: "" };
	const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("mochiProfile");
    return saved ? JSON.parse(saved) : defaultProfile;
});

useEffect(() => {
    localStorage.setItem("mochiProfile", JSON.stringify(profile));
}, [profile]);

	const handleSymbolClick = (word) => {
		setPhrase((currentPhrase) => [...currentPhrase, word]);
	};

	const clearPhrase = () => {
		setPhrase([]);
	};

	const speakPhrase = () => {
		if (phrase.length === 0) return;
		const utterance = new SpeechSynthesisUtterance(phrase.join(" "));
		window.speechSynthesis.speak(utterance);
	};

	const speakQuickWord = (word) => {
		const utterance = new SpeechSynthesisUtterance(word);
		window.speechSynthesis.speak(utterance);
	};

	return (
		<div style={styles.wrapper}>
			<section style={styles.quickSection} aria-labelledby="quick-tappit-heading">
				<h2 id="quick-tappit-heading" style={styles.quickSectionHeading}>
					Quick Tappit
				</h2>
				<div style={styles.quickRow}>
					{quickTappits.map((item) => (
						<button
							key={item.word}
							type="button"
							onClick={() => speakQuickWord(item.word)}
							style={styles.quickButton}
						>
							<span style={styles.emoji}>{item.emoji}</span>
							<span style={styles.quickWord}>{item.word}</span>
						</button>
					))}
				</div>
			</section>

			<div style={styles.grid}>
				{SYMBOLS.map((symbol) => (
					<button
						key={symbol.word}
						type="button"
						onClick={() => handleSymbolClick(symbol.word)}
						style={styles.symbolButton}
					>
						<span style={styles.emoji}>{symbol.emoji}</span>
						<span style={styles.word}>{symbol.word}</span>
					</button>
				))}
			</div>

			<div style={styles.tappitBar}>
				{phrase.length > 0 ? phrase.join(" ") : "Tap a symbol to start..."}
			</div>

			<div style={styles.buttonRow}>
				<button
					type="button"
					onClick={speakPhrase}
					disabled={phrase.length === 0}
					style={{
						...styles.speakButton,
						...(phrase.length === 0 ? styles.speakButtonDisabled : {})
					}}
				>
					Speak 🔊
				</button>
				<button type="button" onClick={clearPhrase} style={styles.clearButton}>
					Clear
				</button>
			</div>
		</div>
	);
};

const styles = {
	wrapper: {
		maxWidth: "680px",
		margin: "0 auto",
		padding: "1rem"
	},
	quickSection: {
		marginBottom: "1rem"
	},
	quickSectionHeading: {
		margin: "0 0 0.5rem 0",
		fontSize: "1.125rem",
		fontWeight: "700",
		color: "#111111"
	},
	quickRow: {
		display: "flex",
		flexWrap: "wrap",
		gap: "0.75rem",
		alignItems: "center"
	},
	quickButton: {
		minHeight: "80px",
		minWidth: "80px",
		padding: "0.5rem",
		border: "2px solid #c2410c",
		borderRadius: "10px",
		backgroundColor: "#fed7aa",
		color: "#431407",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		fontWeight: "700"
	},
	quickWord: {
		marginTop: "0.25rem",
		fontSize: "0.95rem",
		fontWeight: "700"
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
		gap: "0.75rem"
	},
	symbolButton: {
		minHeight: "80px",
		minWidth: "80px",
		padding: "0.5rem",
		border: "2px solid #1f2937",
		borderRadius: "10px",
		backgroundColor: "#ffffff",
		color: "#111111",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer"
	},
	emoji: {
		fontSize: "1.8rem",
		lineHeight: "1.2"
	},
	word: {
		marginTop: "0.25rem",
		fontSize: "0.95rem",
		fontWeight: "600"
	},
	tappitBar: {
		marginTop: "1rem",
		minHeight: "48px",
		padding: "0.75rem",
		border: "2px solid #1f2937",
		borderRadius: "10px",
		backgroundColor: "#f9fafb",
		color: "#111111",
		fontSize: "1rem",
		fontWeight: "500"
	},
	buttonRow: {
		marginTop: "0.75rem",
		display: "flex",
		gap: "0.75rem",
		alignItems: "center",
		flexWrap: "wrap"
	},
	speakButton: {
		minWidth: "80px",
		minHeight: "80px",
		padding: "0.5rem",
		border: "2px solid #d97706",
		borderRadius: "8px",
		backgroundColor: "#fbbf24",
		color: "#422006",
		fontWeight: "700",
		cursor: "pointer"
	},
	speakButtonDisabled: {
		opacity: 0.5,
		cursor: "not-allowed"
	},
	clearButton: {
		padding: "0.6rem 1rem",
		border: "2px solid #1f2937",
		borderRadius: "8px",
		backgroundColor: "#e5e7eb",
		color: "#111111",
		fontWeight: "700",
		cursor: "pointer"
	}
};
