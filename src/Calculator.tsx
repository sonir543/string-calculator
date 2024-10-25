import React, { useState } from 'react';
import { add } from './StringCalculator';
import './Calculator.css'; // Import CSS file for styles

const Calculator: React.FC = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = () => {
        try {
            setError(null);
            const sum = add(input);
            setResult(sum);
            setInput(""); // Reset the input after calculation
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
            setResult(null);
        }
    };

    return (
        <div className="calculator-wrapper">
            <div className="calculator-container">
                <h1>String Calculator</h1>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter numbers (e.g., 1,2,3)"
                    aria-label="Input for numbers"
                    className="calculator-input"
                />
                <button onClick={handleCalculate} className="calculator-button">Calculate</button>
                {result !== null && <h2 className="result">Result: {result}</h2>}
                {error && <h2 className="error">{error}</h2>}
            </div>
        </div>
    );
};

export default Calculator;
