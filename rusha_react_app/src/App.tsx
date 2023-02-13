import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './home/component';
import Applications from './applications';
import CreateProject from './create-project';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import links from './navigation/navigation-links';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material';
import CreateApplication  from './createApplication';


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
          <Route path={links().home.link} element={<Home />} />
          <Route path={links().createNewProject.link} element={<CreateProject />} />
          <Route path={links().deployment.link} element={<CreateApplication />} />
        </Routes>
      </BrowserRouter>

     </ThemeProvider>
  );
}

export default App;
