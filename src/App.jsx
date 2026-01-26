import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from "./pages/Hero";
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import React from 'react';


function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;