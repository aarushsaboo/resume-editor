import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ResumeEditor from './pages/ResumeWorkspace/ResumeWorkspace';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-editor" element={<ResumeEditor />} />


        {/* Add more routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
