
import About from './About.jsx';
import Home from './Home.jsx';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";



import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



function App() {



  return (



    <Router>


      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
