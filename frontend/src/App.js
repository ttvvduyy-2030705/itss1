import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './CafeTime/Home';
import CafeDetail from './CafeTime/CafeDetail';
import Register from './login/dangky.js';
import Login from './login/dangnhap.js';
import ForgotPassword from './login/quenmatkhau.js';
import TermsOfService from './login/dieukhoansudung.js';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafe-detail/:id" element={<CafeDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </>
  );
}

export default App;