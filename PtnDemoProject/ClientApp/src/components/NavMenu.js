import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate('/');
  };


  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/"><img
          alt=""
          src={process.env.PUBLIC_URL + '/assets/logo.png'}
          width="150"
          height="30"
          className="d-inline-block align-top"
        />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            {localStorage.token &&
              <NavItem >
                <NavLink tag={Link} className="text-dark" to="/" onClick={logOut}>Log Out</NavLink>
              </NavItem>
            }
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}

export default NavMenu;

