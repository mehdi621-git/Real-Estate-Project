import './App.css'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './Components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'



function App() {
 

  return (
    <>
<BrowserRouter>
<Header></Header>
<Routes>
  <Route path='/' element={<Home></Home>}>  </Route>
  <Route path='/sign-in' element={<Login></Login>}></Route>
  <Route path='/sign-up' element={<Signup></Signup>}></Route>
  <Route path='/profile' element={<Profile></Profile>}></Route>
  <Route path='/about' element={<About></About>}></Route>




</Routes>
</BrowserRouter>
    </>
  )
}

export default App
