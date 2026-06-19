import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { SectionShell } from "./SectionShell";

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

export const DrawingArea = ({ onBack, lang = "en" }) => {
    const canvasRef = useRef(null);
    const canvasWrapRef = useRef(null);
    const isDrawing = useRef(false);
    const [selectedColor, setSelectedColor] = useState("#111111");
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        const measure = () => {
            if (canvasWrapRef.current) {
                const rect = canvasWrapRef.current.getBoundingClientRect();
                setCanvasSize({ width: Math.floor(rect.width), height: Math.floor(rect.height) });
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const getPos = (e, canvas) => {
        const rect = canvas.getBoundingClientRect();
        if (e.touches) {
            return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        }
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
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

    const stopDraw = () => { isDrawing.current = false; };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <SectionShell
            onBack={onBack}
            lang={lang}
            variant="fill"
            background="#ffffff"
            headerActions={
                <button onClick={clearCanvas} style={styles.clearButton}>Clear</button>
            }
        >
            <div style={styles.colorRow}>
                {COLORS.map((color) => (
                    <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        style={{
                            ...styles.colorButton,
                            backgroundColor: color.value,
                            border: selectedColor === color.value ? "3px solid #111111" : "3px solid transparent",
                            outline: selectedColor === color.value ? "2px solid #fbbf24" : "none"
                        }}
                        aria-label={color.label}
                    />
                ))}
            </div>

            <div ref={canvasWrapRef} style={styles.canvasWrap}>
                {canvasSize.width > 0 && canvasSize.height > 0 && (
                    <canvas
                        ref={canvasRef}
                        width={canvasSize.width}
                        height={canvasSize.height}
                        style={styles.canvas}
                        onMouseDown={startDraw}
                        onMouseMove={draw}
                        onMouseUp={stopDraw}
                        onMouseLeave={stopDraw}
                        onTouchStart={startDraw}
                        onTouchMove={draw}
                        onTouchEnd={stopDraw}
                    />
                )}
            </div>
        </SectionShell>
    );
};

const styles = {
    clearButton: { minHeight: "44px", minWidth: "80px", padding: "0.5rem 1rem", border: "2px solid #1f2937", borderRadius: "8px", backgroundColor: "#e5e7eb", color: "#111111", fontWeight: "700", cursor: "pointer", fontSize: "1rem" },
    colorRow: { display: "flex", gap: "0.75rem", padding: "0.75rem 1rem", backgroundColor: "#f9fafb", borderBottom: "2px solid #e5e7eb", flexWrap: "wrap", flexShrink: 0 },
    canvasWrap: { flex: 1, position: "relative", minHeight: "300px" },
    canvas: { display: "block", backgroundColor: "#ffffff", touchAction: "none" }
};