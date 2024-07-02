import './App.css'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Details from './pages/Details'
import Edit from './pages/Edit'
import NavBar from './pages/NavBar'
function App() {
  return (
    <div>
      <NavBar/>
      <div className="p-4">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/details/:id' element={<Details/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App
