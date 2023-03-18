import React from 'react';
import 'reset-css';
import 'src/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from 'src/pages/NotFound';
import AboutUs from 'src/pages/AboutUs';
import Main from 'src/pages/Main';
import Header from 'src/components/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
