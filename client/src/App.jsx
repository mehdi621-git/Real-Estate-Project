import './App.css'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './Components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoot from './pages/PrivateRoot'
import Listing from './pages/Listing'
import ViewList from './pages/ViewList'
import SearchResult from './pages/SearchResult'



function App() {
 

  return (
    <>
<BrowserRouter>
<Header></Header>
<Routes>
  <Route path='/' element={<Home></Home>}>  </Route>
  <Route path='/sign-in' element={<Login></Login>}></Route>
  <Route path='/sign-up' element={<Signup></Signup>}></Route>
 <Route element={<PrivateRoot></PrivateRoot>}>
  <Route path='/profile' element={<Profile></Profile>}></Route>
</Route>
  <Route path='/about' element={<About></About>}></Route>
  <Route path='/newListing' element={<Listing></Listing>}></Route>
  <Route path='/updateListing/:id' element={<Listing></Listing>}></Route>
  <Route path='/property-listing/:id' element={<ViewList></ViewList>}></Route>
  <Route path='/search' element={<SearchResult></SearchResult>}></Route>







</Routes>
</BrowserRouter>
    </>
  )
}

export default App
