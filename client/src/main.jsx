import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ThemeProvider } from "@mui/material";
import {ThemeOptions} from './services/MUI_Theme'
import CssBaseline from "@mui/material/CssBaseline";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Router>
    <ThemeProvider theme={ThemeOptions} >
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Router>
  // </React.StrictMode>,
)
