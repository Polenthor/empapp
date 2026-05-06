import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import View from './components/View'
import { Route, Routes } from 'react-router-dom'
import Add from './components/Add'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Upload from './components/Upload'
import ImageD from './components/ImageD'
import Cart from './components/Cart'
import About from './components/About'
import Categories from './components/Categories'
import Contact from './components/Contact'
import AdminMessages from './components/AdminMessages'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>

        <Route
          path="/jojo"
          element={
            <ProtectedRoute>

            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
           <Home/>
          }
        />

        <Route
          path="/view"
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/imgd' element={<ImageD />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About/>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/admin/messages" element={<AdminMessages />} />


      </Routes>









    </>
  )
}

export default App
