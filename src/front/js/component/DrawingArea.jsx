import React, { useRef, useState } from "react";
import { getActiveTheme } from "./theme";

const COLORS = [
    { label: "Red", value: "#ef4444" },
    { label: "Yellow", value: "#fbbf24" },
    { label: "Green", value: "#22c55e" },
    { label: "Blue", value: "#3b82f6" },
    { label: "Orange", value: "#f97316" },
    { label: "Black", value: "#111111" },
    { label: "Purple", value: "#a855f7" },
    { label: "White", value: "#ffffff" },
];

export const DrawingArea = ({ onBack }) => {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const [selectedColor, setSelectedColor] = useState("#111111");
    const t = getActiveTheme();

    const getPos = (e, canvas) => {
        const rect = canvas.getBoundingClientRect();
        if (e.touches) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const startDraw = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const pos = getPos(e, canvas);
        isDrawing.current = true;
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
        if (!isDrawing.current) return;
        e.preventDefault();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const pos = getPos(e, canvas);
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.strokeStyle = selectedColor;
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };

    const stopDraw = () => {
        isDrawing.current = false;
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div style={styles.wrapper}>
            <div style={{ ...styles.topBar, backgroundColor: t.card, borderBottomColor: t.border }}>
                <button onClick={onBack} style={styles.backButton}>
                    ← Back
                </button>
                <button onClick={clearCanvas} style={styles.clearButton}>
                    Clear
                </button>
            </div>

            <div style={{ ...styles.colorRow, backgroundColor: t.card, borderBottomColor: t.border }}>
                {COLORS.map((color) => (
                    <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        style={{
                            ...styles.colorButton,
                            backgroundColor: color.value,
                            border: selectedColor === color.value
                                ? "3px solid #111111"
                                : "3px solid transparent",
                            outline: selectedColor === color.value
                                ? "2px solid #fbbf24"
                                : "none"
                        }}
                        aria-label={color.label}
                    />
                ))}
            </div>

            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight - 204}
                style={styles.canvas}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
            />
        </div>
    );
};

const styles = {
    wrapper: {
        position: "fixed",
        top: 64,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 64px)",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        zIndex: 150
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1rem",
        borderBottom: "2px solid"
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
        fontSize: "1rem"
    },
    clearButton: {
        minHeight: "44px",
        minWidth: "80px",
        padding: "0.5rem 1rem",
        border: "2px solid #1f2937",
        borderRadius: "8px",
        backgroundColor: "#e5e7eb",
        color: "#111111",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "1rem"
    },
    colorRow: {
        display: "flex",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        borderBottom: "2px solid",
        flexWrap: "wrap"
    },
    colorButton: {
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        cursor: "pointer"
    },
    canvas: {
        flex: 1,
        display: "block",
        backgroundColor: "#ffffff",
        touchAction: "none"
    }
};