import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/homepage' element={<HomePage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
