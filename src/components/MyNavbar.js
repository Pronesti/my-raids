import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class MyNavbar extends Component {
constructor(props){
  super(props);
  this.state = {
  }
}
render() {
    return (
      <div className="MyNavbar">
 <Navbar className="colorNavbar" light expand="md">
          <NavbarBrand className="text-white" href="/">Raids</NavbarBrand>
          <NavbarToggler className="text-white" onClick={this.toggle} />
          <Collapse className="text-white" isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="text-white" href="/addRaid/">Add Raid</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-white" href="/login">Log In</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar >
                <DropdownToggle className="text-white" nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <NavLink href="https://github.com/Pronesti" style={{color:"black"}} >My Github</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
