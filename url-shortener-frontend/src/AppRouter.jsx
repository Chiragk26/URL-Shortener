import ShortenUrlPage from "./components/ShortenUrlPage";
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import Navbar from './components/navbar'
import Footer from './components/Footer';
import RegisterPage from './components/RegisterPage';
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/LoginPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";

const AppRouter = () => {
  const hideHeaderFooter = location.pathname.startsWith("/s");
    return (
        <>
        {!hideHeaderFooter && <Navbar /> }
        <Toaster position='bottom-center'/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/s/:url" element={<ShortenUrlPage />} />

          <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
          <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />
          
          <Route path="/dashboard" element={ <PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
          <Route path="/error" element={ <ErrorPage />} />
          <Route path="*" element={ <ErrorPage message="PAGE NOT FOUND."/>} />
        </Routes>
        {!hideHeaderFooter && <Footer />}
      </>
    );
}
export default AppRouter;