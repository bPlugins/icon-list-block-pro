import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import '../help.scss';

const Header = ({ navigation, secondaryNav }) => {

  return (
    <div className="dashboard-heading-container">
      <div className="dashboard-heading">
        <div className="heading">
          <img
            className="block-logo"
            src={logo}
            alt="CustomHtmlIcon"
          />
          <h1 className="heading-title">
            Icon List Block
          </h1>
        </div>
        <div className="plugin-version">
          v1.0.9
        </div>
      </div>

      {/* Links */}
      <div className="navLinks">
        <div className='firstLinks'>
          {
            navigation.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  to={item.href}
                  className={`links ${({ isActive }) => isActive ? 'active' : ''}`}
                >
                  {item.name}
                </NavLink>
              )
            })
          }
        </div>
        <div className='secondLinksDiv'>
          {secondaryNav.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="secondLinks"
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;