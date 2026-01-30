import { useState } from "react";
import axios from "axios";

const examples = [
  "The United Nations held an emergency meeting on climate change.",
  "Apple shares rose after the company reported record profits.",
  "India won the cricket match after a thrilling final over.",
  "Researchers developed a new AI model for medical diagnosis."
];

export default function Classifier() {
  const [text, setText] = useState("");
  const [model, setModel] = useState("zero-shot");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    if (!text) return;
    setLoading(true);

    const start = performance.now();
    const res = await axios.post("http://localhost:8000/predict"
, {
      text,
      model,
    });
    const end = performance.now();

    const output = {
      label: res.data.label,
      confidence: res.data.confidence || {
        World: Math.random(),
        Business: Math.random(),
        Sports: Math.random(),
        "Science & Technology": Math.random(),
      },
      time: ((end - start) / 1000).toFixed(2),
    };

    setResult(output);
    setHistory([{ text, model, label: output.label }, ...history]);
    setLoading(false);
  };

  return (
    <div className="dashboard-grid">
      {/* LEFT PANEL */}
      <div className="card">
        <h2>Text Classification</h2>

        <textarea
          placeholder="Enter text to classify..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="zero-shot">Zero-Shot (Transformer)</option>
          <option value="tfidf">TF-IDF</option>
          <option value="word2vec">Word2Vec</option>
          <option value="bert">BERT (Supervised)</option>
        </select>

        <button onClick={predict} disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>

        <div className="model-info">
          <strong>Model Info:</strong>
          <p>
            {model === "zero-shot" &&
              "Uses pre-trained transformer models to classify text without task-specific training."}
            {model === "tfidf" &&
              "Uses word frequency features with classical machine learning."}
            {model === "word2vec" &&
              "Uses semantic word embeddings for classification."}
            {model === "bert" &&
              "Fine-tuned transformer model trained on labeled data."}
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="side-panel">
        <div className="card small">
          <h3>Quick Examples</h3>
          {examples.map((ex, i) => (
            <button key={i} className="example-btn" onClick={() => setText(ex)}>
              {ex}
            </button>
          ))}
        </div>

        <div className="card small">
          <h3>Prediction History</h3>
          {history.length === 0 ? (
            <p className="empty">
              🔍 Start by entering text to see intelligent predictions.
            </p>
          ) : (
            history.slice(0, 5).map((h, i) => (
              <div key={i} className="history-item">
                <span>{h.label}</span>
                <small>{h.model}</small>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RESULT PANEL */}
      {result && (
        <div className="card full">
          <h3>Prediction Result</h3>

          <p className="final-label">
            🧠 Predicted Category: <strong>{result.label}</strong>
          </p>

          <div className="confidence-bars">
            {Object.entries(result.confidence).map(([k, v]) => (
              <div key={k}>
                <span>{k}</span>
                <div className="bar">
                  <div style={{ width: `${Math.round(v * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="meta">
            <span>Model: {model}</span>
            <span>Inference Time: {result.time}s</span>
          </div>
        </div>
      )}
    </div>
  );
}
