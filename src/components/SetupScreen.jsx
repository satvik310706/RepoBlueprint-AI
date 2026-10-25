import { useState, useEffect } from 'react';
import '../styles/globals.css';
import './SetupScreen.css';

const OLLAMA_PRESETS = [
  { id: 'llama3.2:3b', label: 'Llama 3.2 · 3B', desc: 'Ultra-fast, lightweight — runs on all PCs' },
  { id: 'gemma3:27b', label: 'Gemma 3 · 27B', desc: 'Google flagship — premier technical reasoning' },
  { id: 'gemma3:12b', label: 'Gemma 3 · 12B', desc: 'High speed, balanced memory footprint' },
  { id: 'mistral:7b', label: 'Mistral · 7B', desc: 'Fast, lightweight instruction following' },
];

const GEMINI_MODELS = [
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', desc: 'Fast & capable, best for most tasks' },
  { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', desc: 'Most intelligent Gemini model' },
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', desc: 'Stable, highly reliable' },
];

const CAPABILITIES = [
  { icon: '🎨', title: 'Napkin Whiteboard', desc: 'Draw your architecture, we parse it' },
  { icon: '🎙️', title: 'Voice Dictation', desc: 'Speak your idea in any language' },
  { icon: '📸', title: 'Vision Upload', desc: 'Snap your whiteboard, we decode it' },
  { icon: '🗺️', title: 'Architecture Diagrams', desc: 'Mermaid.js topology, interactive' },
  { icon: '📦', title: 'Starter Repo .zip', desc: 'Download real, working boilerplate' },
  { icon: '💰', title: 'Cost Calculator', desc: 'Cloud cost from 500 to 100k DAU' },
];

export default function SetupScreen({ onComplete }) {
  const [provider, setProvider] = useState(() => import.meta.env?.VITE_DEFAULT_PROVIDER || 'ollama');
  const [geminiKey, setGeminiKey] = useState(() => import.meta.env?.VITE_GEMINI_API_KEY || '');
  const [geminiModel, setGeminiModel] = useState(() => import.meta.env?.VITE_GEMINI_MODEL || 'gemini-2.5-flash');
  const [ollamaUrl, setOllamaUrl] = useState(() => import.meta.env?.VITE_OLLAMA_URL || 'http://localhost:11434');
  const [ollamaModel, setOllamaModel] = useState(() => import.meta.env?.VITE_OLLAMA_MODEL || 'llama3.2:3b');
  const [customModel, setCustomModel] = useState('');
  const [keyError, setKeyError] = useState('');
  const [ollamaConnected, setOllamaConnected] = useState(false);
  const [detectedModels, setDetectedModels] = useState([]);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const checkOllama = async () => {
      setChecking(true);
      try {
        const res = await fetch('/ollama/api/tags');
        if (res.ok) {
          const data = await res.json();
          const models = (data.models || []).map(m => m.name);
          setDetectedModels(models);
          setOllamaConnected(true);
          if (models.length > 0) setOllamaModel(models[0]);
        }
      } catch {}
      setChecking(false);
    };
    checkOllama();
  }, []);

  const handleLaunch = () => {
    if (provider === 'gemini' && geminiKey.trim().length < 10) {
      setKeyError('Please enter a valid Gemini API key (get one free at aistudio.google.com).');
      return;
    }
    setKeyError('');
    onComplete({
      provider,
      geminiKey: provider === 'gemini' ? geminiKey.trim() : '',
      geminiModel: provider === 'gemini' ? geminiModel : '',
      ollamaUrl: provider === 'ollama' ? ollamaUrl.trim() : '',
      ollamaModel: provider === 'ollama' ? (customModel.trim() || ollamaModel) : '',
      isDemo: provider === 'demo',
    });
  };

  const handleInstantDemo = () => {
    onComplete({ provider: 'demo', isDemo: true, geminiKey: '', geminiModel: 'gemini-2.5-flash', ollamaUrl: '', ollamaModel: '' });
  };

  return (
    <div className="setup-editorial">
      {/* Left column: App intro */}
      <div className="setup-intro-col">
        <div className="setup-brand-mark">
          <div className="setup-logo-ring">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="setup-brand-name">RepoBlueprint</span>
        </div>

        <h1 className="setup-headline">
          Turn any napkin idea into a production-ready repo.
        </h1>
        <p className="setup-sub">
          Sketch, speak, or type your project concept. Our AI architecture co-founder builds you a complete blueprint — tech stack, Mermaid diagrams, cost analysis, and downloadable starter code.
        </p>

        <div className="setup-capabilities-grid">
          {CAPABILITIES.map((cap) => (
            <div key={cap.title} className="cap-item">
              <span className="cap-icon">{cap.icon}</span>
              <div>
                <div className="cap-title">{cap.title}</div>
                <div className="cap-desc">{cap.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="setup-demo-cta">
          <p className="setup-demo-note">Want to explore without any setup?</p>
          <button
            type="button"
            id="instant-demo-btn"
            className="btn btn-secondary setup-demo-btn"
            onClick={handleInstantDemo}
          >
            Try Instant Demo →
          </button>
        </div>
      </div>

      {/* Right column: Engine selection */}
      <div className="setup-engine-col">
        <div className="setup-engine-card card">
          <h2 className="setup-engine-title">Choose AI Engine</h2>
          <p className="setup-engine-sub">Select how RepoBlueprint synthesizes your architecture.</p>

          {/* Provider Selection */}
          <div className="provider-options" role="radiogroup" aria-label="Choose AI Engine">
            {/* Ollama */}
            <div
              role="radio"
              aria-checked={provider === 'ollama'}
              tabIndex={0}
              className={`provider-option ${provider === 'ollama' ? 'is-selected' : ''}`}
              onClick={() => setProvider('ollama')}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setProvider('ollama');
                }
              }}
              id="select-ollama-btn"
              aria-label="Local Ollama AI Engine"
            >
              <div className="provider-option-header">
                <span className="provider-icon">🦙</span>
                <div className="provider-info">
                  <div className="provider-name">
                    Local Ollama
                    {ollamaConnected && <span className="connected-badge">● Connected</span>}
                    {checking && <span className="checking-badge">Checking…</span>}
                  </div>
                  <div className="provider-tagline">100% private, runs on your PC</div>
                </div>
                <div className="provider-radio">
                  <div className={`radio-dot ${provider === 'ollama' ? 'is-active' : ''}`} />
                </div>
              </div>
              {provider === 'ollama' && (
                <div className="provider-config" onClick={e => e.stopPropagation()}>
                  <div className="config-section-title">Select Model</div>
                  <div className="model-grid">
                    {(ollamaConnected && detectedModels.length > 0 ? detectedModels.map(m => ({ id: m, label: m, desc: 'Installed on your PC' })) : OLLAMA_PRESETS).map(preset => (
                      <button
                        key={preset.id}
                        type="button"
                        className={`model-chip ${ollamaModel === preset.id ? 'is-selected' : ''}`}
                        onClick={() => { setOllamaModel(preset.id); setCustomModel(''); }}
                        aria-label={`Select ${preset.label || preset.id}`}
                      >
                        <span className="model-chip-name">{preset.label || preset.id}</span>
                        <span className="model-chip-desc">{preset.desc || ''}</span>
                      </button>
                    ))}
                  </div>
                  <div className="config-field">
                    <label htmlFor="ollama-url-input" className="config-label">Ollama Server URL</label>
                    <input
                      id="ollama-url-input"
                      type="text"
                      className="config-input"
                      value={ollamaUrl}
                      onChange={e => setOllamaUrl(e.target.value)}
                      placeholder="http://localhost:11434"
                      aria-label="Ollama Server URL"
                    />
                  </div>
                  {ollamaConnected && (
                    <div className="ollama-status-badge">
                      <span className="status-dot-green" />
                      Ollama connected · {detectedModels.length} model{detectedModels.length !== 1 ? 's' : ''} found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Gemini */}
            <div
              role="radio"
              aria-checked={provider === 'gemini'}
              tabIndex={0}
              className={`provider-option ${provider === 'gemini' ? 'is-selected' : ''}`}
              onClick={() => setProvider('gemini')}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setProvider('gemini');
                }
              }}
              id="select-gemini-btn"
              aria-label="Google Gemini AI Engine"
            >
              <div className="provider-option-header">
                <span className="provider-icon">✨</span>
                <div className="provider-info">
                  <div className="provider-name">Google Gemini</div>
                  <div className="provider-tagline">Most powerful multimodal — Vision + Code</div>
                </div>
                <div className="provider-radio">
                  <div className={`radio-dot ${provider === 'gemini' ? 'is-active' : ''}`} />
                </div>
              </div>
              {provider === 'gemini' && (
                <div className="provider-config" onClick={e => e.stopPropagation()}>
                  <div className="config-section-title">Model</div>
                  <div className="model-grid">
                    {GEMINI_MODELS.map(m => (
                      <button
                        key={m.id}
                        type="button"
                        className={`model-chip ${geminiModel === m.id ? 'is-selected' : ''}`}
                        onClick={() => setGeminiModel(m.id)}
                        aria-label={`Select model ${m.label}`}
                      >
                        <span className="model-chip-name">{m.label}</span>
                        <span className="model-chip-desc">{m.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="config-field">
                    <label htmlFor="gemini-key-input" className="config-label">
                      API Key
                      <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="config-label-link">Get free key →</a>
                    </label>
                    <input
                      id="gemini-key-input"
                      type="password"
                      className={`config-input ${keyError ? 'has-error' : ''}`}
                      value={geminiKey}
                      onChange={e => { setGeminiKey(e.target.value); setKeyError(''); }}
                      placeholder="AIza..."
                      autoComplete="off"
                      aria-label="Google Gemini API Key"
                    />
                    {keyError && <p className="config-error">{keyError}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Demo */}
            <div
              role="radio"
              aria-checked={provider === 'demo'}
              tabIndex={0}
              className={`provider-option ${provider === 'demo' ? 'is-selected' : ''}`}
              onClick={() => setProvider('demo')}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setProvider('demo');
                }
              }}
              id="select-demo-btn"
              aria-label="Instant Demo Sandbox AI Engine"
            >
              <div className="provider-option-header">
                <span className="provider-icon">⚡</span>
                <div className="provider-info">
                  <div className="provider-name">Instant Demo Sandbox</div>
                  <div className="provider-tagline">Pre-configured, no setup required</div>
                </div>
                <div className="provider-radio">
                  <div className={`radio-dot ${provider === 'demo' ? 'is-active' : ''}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Launch CTA */}
          <button
            type="button"
            id="launch-btn"
            className="btn btn-primary setup-launch-btn"
            onClick={handleLaunch}
          >
            {provider === 'ollama'
              ? `Launch with Ollama (${customModel || ollamaModel})`
              : provider === 'gemini'
                ? `Launch with Gemini`
                : `Launch Instant Demo`}
            <span className="launch-arrow">→</span>
          </button>

          <p className="setup-privacy-note">
            {provider === 'ollama'
              ? '🔒 All data stays on your machine. Zero telemetry.'
              : provider === 'gemini'
                ? '🔑 Your API key is stored locally and never sent to our servers.'
                : '⚡ Evaluating for a hackathon? This option provides full blueprint without any API key.'}
          </p>
        </div>
      </div>
    </div>
  );
}
