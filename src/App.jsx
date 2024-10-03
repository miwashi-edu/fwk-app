import React, { useState } from 'react';
import config from './config';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(config.BACKEND_URL);
      const response = await fetch(config.BACKEND_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setError(null);
  };

  return (
      <div className="App">
        <h1>Backend Data Fetcher</h1>

        {/* Fetch Data Button */}
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>

        {/* Clear Button */}
        <button onClick={clearData} disabled={loading} style={{ marginLeft: '10px' }}>
          Clear
        </button>

        {/* Error Display */}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {/* Data Display */}
        {data && (
            <pre style={{ textAlign: 'left', margin: '20px', padding: '10px', border: '1px solid #ddd' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
        )}
      </div>
  );
}

export default App;
