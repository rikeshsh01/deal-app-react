import React from "react";
import { createRoot } from 'react-dom/client';

import "./styles/index.css";
import App from "./components/App";

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App/>)