import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'reset-css/reset.css'
// import 'normalize.css'

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/roboto-flex/index.css';
import '@fontsource/rubik-mono-one/index.css';

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
