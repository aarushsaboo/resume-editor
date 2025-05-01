import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ResumeEditor from './pages/ResumeWorkspace/ResumeWorkspace';
import Insights from './pages/Insights/Insights';
import Features from './pages/Features/Features';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-editor" element={<ResumeEditor />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/features" element={<Features />} />


        {/* Add more routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
