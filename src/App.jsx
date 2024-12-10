import { HashRouter as Router, Routes, Link } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import OrderOnline from './pages/OrderOnline';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <ToastProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Link path="/" element={<Home />} />
              <Link path="/about" element={<About />} />
              <Link path="/menu" element={<Menu />} />
              <Link path="/reservations" element={<Reservations />} />
              <Link path="/order-online" element={<OrderOnline />} />
              <Link path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
