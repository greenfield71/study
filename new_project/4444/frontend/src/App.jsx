import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './Login'
import Home from './Home'

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<h1>404</h1>} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
