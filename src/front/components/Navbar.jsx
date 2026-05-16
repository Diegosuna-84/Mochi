import { Link } from "react-router-dom";

export const Navbar = ({ onSettingsClick, onAboutClick }) => {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>
                <div style={styles.logoContainer}>
                    <span style={styles.logo}>🍡</span>
                    <span style={styles.title}>Mochi</span>
                </div>
            </Link>
            <div style={styles.buttonGroup}>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjJCN0q_dzvchhAsbbNdBQ2kSGEsc_VxtPn2tDbfYHDahx_Q/viewform" target="_blank" rel="noopener noreferrer" style={styles.feedbackButton}>
                    💬 Feedback
                </a>
                <button onClick={onAboutClick} style={styles.aboutButton}>
                    🍡 About Mochi
                </button>
                <button onClick={onSettingsClick} style={styles.settingsButton} aria-label="Open Settings">
                    ⚙️ Settings
                </button>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: "#002366",
        padding: "0.75rem 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    link: {
        textDecoration: "none",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "#ffffff",
        padding: "0.5rem 2rem",
        borderRadius: "50px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    logo: {
        fontSize: "2rem",
        lineHeight: "1",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "800",
        color: "#002366",
        letterSpacing: "2px",
        fontFamily: "Georgia, serif",
    },
    buttonGroup: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    },
    feedbackButton: {
        minHeight: "44px",
        padding: "0.5rem 1rem",
        backgroundColor: "#fbbf24",
        color: "#422006",
        border: "none",
        borderRadius: "50px",
        fontWeight: "700",
        fontSize: "0.95rem",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
    },
    aboutButton: {
        minHeight: "44px",
        padding: "0.5rem 1rem",
        backgroundColor: "#e0f2fe",
        color: "#002366",
        border: "none",
        borderRadius: "50px",
        fontWeight: "700",
        fontSize: "0.95rem",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    settingsButton: {
        minHeight: "44px",
        minWidth: "44px",
        padding: "0.5rem 1rem",
        backgroundColor: "#ffffff",
        color: "#002366",
        border: "none",
        borderRadius: "50px",
        fontWeight: "700",
        fontSize: "0.95rem",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
};