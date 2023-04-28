import React from 'react';
import 'reset-css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from 'src/pages/NotFound';
import AboutUs from 'src/pages/AboutUs';
import Main from 'src/pages/Main';
import Header from 'src/components/Header';
import FormPage from 'src/pages/Form';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Main />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/form" element={<FormPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
