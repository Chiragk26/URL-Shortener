import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import Navbar from './components/navbar'
import Footer from './components/Footer';
import RegisterPage from './components/RegisterPage';
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/LoginPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';

function App() {

  return (
  <Router>
    <Navbar />
    <Toaster position='bottom-center'/>
  <Routes>
    <Route path='/' element={<LandingPage />}></Route>
    <Route path='/about' element={<AboutPage />}></Route>
    <Route path='/register' element={<RegisterPage />}></Route>
    <Route path='/login' element={<LoginPage />}></Route>
    <Route path='/dashboard' element={<DashboardLayout />}></Route>
    </Routes>
     <Footer />
    </Router>
   
  )
}

export default App
