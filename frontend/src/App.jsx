import { useState } from 'react'
import './App.css'
// import Navbar from './components/Navbar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
       <Route path='/' element = {<Login/>} /> 
       <Route path='/signUp' element = {<SignUp/>} />
       <Route path='/Home' element = {<HomePage/>} />
       <Route path = '*' element = {<h2> Page Not Found buddy</h2>} />
     </Routes>
    </>
  );
}

export default App
