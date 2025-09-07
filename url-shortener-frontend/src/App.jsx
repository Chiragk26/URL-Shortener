import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import Navbar from './components/navbar'
import Footer from './components/Footer';
import RegisterPage from './components/RegisterPage';

function App() {

  return (
  <Router>
    <Navbar />
  <Routes>
    <Route path='/' element={<LandingPage />}></Route>
    <Route path='/about' element={<AboutPage />}></Route>
    <Route path='/register' element={<RegisterPage />}></Route>
    </Routes>
     <Footer />
    </Router>
   
  )
}

export default App
