import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/pages/Home'
import CheckOut from './components/pages/CheckOut'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/checkout' element={<CheckOut />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
