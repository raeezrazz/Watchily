import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './pages/Auth';
import './App.css'
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { VideosPage } from './pages/Videos';
import { AddVideoPage } from './pages/AddVideoPage';
import { VideoDetailsPage } from './pages/VideoDetails';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';


function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
      <Route path="/auth" element={ <PublicRoute><Auth /></PublicRoute>}/>

        <Route path='/' element={<ProtectedRoute><MainLayout><Home/></MainLayout> </ProtectedRoute>}/>
        <Route path='/videos' element={<ProtectedRoute><MainLayout><VideosPage/></MainLayout> </ProtectedRoute>}/>
        <Route path='/add-video' element={<ProtectedRoute><MainLayout><AddVideoPage/></MainLayout></ProtectedRoute> }/>
        <Route path="/video/:id" element={<ProtectedRoute><MainLayout><VideoDetailsPage /></MainLayout></ProtectedRoute>} />

{/* 
        <Route element={<MainLayout/>}>

        </Route> */}
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
