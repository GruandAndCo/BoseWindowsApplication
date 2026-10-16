import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import './AncButton.css'

type AncMode = "quiet" | "aware" | "immersion";

interface ModeConfig {
    key: AncMode;
    label: string;
}

const MODES: ModeConfig[] = [
    { key: "quiet", label: "Quiet" },
    { key: "aware", label: "Aware" },
    { key: "immersion", label: "Immersion" },
];

export default function AncButton() {
    const [mode, setMode] = useState<AncMode | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMode() {
            setLoading(true);
            try {
                const currentMode = await invoke<AncMode>("get_current_mode");
                setMode(currentMode);
            } catch (err) {
                setError(typeof err === "string" ? err : "Liaison au module audio interrompue");
            } finally {
                setLoading(false);
            }
        }
        fetchMode();
    }, []);

    async function handleSetMode(targetMode: AncMode) {
        if (loading || mode === targetMode) return;

        setLoading(true);
        setError(null);
        try {
            await invoke("set_anc_mode", { mode: targetMode });
            setMode(targetMode);
        } catch (err) {
            setError(typeof err === "string" ? err : `Commande non honorée : ${targetMode}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="anc-selector-container">
            <div className="anc-button-group">
                {MODES.map(({ key, label }) => {
                    const isActive = mode === key;
                    return (
                        <button
                            key={key}
                            onClick={() => handleSetMode(key)}
                            disabled={loading || isActive}
                            className={`anc-btn ${isActive ? "active" : ""}`}
                        >
                            <div className="anc-btn-content">
                                <span className="anc-btn-title">MODE {label.toUpperCase()}</span>
                            </div>
                            <span className={`anc-indicator ${isActive ? "active" : ""}`} />
                        </button>
                    );
                })}
            </div>

            {error && <p role="alert" className="anc-error">{error}</p>}
        </div>
    );
}