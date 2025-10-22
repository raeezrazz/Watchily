import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './pages/Auth';
import './App.css'
import { MainLayout } from './layouts/MainLayout';

function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path='/' element={<MainLayout/>}/>
{/* 
        <Route element={<MainLayout/>}>

        </Route> */}
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
