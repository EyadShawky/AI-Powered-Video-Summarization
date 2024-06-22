import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import logo from '../imgs/Logos/logo.png';
import '../styles/navbar.scss';

const items = [
  {
    label: 'profile',
    key: '1',
    icon: <UserOutlined />,
    link: '/profile'
  },
];

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("Token");
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar__color">
      <div className='container'>
        <Link to='/home' className="navbar-brand logo color__nav">
          <img src={logo} height={50} width={50} alt='logo' className='' />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {isLoggedIn && (
          <ul className="navbar-nav m-auto">
            {/* <NavItem to='/sample' label='clipify' /> */}
            <NavItem to='/about-model' label='summarize' />
            <NavItem to='/services' label='service' />
            <NavItem to='/about' label='about' />
            <NavItem to='/contact-us' label='contact-us' />
         
          </ul>
             )}
          <div>
            {isLoggedIn && (
              <Dropdown.Button onClick={handleLogout} overlay={<Menu>{items.map(renderMenuItem)}</Menu>}>
                Logout
              </Dropdown.Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label }) => (
  <li className="nav-item">
    <Link to={to} className="nav-link color__nav">{label}</Link>
  </li>
);

const renderMenuItem = (item) => (
  <Menu.Item key={item.key}>
    <Link to={item.link}><span className="p-1">{item.icon}</span>{item.label}</Link>
  </Menu.Item>
);

export default Header;
