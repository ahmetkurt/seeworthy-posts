import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import Posts from './pages/Posts/Posts';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<Posts />} exact />
    </Routes>
  </ThemeProvider>
);

export default App;
