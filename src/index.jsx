import React from "react";
import { createRoot } from "react-dom/client"; // Ganti dari 'react-dom' ke 'react-dom/client'
import App from "./App";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container); // React 18+
root.render(<App />);
