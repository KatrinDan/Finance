import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './app/router';
import "./index.css";
import "./App.css";

function App() {
  return (
    <Router />
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
