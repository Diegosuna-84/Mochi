import React from "react";
import { SectionShell } from "./SectionShell";

const FEEDBACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdjJCN0q_dzvchhAsbbNdBQ2kSGEsc_VxtPn2tDbfYHDahx_Q/viewform";

export const FeedbackPage = ({ onBack }) => {
    const profile = JSON.parse(localStorage.getItem("mochiProfile"));
    const lang = profile?.language || "en";

    const copy = lang === "es"
        ? {
            title: "💬 Comentarios",
            heading: "Nos encantaría saber de ti",
            body1: "Mochi siempre está mejorando. Tus comentarios nos ayudan a construir una mejor experiencia para usuarios no verbales y sus familias.",
            body2: "Cuéntanos qué funciona, qué falta y qué haría a Mochi aún mejor para tu familia.",
            tips: [
                { emoji: "✅", text: "¿Qué funciones usas más?" },
                { emoji: "💡", text: "¿Qué falta que ayudaría?" },
                { emoji: "🐛", text: "¿Algún error o problema que reportar?" },
            ],
            button: "💬 Compartir Comentarios",
            footer: "Creado por Diego Osuna en Kado Web Studio LLC",
        }
        : {
            title: "💬 Feedback",
            heading: "We'd love to hear from you",
            body1: "Mochi is always improving. Your feedback helps us build a better experience for non-verbal and minimally verbal users and their families.",
            body2: "Tell us what's working, what's missing, and what would make Mochi even better for your family.",
            tips: [
                { emoji: "✅", text: "What features do you use most?" },
                { emoji: "💡", text: "What's missing that would help?" },
                { emoji: "🐛", text: "Any bugs or issues to report?" },
            ],
            button: "💬 Share Feedback",
            footer: "Built by Diego Osuna at Kado Web Studio LLC",
        };

    return (
        <SectionShell title={copy.title} onBack={onBack} lang={lang}>
            <section style={styles.card}>
                <p style={styles.emoji}>🍡</p>
                <h2 style={styles.heading}>{copy.heading}</h2>
                <p style={styles.text}>{copy.body1}</p>
                <p style={styles.text}>{copy.body2}</p>

                <div style={styles.tipList}>
                    {copy.tips.map((tip) => (
                        <div key={tip.text} style={styles.tip}>
                            <span style={styles.tipEmoji}>{tip.emoji}</span>
                            <p style={styles.tipText}>{tip.text}</p>
                        </div>
                    ))}
                </div>

                <a
                    href={FEEDBACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.feedbackButton}
                >
                    {copy.button}
                </a>

                <p style={styles.footer}>{copy.footer}</p>
            </section>
        </SectionShell>
    );
};

const styles = {
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        padding: "1.5rem",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
    emoji: { fontSize: "3rem", margin: "0 0 0.5rem 0" },
    heading: {
        fontSize: "1.25rem",
        fontWeight: "800",
        color: "#002366",
        margin: "0 0 1rem 0",
    },
    text: {
        fontSize: "0.95rem",
        color: "#374151",
        lineHeight: "1.6",
        margin: "0 0 0.75rem 0",
    },
    tipList: {
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        margin: "1rem 0",
        textAlign: "left",
    },
    tip: {
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
    },
    tipEmoji: { fontSize: "1.25rem" },
    tipText: { fontSize: "0.9rem", color: "#374151", margin: 0 },
    feedbackButton: {
        display: "inline-block",
        width: "100%",
        boxSizing: "border-box",
        padding: "1rem",
        backgroundColor: "#002366",
        color: "#ffffff",
        borderRadius: "16px",
        fontWeight: "700",
        fontSize: "1rem",
        textDecoration: "none",
        marginTop: "0.5rem",
    },
    footer: {
        fontSize: "0.8rem",
        color: "#9ca3af",
        marginTop: "1rem",
    },
};