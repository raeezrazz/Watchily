import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './pages/Auth';
import './App.css'
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { VideosPage } from './pages/Videos';
import { AddVideoPage } from './pages/AddVideoPage';

function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path='/' element={<MainLayout><Home/></MainLayout> }/>
        <Route path='/videos' element={<MainLayout><VideosPage/></MainLayout> }/>
        <Route path='/add-video' element={<MainLayout><AddVideoPage/></MainLayout> }/>


{/* 
        <Route element={<MainLayout/>}>

        </Route> */}
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
