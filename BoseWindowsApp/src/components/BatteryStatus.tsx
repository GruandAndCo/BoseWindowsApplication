import { Card, Text } from "@gruand-co/core";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export default function BatterySection() {
    const [battery, setBattery] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBattery() {
            setLoading(true);
            setError(null);
            try {
                const currentLevel: number = await invoke("get_battery_level");
                setBattery(currentLevel);
            } catch (err) {
                setError(typeof err === "string" ? err : "Liaison au module audio interrompue");
            } finally {
                setLoading(false);
            }
        }
        fetchBattery();
    }, []);

    const isLow = battery !== null && battery <= 20;
    const barColor = isLow ? "#c94a4a" : "#c5a059";

    return (
        <Card
            elevation="none"
            hoverable={false}
            style={{ background: "transparent", border: "none", boxShadow: "none" }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <Text variant="small" style={{ letterSpacing: "0.2em", color: "rgba(197, 160, 89, 0.75)", textTransform: "uppercase" }}>
                    Autonomie Batterie
                </Text>
                <Text variant="serif" style={{ fontSize: "1.2rem", fontWeight: 600, color: "#e4e4e7" }}>
                    {loading ? "-- %" : battery !== null ? `${battery.toFixed(0)}%` : "N/A"}
                </Text>
            </div>

            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "6px",
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(197, 160, 89, 0.2)",
                    borderRadius: "1px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: battery !== null ? `${Math.min(Math.max(battery, 0), 100)}%` : "0%",
                        backgroundColor: isLow ? "#c94a4a" : "#c5a059",
                        boxShadow: isLow ? "0 0 8px rgba(201, 74, 74, 0.4)" : "0 0 8px rgba(197, 160, 89, 0.3)",
                        transition: "width 0.5s ease",
                    }}
                />
            </div>
        </Card>
    );
}