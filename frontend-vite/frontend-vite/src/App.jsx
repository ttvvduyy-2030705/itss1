import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './CafeTime/Home';
import CafeDetail from './CafeTime/CafeDetail';
import Register from './login/dangky.jsx';
import Login from './login/dangnhap.jsx';
import ForgotPassword from './login/quenmatkhau.jsx';
import TermsOfService from './login/dieukhoansudung.jsx';
import BookmarkList from './CafeTime/BookmarkList';
import SearchResults from './CafeTime/SearchResults';


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
        <Route path="/bookmark" element={<BookmarkList />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;