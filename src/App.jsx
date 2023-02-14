import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Otheruser from './pages/otheruser'
import Home from './pages/home'
import Profile from './pages/profile'
import Signup from './pages/signup'
import Login from './pages/login'
import Filmpage from './pages/filmpage'
import Nav from './components/nav'
import './App.css'

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/film/:id' element={<Filmpage />} />
        <Route path='/user/:userId' element={<Otheruser />} />
      </Routes>
    </div>
  )
}

export default App
