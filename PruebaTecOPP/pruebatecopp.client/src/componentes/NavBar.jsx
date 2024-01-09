import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';

function NavBar(args) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar {...args}
                color="dark"
                dark>
                <NavbarBrand href="/"><Link to="/" className="">Inicio</Link>
                </NavbarBrand>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <Link to="/gestionEmpleados" className="text-white">Gestion Empleados</Link>
                    </NavItem>
                </Nav> <Nav className="me-auto" navbar>
                   
                </Nav>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <Link to="/gestionEmpleados" className="text-white">Empleados</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );

}

export default NavBar;