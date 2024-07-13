import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';

const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
  </Router>
)

function App() {
  return (
    <>
      {routes}
    </>
  )
}

export default App