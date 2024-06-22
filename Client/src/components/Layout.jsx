import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

 return (
    <>
        <Header />
        <div className='container mt-2'>
    
                <Outlet />

        </div>
        <Footer />
    </>
);
};

export default ProtectedRoute;