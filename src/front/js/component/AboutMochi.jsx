import React from "react";
import { SectionShell } from "./SectionShell";
import { getActiveTheme } from "./theme";

export const AboutMochi = ({ onBack }) => {
    const profile = JSON.parse(localStorage.getItem("mochiProfile"));
    const lang = profile?.language || "en";
    const t = getActiveTheme();

    return (
        <SectionShell title="🍡 About Mochi" onBack={onBack} lang={lang}>
            <section style={{ ...styles.section, backgroundColor: t.card }}>
                <h2 style={{ ...styles.sectionHeading, color: t.heading }}>What is Mochi?</h2>
                <p style={{ ...styles.text, color: t.text }}>Mochi is a free, accessible tap-to-speak communication tool built for non-verbal and minimally verbal users, starting with autism-related communication support needs.</p>
                <p style={{ ...styles.text, color: t.text }}>No downloads. No subscriptions. No accounts required. Always free.</p>
            </section>

            <section style={{ ...styles.section, backgroundColor: t.card }}>
                <h2 style={{ ...styles.sectionHeading, color: t.heading }}>How to Use Mochi</h2>
                <div style={styles.steps}>
                    <div style={styles.step}>
                        <span style={styles.stepEmoji}>👆</span>
                        <div>
                            <p style={{ ...styles.stepTitle, color: t.heading }}>Step 1 — Tap</p>
                            <p style={{ ...styles.stepText, color: t.text }}>Tap any symbol on the board to add it to your phrase.</p>
                        </div>
                    </div>
                    <div style={styles.step}>
                        <span style={styles.stepEmoji}>📝</span>
                        <div>
                            <p style={{ ...styles.stepTitle, color: t.heading }}>Step 2 — Build</p>
                            <p style={{ ...styles.stepText, color: t.text }}>Keep tapping to build a full phrase in the Tappit Bar.</p>
                        </div>
                    </div>
                    <div style={styles.step}>
                        <span style={styles.stepEmoji}>🔊</span>
                        <div>
                            <p style={{ ...styles.stepTitle, color: t.heading }}>Step 3 — Speak</p>
                            <p style={{ ...styles.stepText, color: t.text }}>Tap Speak to hear your phrase read aloud.</p>
                        </div>
                    </div>
                    <div style={styles.step}>
                        <span style={styles.stepEmoji}>🆘</span>
                        <div>
                            <p style={{ ...styles.stepTitle, color: t.heading }}>Quick Tappit</p>
                            <p style={{ ...styles.stepText, color: t.text }}>Use Quick Tappit buttons for instant one-tap communication — Help, Bathroom, Break.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ ...styles.section, backgroundColor: t.card }}>
                <h2 style={{ ...styles.sectionHeading, color: t.heading }}>👤 For Caregivers</h2>
                <div style={styles.tips}>
                    <div style={{ ...styles.tip, backgroundColor: t.bg }}>
                        <span style={styles.tipEmoji}>⚙️</span>
                        <p style={{ ...styles.tipText, color: t.text }}><strong>Settings</strong> — customize what features appear on the board. Toggle Draw, Calm Corner, Rhymes, Learning Mode and more.</p>
                    </div>
                    <div style={{ ...styles.tip, backgroundColor: t.bg }}>
                        <span style={styles.tipEmoji}>👤</span>
                        <p style={{ ...styles.tipText, color: t.text }}><strong>Profiles</strong> — create separate profiles for each user. Each profile has its own settings, theme and voice preference.</p>
                    </div>
                    <div style={{ ...styles.tip, backgroundColor: t.bg }}>
                        <span style={styles.tipEmoji}>🎓</span>
                        <p style={{ ...styles.tipText, color: t.text }}><strong>Learning Mode</strong> — when enabled, every symbol tap speaks the word immediately to help users learn.</p>
                    </div>
                    <div style={{ ...styles.tip, backgroundColor: t.bg }}>
                        <span style={styles.tipEmoji}>🎵</span>
                        <p style={{ ...styles.tipText, color: t.text }}><strong>Rhymes Corner</strong> — nursery rhymes for kids. Enable it in Settings.</p>
                    </div>
                    <div style={{ ...styles.tip, backgroundColor: t.bg }}>
                        <span style={styles.tipEmoji}>🔒</span>
                        <p style={{ ...styles.tipText, color: t.text }}><strong>Caregiver Lock</strong> — prevents kids from accidentally opening Settings, Feedback, or About Mochi. To turn it on, press and hold ⚙️ Settings for 2 seconds, go to Board Settings, and toggle Caregiver Lock on. To turn it off, press and hold ⚙️ Settings again and toggle it off.</p>
                    </div>
                    <div style={{ ...styles.tip, backgroundColor: t.bg }}>
                        <span style={styles.tipEmoji}>📴</span>
                        <p style={{ ...styles.tipText, color: t.text }}><strong>Offline</strong> — Mochi works without internet. Core communication is always available.</p>
                    </div>
                </div>
            </section>

            <section style={{ ...styles.section, backgroundColor: t.card }}>
                <h2 style={{ ...styles.sectionHeading, color: t.heading }}>About</h2>
                <p style={{ ...styles.text, color: t.text }}>Mochi was built by <strong>Diego Osuna</strong> at <strong>Kado Web Studio LLC</strong> as a free tool for families who need it most.</p>
                <p style={{ ...styles.text, color: t.text }}>We're always improving. Share your feedback and help us build something better.</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjJCN0q_dzvchhAsbbNdBQ2kSGEsc_VxtPn2tDbfYHDahx_Q/viewform" target="_blank" rel="noopener noreferrer" style={{ ...styles.feedbackLink, backgroundColor: t.heading }}>💬 Share Feedback</a>
            </section>

            <p style={styles.footer}>© 2025 Kado Web Studio LLC. All rights reserved.</p>
        </SectionShell>
    );
};

const styles = {
    section: {
        borderRadius: "16px",
        padding: "1.25rem",
        marginBottom: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
    sectionHeading: {
        fontSize: "1.1rem",
        fontWeight: "700",
        margin: "0 0 1rem 0",
    },
    text: {
        fontSize: "0.95rem",
        lineHeight: "1.6",
        margin: "0 0 0.75rem 0",
    },
    steps: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    step: {
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
    },
    stepEmoji: {
        fontSize: "2rem",
        flexShrink: 0,
    },
    stepTitle: {
        fontSize: "1rem",
        fontWeight: "700",
        margin: "0 0 0.25rem 0",
    },
    stepText: {
        fontSize: "0.9rem",
        margin: 0,
    },
    tips: {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    },
    tip: {
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "0.75rem",
        borderRadius: "10px",
    },
    tipEmoji: {
        fontSize: "1.5rem",
        flexShrink: 0,
    },
    tipText: {
        fontSize: "0.9rem",
        margin: 0,
        lineHeight: "1.5",
    },
    feedbackLink: {
        display: "inline-block",
        padding: "0.75rem 1.5rem",
        color: "#ffffff",
        borderRadius: "50px",
        fontWeight: "700",
        textDecoration: "none",
        fontSize: "1rem",
        marginTop: "0.5rem",
    },
    footer: {
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#9ca3af",
        padding: "1rem 0",
    },
};