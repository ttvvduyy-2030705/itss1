import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './CafeTime/Home';
import CafeDetail from './CafeTime/CafeDetail';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafe-detail/:id" element={<CafeDetail />} />
      </Routes>
    </>
  );
}

export default App;