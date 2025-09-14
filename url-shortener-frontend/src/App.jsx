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
  <div className="flex flex-col min-h-screen">
    {/* Navbar always on top */}
    <Navbar />

    {/* Main content grows to fill remaining space */}
    <main className="flex-1 overflow-auto">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </main>

    {/* Footer always at bottom */}
    <Footer />
  </div>

  <Toaster position="bottom-center" />
</Router>


   
  )
}

export default App
