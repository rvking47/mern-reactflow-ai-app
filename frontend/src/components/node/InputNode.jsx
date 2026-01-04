import { Handle, Position } from "reactflow";

const InputNode = ({ data }) => {
    return (
        <div style={{ 
            padding: 12, 
            border: "2px solid #4a90e2", 
            borderRadius: 8,
            width: 250,
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
            <div style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: 8,
                color: "#4a90e2"
            }}>
                <strong>Input Prompt</strong>
            </div>
            <textarea
                style={{ 
                    width: "93%", 
                    minHeight: 80,
                    padding: 8,
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    fontSize: 14,
                    fontFamily: "inherit",
                    resize: "vertical"
                }}
                value={data.prompt}
                onChange={(e) => data.onChange(e.target.value)}
                placeholder="Enter your prompt here..."
            />
            <div style={{ 
                fontSize: 11, 
                color: "#888", 
                marginTop: 4 
            }}>
                {data.prompt.length} characters
            </div>
            <Handle 
                type="source" 
                position={Position.Right}
                style={{ 
                    background: "#4a90e2",
                    width: 12,
                    height: 12
                }}
            />
        </div>
    )
}

export default InputNode