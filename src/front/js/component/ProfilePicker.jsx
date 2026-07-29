import React, { useState } from "react";
import { getActiveTheme } from "./theme";

const generateId = () => Math.random().toString(36).substr(2, 9);

const AVATAR_COLORS = [
    "#fbbf24", "#34d399", "#60a5fa", "#f87171", "#a78bfa", "#fb923c", "#38bdf8", "#f472b6"
];

export const ProfilePicker = ({ onSelectProfile, onSkip }) => {
    const [profiles, setProfiles] = useState(() => {
        const saved = localStorage.getItem("mochiProfiles");
        return saved ? JSON.parse(saved) : [];
    });
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [newAgeGroup, setNewAgeGroup] = useState("child");
    const [bounce, setBounce] = useState(false);
    const t = getActiveTheme();

    const saveProfiles = (updated) => {
        setProfiles(updated);
        localStorage.setItem("mochiProfiles", JSON.stringify(updated));
    };

    const handleCreate = () => {
        if (!newName.trim()) return;
        const newProfile = {
            id: generateId(),
            name: newName.trim(),
            ageGroup: newAgeGroup,
            color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
        };
        const updated = [...profiles, newProfile];
        saveProfiles(updated);
        setNewName("");
        setNewAgeGroup("child");
        setShowForm(false);
        handleSelect(newProfile);
    };

    const handleSelect = (profile) => {
        setBounce(true);
        setTimeout(() => {
            localStorage.setItem("mochiActiveProfile", profile.id);
            onSelectProfile(profile);
        }, 400);
    };

    const handleDelete = (id) => {
        const updated = profiles.filter((p) => p.id !== id);
        saveProfiles(updated);
        if (localStorage.getItem("mochiActiveProfile") === id) {
            localStorage.removeItem("mochiActiveProfile");
        }
    };

    const getEmoji = (ageGroup) => {
        if (ageGroup === "child") return "🧒";
        if (ageGroup === "teen") return "🧑";
        return "👤";
    };

    return (
        <div style={{ ...styles.wrapper, backgroundColor: t.bg }}>
            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .mochi-card {
                    animation: fadeIn 0.4s ease forwards;
                }
                .mochi-logo {
                    animation: bounce 1.8s ease-in-out infinite;
                    display: inline-block;
                }
            `}</style>

            <div style={{ ...styles.card, backgroundColor: t.card }} className="mochi-card">
                <div className="mochi-logo" style={styles.logoEmoji}>🍡</div>
                <h1 style={{ ...styles.title, color: t.heading }}>Mochi</h1>
                <p style={styles.subtitle}>Who is using Mochi today?</p>

                {/* Profile list */}
                <div style={styles.profileList}>
                    {profiles.map((profile, index) => (
                        <div key={profile.id} style={styles.profileRow}>
                            <button
                                onClick={() => handleSelect(profile)}
                                style={{ ...styles.profileButton, backgroundColor: t.bg, borderColor: t.border }}
                            >
                                <div style={{
                                    ...styles.avatar,
                                    backgroundColor: profile.color || AVATAR_COLORS[index % AVATAR_COLORS.length]
                                }}>
                                    {getEmoji(profile.ageGroup)}
                                </div>
                                <div style={styles.profileInfo}>
                                    <span style={{ ...styles.profileName, color: t.heading }}>{profile.name}</span>
                                    <span style={styles.profileAge}>{profile.ageGroup}</span>
                                </div>
                            </button>
                            <button
                                onClick={() => handleDelete(profile.id)}
                                style={styles.deleteButton}
                                aria-label="Delete profile"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>

                {/* New profile form */}
                {showForm ? (
                    <div style={styles.form}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            style={styles.input}
                            autoFocus
                        />
                        <select
                            value={newAgeGroup}
                            onChange={(e) => setNewAgeGroup(e.target.value)}
                            style={styles.input}
                        >
                            <option value="child">Child</option>
                            <option value="teen">Teen</option>
                            <option value="adult">Adult</option>
                        </select>
                        <div style={styles.formButtons}>
                            <button onClick={handleCreate} style={{ ...styles.createButton, backgroundColor: t.heading }}>
                                ✅ Create
                            </button>
                            <button onClick={() => setShowForm(false)} style={styles.cancelButton}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setShowForm(true)} style={{ ...styles.addButton, borderColor: t.border, color: t.heading, backgroundColor: t.bg }}>
                        + Add Profile
                    </button>
                )}

                {/* Skip button */}
                <button onClick={onSkip} style={styles.skipButton}>
                    Skip → Use as Guest
                </button>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
    },
    card: {
        borderRadius: "32px",
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 12px 48px rgba(0,35,102,0.15)",
        textAlign: "center",
    },
    logoEmoji: {
        fontSize: "4rem",
        marginBottom: "0.25rem",
    },
    title: {
        fontSize: "2.8rem",
        fontWeight: "800",
        margin: "0 0 0.25rem 0",
        fontFamily: "Georgia, serif",
        letterSpacing: "2px",
    },
    subtitle: {
        fontSize: "1.1rem",
        color: "#6b7280",
        marginBottom: "1.5rem",
        fontWeight: "500",
    },
    profileList: {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        marginBottom: "1rem",
    },
    profileRow: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    },
    profileButton: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        borderRadius: "16px",
        border: "2px solid",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s",
    },
    avatar: {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.6rem",
        flexShrink: 0,
    },
    profileInfo: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    profileName: {
        fontSize: "1.1rem",
        fontWeight: "700",
    },
    profileAge: {
        fontSize: "0.8rem",
        color: "#6b7280",
        textTransform: "capitalize",
    },
    deleteButton: {
        minWidth: "44px",
        minHeight: "44px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#fee2e2",
        cursor: "pointer",
        fontSize: "1.1rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        marginBottom: "1rem",
    },
    input: {
        padding: "0.6rem 0.75rem",
        borderRadius: "8px",
        border: "2px solid #d1d5db",
        fontSize: "1rem",
        color: "#111111",
    },
    formButtons: {
        display: "flex",
        gap: "0.5rem",
    },
    createButton: {
        flex: 1,
        padding: "0.6rem",
        borderRadius: "8px",
        border: "none",
        color: "#ffffff",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "1rem",
    },
    cancelButton: {
        padding: "0.6rem 1rem",
        borderRadius: "8px",
        border: "2px solid #d1d5db",
        backgroundColor: "#f9fafb",
        color: "#374151",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "1rem",
    },
    addButton: {
        width: "100%",
        padding: "0.75rem",
        borderRadius: "12px",
        border: "2px dashed",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "1rem",
        marginBottom: "0.75rem",
    },
    skipButton: {
        width: "100%",
        padding: "0.75rem",
        borderRadius: "12px",
        border: "none",
        backgroundColor: "transparent",
        color: "#9ca3af",
        cursor: "pointer",
        fontSize: "0.95rem",
        marginTop: "0.25rem",
    },
};