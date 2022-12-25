import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './home/component';
import Applications from './applications';
import CreateProject from './create-project';
import Deploy from './deploy';
import { Deployment } from './deploy';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import sideNavigationLinks from './navigation/navigation-links';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material';


const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider
     theme={theme}
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
