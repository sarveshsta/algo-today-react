import React, { useEffect, useState, useRef } from 'react';
import './LogViewer.css';

const BACKEND_URL = process.env.REACT_APP_FAST_BACKEND_URL;

export function LogViewer() {
  const [logs, setLogs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const logsEndRef = useRef(null);
  const logContainerRef = useRef(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  useEffect(() => {
    const ws = new WebSocket(`${BACKEND_URL}/ws/logs`);
    
    ws.onopen = () => {
      setIsConnected(true);
      setConnectionStatus('Connected');
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      setLogs((prevLogs) => [...prevLogs, event.data]);
      console.log("event data", event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
      setConnectionStatus('Connection Error');
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
      setIsConnected(false);
      setConnectionStatus('Disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  const formatTimestamp = () => {
    return new Date().toLocaleTimeString();
  };

  return (
    <div className="log-viewer-container">
      <div className="log-viewer-header">
        <div className="header-left">
          <h2 className="log-title">
            <span className="log-icon"></span>
            Live Strategy Logs
          </h2>
          <div className="log-stats">
            <span className="log-count">{logs.length} entries</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            <div className="status-indicator"></div>
            <span className="status-text">{connectionStatus}</span>
          </div>
          
          <button 
            className="clear-button" 
            onClick={clearLogs}
            title="Clear all logs"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="log-content" ref={logContainerRef}>
        <div className="log-entries">
          {logs.length === 0 ? (
            <div className="no-logs">
              <div className="no-logs-icon">⏳</div>
              <p>Waiting for logs...</p>
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="log-entry">
                <span className="log-timestamp">[{formatTimestamp()}]</span>
                <span className="log-message">{log}</span>
              </div>
            ))
          )}
          <div ref={logsEndRef} />
        </div>
      </div>

      <div className="log-footer">
        <div className="footer-info">
          <span>Auto-scroll enabled</span>
          <span>•</span>
          <span>Real-time updates</span>
        </div>
      </div>
    </div>
  );
}