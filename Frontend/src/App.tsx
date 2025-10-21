import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './pages/Auth';
import './App.css'

function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
