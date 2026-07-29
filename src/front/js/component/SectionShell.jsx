import React from "react";
import { getActiveTheme } from "./theme";

export const SectionShell = ({
    title,
    onBack,
    lang = "en",
    headerActions = null,
    variant = "scroll",
    maxWidth = 680,
    children,
}) => {
    const t = getActiveTheme();
    const backLabel = lang === "es" ? "← Volver" : "← Back";

    if (variant === "fill") {
        return (
            <div style={{ ...styles.fillWrapper, backgroundColor: t.bg }}>
                <div style={{ ...styles.fillTopBar, backgroundColor: t.card, borderBottomColor: t.border }}>
                    <button onClick={onBack} style={styles.backButton} aria-label={backLabel}>
                        {backLabel}
                    </button>
                    {title && <h1 style={{ ...styles.fillTitle, color: t.heading }}>{title}</h1>}
                    {headerActions && <div style={styles.headerActions}>{headerActions}</div>}
                </div>
                <div style={styles.fillContent}>{children}</div>
            </div>
        );
    }

    return (
        <div style={{ ...styles.fullBleed, backgroundColor: t.bg }}>
            <div
                style={{
                    ...styles.scrollWrapper,
                    ...(maxWidth ? { maxWidth: `${maxWidth}px`, margin: "0 auto" } : {}),
                }}
            >
                <div style={styles.scrollTopBar}>
                    <button onClick={onBack} style={styles.backButton} aria-label={backLabel}>
                        {backLabel}
                    </button>
                    {title && <h1 style={{ ...styles.scrollTitle, color: t.heading }}>{title}</h1>}
                    {headerActions && <div style={styles.headerActions}>{headerActions}</div>}
                </div>
                {children}
            </div>
        </div>
    );
};

const styles = {
    fullBleed: {
        width: "100%",
        minHeight: "100vh",
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
        flexShrink: 0,
    },
    headerActions: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
    },
    scrollWrapper: {
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
    },
    scrollTopBar: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1.5rem",
        flexWrap: "wrap",
    },
    scrollTitle: {
        fontSize: "1.4rem",
        fontWeight: "800",
        margin: 0,
        flex: 1,
    },
    fillWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 64px)",
    },
    fillTopBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        borderBottom: "2px solid",
        flexWrap: "wrap",
        flexShrink: 0,
    },
    fillTitle: {
        fontSize: "1.2rem",
        fontWeight: "800",
        margin: 0,
        flex: 1,
    },
    fillContent: {
        flex: 1,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
    },
};