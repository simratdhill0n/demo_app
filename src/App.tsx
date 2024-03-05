import React, { FC } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';

const App: FC = () => {
  return (
    <div className="min-h-full h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="ml-64 w-full space-y-8">
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/dashboard/wallet" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;