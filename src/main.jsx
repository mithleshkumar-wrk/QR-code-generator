import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import 'remixicon/fonts/remixicon.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} /> {/* shows Home at "/" */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
