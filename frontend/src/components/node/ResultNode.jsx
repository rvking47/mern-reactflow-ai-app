import { Handle, Position } from 'reactflow'

const ResultNode = ({ data }) => {
    const hasResult = data.result && data.result.trim();

    return (
        <div style={{
            padding: 12,
            border: `2px solid ${hasResult ? "#52c41a" : "#ccc"}`,
            borderRadius: 8,
            width: 300,
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                color: hasResult ? "#52c41a" : "#666"
            }}>
                <strong>AI Response</strong>
            </div>
            <div style={{
                marginTop: 5,
                minHeight: 80,
                maxHeight: 200,
                overflowY: "auto",
                padding: 8,
                background: hasResult ? "#f6ffed" : "#f9f9f9",
                border: "1px solid #eee",
                borderRadius: 4,
                fontSize: 14,
                lineHeight: 1.5,
                color: hasResult ? "#333" : "#999",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
            }}>
                {data.result || "AI response will appear here..."}
            </div>
            {hasResult && (
                <div style={{
                    fontSize: 11,
                    color: "#888",
                    marginTop: 4
                }}>
                    {data.result.length} characters
                </div>
            )}
            <Handle
                type="target"
                position={Position.Left}
                style={{
                    background: hasResult ? "#52c41a" : "#ccc",
                    width: 12,
                    height: 12
                }}
            />
        </div>
    )
}

export default ResultNode