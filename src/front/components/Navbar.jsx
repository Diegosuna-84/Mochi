import { useState, useRef, useEffect } from "react";
import { useLongPress } from "../js/component/useLongPress";

export const Navbar = ({ onSettingsClick, onAboutClick, onLogoClick, onFeedbackClick }) => {
    const profile = JSON.parse(localStorage.getItem("mochiProfile"));
    const settings = JSON.parse(localStorage.getItem(`mochiSettings_${profile?.id}`));
    const caregiverLockEnabled = settings?.caregiverLockEnabled ?? false;

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const longPressFired = useRef(false);

    // Long-pressing the hamburger itself is the caregiver bypass —
    // works even when locked, and skips the menu entirely.
    const longPressProps = useLongPress(() => {
        longPressFired.current = true;
        setMenuOpen(false);
        onSettingsClick();
    }, 2000);

    const handleHamburgerClick = () => {
        // If the long-press already fired, swallow the click that
        // follows the touch/mouse release so we don't also open the menu.
        if (longPressFired.current) {
            longPressFired.current = false;
            return;
        }
        setMenuOpen((open) => !open);
    };

    const handleItemClick = (action) => {
        setMenuOpen(false);
        if (caregiverLockEnabled) return;
        action();
    };

    // Close the menu on outside click/tap
    useEffect(() => {
        if (!menuOpen) return;
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <nav style={styles.nav}>
            <div
                onClick={() => { setMenuOpen(false); onLogoClick(); }}
                style={styles.logoWrap}
            >
                <div style={styles.logoContainer}>
                    <span style={styles.logo}>🍡</span>
                    <span style={styles.titleText}>Mochi</span>
                </div>
            </div>

            <div style={styles.menuWrap} ref={menuRef}>
                <button
                    {...longPressProps}
                    onClick={handleHamburgerClick}
                    style={styles.hamburgerBtn}
                    aria-label="Menu"
                    aria-expanded={menuOpen}
                >
                    <span style={styles.hamburgerIcon}>{menuOpen ? "✕" : "☰"}</span>
                </button>

                {menuOpen && (
                    <div style={styles.dropdown}>
                        <button
                            onClick={() => handleItemClick(onFeedbackClick)}
                            style={{
                                ...styles.menuItem,
                                opacity: caregiverLockEnabled ? 0.5 : 1,
                                cursor: caregiverLockEnabled ? "not-allowed" : "pointer",
                            }}
                        >
                            <span style={styles.menuItemIcon}>💬</span>
                            <span>Feedback</span>
                        </button>
                        <button
                            onClick={() => handleItemClick(onAboutClick)}
                            style={{
                                ...styles.menuItem,
                                opacity: caregiverLockEnabled ? 0.5 : 1,
                                cursor: caregiverLockEnabled ? "not-allowed" : "pointer",
                            }}
                        >
                            <span style={styles.menuItemIcon}>🍡</span>
                            <span>About Mochi</span>
                        </button>
                        <button
                            onClick={() => handleItemClick(onSettingsClick)}
                            style={{
                                ...styles.menuItem,
                                opacity: caregiverLockEnabled ? 0.5 : 1,
                                cursor: caregiverLockEnabled ? "not-allowed" : "pointer",
                            }}
                        >
                            <span style={styles.menuItemIcon}>⚙️</span>
                            <span>Settings</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: "#002366",
        padding: "0.5rem 0.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 200,
    },
    logoWrap: {
        cursor: "pointer",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "#ffffff",
        padding: "0.4rem 1.25rem",
        borderRadius: "50px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    logo: {
        fontSize: "1.6rem",
        lineHeight: "1",
    },
    titleText: {
        fontSize: "1.4rem",
        fontWeight: "800",
        color: "#002366",
        letterSpacing: "2px",
        fontFamily: "Georgia, serif",
    },
    menuWrap: {
        position: "relative",
    },
    hamburgerBtn: {
        minHeight: "44px",
        minWidth: "44px",
        padding: "0.4rem",
        backgroundColor: "#ffffff",
        color: "#002366",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    hamburgerIcon: {
        fontSize: "1.4rem",
        lineHeight: "1",
    },
    dropdown: {
        position: "absolute",
        top: "calc(100% + 0.5rem)",
        right: 0,
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        minWidth: "180px",
        zIndex: 250,
    },
    menuItem: {
        minHeight: "44px",
        padding: "0.5rem 0.75rem",
        backgroundColor: "transparent",
        color: "#002366",
        border: "none",
        borderRadius: "10px",
        fontWeight: "700",
        fontSize: "0.95rem",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        textAlign: "left",
    },
    menuItemIcon: {
        fontSize: "1.2rem",
        lineHeight: "1",
    },
};