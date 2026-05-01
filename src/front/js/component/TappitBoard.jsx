import React, { useState } from "react";

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
	{ word: "Food", emoji: "🍽️" }
];

export const TappitBoard = () => {
	const [phrase, setPhrase] = useState([]);

	const handleSymbolClick = (word) => {
		setPhrase((currentPhrase) => [...currentPhrase, word]);
	};

	const clearPhrase = () => {
		setPhrase([]);
	};

	return (
		<div style={styles.wrapper}>
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

			<button type="button" onClick={clearPhrase} style={styles.clearButton}>
				Clear
			</button>
		</div>
	);
};

const styles = {
	wrapper: {
		maxWidth: "680px",
		margin: "0 auto",
		padding: "1rem"
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
	clearButton: {
		marginTop: "0.75rem",
		padding: "0.6rem 1rem",
		border: "2px solid #1f2937",
		borderRadius: "8px",
		backgroundColor: "#e5e7eb",
		color: "#111111",
		fontWeight: "700",
		cursor: "pointer"
	}
};
