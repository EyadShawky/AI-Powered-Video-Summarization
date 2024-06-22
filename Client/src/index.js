import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import ErrorPage from './Pages/ErrorPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AboutModel from './Pages/AboutModel';
import AboutTeam from './Pages/AboutTeam';
import ModelLap from './Pages/ModelLap';
import Sample from './Pages/Sample';
import Services from './Pages/Services';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Profile from './Pages/Profile';
import ProtectedRoute from './components/Layout';
import Subscription from './Pages/Subscription';

const getAccessToken = () => {
  return localStorage.getItem('Token');
}

const isAuthenticated = () => {
  return !!getAccessToken();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    index: true
  },
  {
    path: '/register',
    element: <Register />,
    index: true
  },
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'about-model',
        element: <AboutModel />
      },
      {
        path: 'about',
        element: <AboutTeam />
      },
      {
        path: 'model-lap',
        element: <ModelLap />
      },
      {
        path: 'sample',
        element: <Sample />
      },
      {
        path: 'services',
        element: <Services />
      },
      {
        path: 'contact-us',
        element: <Contact />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'subscriptions',
        element: <Subscription />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);