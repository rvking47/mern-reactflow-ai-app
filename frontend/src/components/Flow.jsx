import React, { useState, useCallback } from 'react'
import InputNode from './node/InputNode'
import ResultNode from './node/ResultNode'
import api from '../services/api';
import ReactFlow, { Controls, Background } from 'reactflow';
import "reactflow/dist/style.css";

const nodeTypes = {
    inputNode: InputNode,
    resultNode: ResultNode,
};

const initialEdges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
];

const Flow = () => {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const nodes = React.useMemo(() => [
        {
            id: "1",
            type: "inputNode",
            position: { x: 100, y: 100 },
            data: { prompt, onChange: setPrompt },
        },
        {
            id: "2",
            type: "resultNode",
            position: { x: 400, y: 100 },
            data: { result },
        },
    ], [prompt, result]);

    const runFlow = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt");
            return;
        }

        setLoading(true);
        setError("");
        setResult("");

        try {
            const res = await api.post("/ai/ask", { prompt });
            setResult(res.data.answer);
        } catch (err) {
            console.error(err);
            setError("Failed to get AI response. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const saveToDB = async () => {
        if (!prompt || !result) {
            setError("Please run the flow first");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await api.post("/chat/save", {
                prompt,
                response: result
            });
            if (res.status === 201) {
                alert("Saved to database successfully");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to save to database");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ height: "100vh", width: "100%", position: "relative" }}>
            <div style={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 10,
                display: "flex",
                gap: "10px",
                flexDirection: "column"
            }}>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        onClick={runFlow}
                        disabled={loading || !prompt.trim()}
                        style={{
                            padding: "8px 16px",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading || !prompt.trim() ? 0.6 : 1
                        }}
                    >
                        {loading ? "Processing..." : "Run Flow"}
                    </button>
                    <button
                        onClick={saveToDB}
                        disabled={loading || !result}
                        style={{
                            padding: "8px 16px",
                            cursor: loading || !result ? "not-allowed" : "pointer",
                            opacity: loading || !result ? 0.6 : 1
                        }}
                    >
                        Save to DB
                    </button>
                </div>
                {error && (
                    <div style={{
                        background: "#fee",
                        color: "#c00",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        fontSize: "14px"
                    }}>
                        {error}
                    </div>
                )}
            </div>

            <ReactFlow
                nodes={nodes}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    )
}

export default Flow