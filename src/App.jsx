import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Otheruser from './pages/otheruser'
import Home from './pages/home'
import Profile from './pages/profile'
import Signup from './pages/signup'
import Login from './pages/login'
import Filmpage from './pages/filmpage'
import axios from 'axios'
import Footer from './components/footer'
import Nav from './components/nav'
import './App.css'

function App() {
  const [films, setFilms] = useState([])
  const[filteredFilms,setFilteredFilms]=useState([])
  const updateFilms = (updatedFilms) => {
    setFilteredFilms(updatedFilms)
  }
  useEffect(() => {
    axios.get('https://ghibliapibase.fly.dev/films')
      .then(res => {
        setFilms(res.data)
        setFilteredFilms(res.data)
      })
      .catch(err => {
        console.log(err, 'err')
      })
  }, [])
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home updateFilms={updateFilms} films={films} setFilms={setFilms} filteredFilms={filteredFilms} setFilteredFilms={setFilteredFilms}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/film/:id' element={<Filmpage />} />
        <Route path='/user/:userId' element={<Otheruser />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
