import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>
                <div style={styles.logoContainer}>
                    <span style={styles.logo}>🍡</span>
                    <span style={styles.title}>Mochi</span>
                </div>
            </Link>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: "#002366",
        padding: "0.75rem 1rem",
        display: "flex",
        justifyContent: "center",
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
};