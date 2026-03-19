import { HashRouter, Routes, Route, BrowserRouter } from 'react-router-dom'
import LandingPage from './LandingPage'
import Login from './Login'
import Signup from './Signup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shopsmart" element={<LandingPage />} />
        <Route path="/shopsmart/" element={<LandingPage />} />
        <Route path="/shopsmart/login" element={<Login />} />
        <Route path="/shopsmart/login/" element={<Login />} />
        <Route path="/shopsmart/signup" element={<Signup />} />
        <Route path="/shopsmart/signup/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
