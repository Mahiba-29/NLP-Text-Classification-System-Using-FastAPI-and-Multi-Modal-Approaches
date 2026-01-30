import Classifier from "./classifier";
import "./styles.css";

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>NLP Text Classification Dashboard</h1>
        <p>FastAPI · Transformers · Traditional NLP</p>
      </header>

      <main className="main-content">
        <Classifier />
      </main>

      <footer className="footer">
        © 2026 NLP Classification System
      </footer>
    </div>
  );
}

export default App;
