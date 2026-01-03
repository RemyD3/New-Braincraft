import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import TestRunner from './pages/TestRunner';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { UserProvider } from './context/UserContext';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <UserProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tests" element={<Catalog />} />
            <Route path="test/:testId" element={<TestRunner />} />
            <Route path="report/:resultId" element={<Report />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </UserProvider>
  );
};

export default App;