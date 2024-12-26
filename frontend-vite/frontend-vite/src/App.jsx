import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './CafeTime/Home';
import CafeDetail from './CafeTime/CafeDetail';
import Register from './login/dangky.jsx';
import Login from './login/dangnhap.jsx';
import ForgotPassword from './login/quenmatkhau.jsx';
import TermsOfService from './login/dieukhoansudung.jsx';


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