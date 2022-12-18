import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Home from './home/component';
import Applications from './applications';
import CreateProject from './create-project';
import Deploy from './deploy';
import { Deployment } from './deploy';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import sideNavigationLinks from './navigation/navigation-links';

function App() {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"  
    >
      <BrowserRouter>
        <Routes>
          <Route path={sideNavigationLinks().home.link} element={<Home />} />
          <Route path={sideNavigationLinks().applications.link} element={<Applications />} />
          <Route path={sideNavigationLinks().createNewProject.link} element={<CreateProject />} />
          <Route path={sideNavigationLinks().deploy.link} element={<Deploy />} />
          <Route path={sideNavigationLinks().deployment.link} element={<Deployment />} />
        </Routes>
      </BrowserRouter>

     </ThemeProvider>
  );
}

export default App;
