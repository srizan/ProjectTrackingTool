import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProjectList  from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import AddProject from './components/AddProject';
import './App.css'

function App() {
  

  return (
   
    <Router>
       <div className="App">
        <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/add-project" element={<AddProject />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
