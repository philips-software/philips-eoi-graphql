import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import './header.css';
import graphql_logo from '../../assets/images/graphql_logo.svg'

const Header = () => {
    return  <Navbar light expand="md">
    <NavbarBrand href="/">
        <img src = {graphql_logo} alt = "graphql-logo"/>
       | React</NavbarBrand>
  </Navbar>
}

export default Header;