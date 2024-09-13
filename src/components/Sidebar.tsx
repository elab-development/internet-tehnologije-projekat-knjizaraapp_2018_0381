import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {

    const [isBooksOpen, setIsBooksOpen] = useState(false)

    return (
        <Navbar
            bg="dark"
            variant="dark"
            className="sidebar d-flex flex-column p-3"
            style={{ width: '250px', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
        >
            <Navbar.Brand as={Link} to="/admin" className='text-secondary ml-4 mr-4'>Shakespeare and Company</Navbar.Brand>
            <Navbar.Collapse id="sidebar">
                <Nav className="flex-column">
                    {/* Books Management Section */}
                    <div className="mb-3">
                        <h5 className='text-secondary'>Books Management</h5>
                        <Nav.Link onClick={() => setIsBooksOpen(prevOpen => !prevOpen)}>Knjige</Nav.Link>
                        {isBooksOpen && (
                            <Nav className="flex-column ms-3">
                                <Nav.Link as={Link} to='/admin/view-books'>Vidi sve knjige</Nav.Link>
                                <Nav.Link as={Link} to='/admin/create-book'>Dodaj knjigu</Nav.Link>
                            </Nav>
                        )}
                        <Nav.Link as={Link} to='/admin/view-authors'>Autori</Nav.Link>
                        <Nav.Link href="#categories">Kategorije</Nav.Link>
                    </div>

                    {/* Website Management Section */}
                    <div className="mb-3">
                        <h5 className='text-secondary'>Website Management</h5>
                        <Nav.Link href="#about">O nama</Nav.Link>
                        <Nav.Link href="#contact">Kontakt</Nav.Link>
                    </div>

                    {/* Order Management Section */}
                    <div>
                        <h5 className='text-secondary'>Order Management</h5>
                        <Nav.Link as={Link} to='/admin/orders'>Porudžbine</Nav.Link>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Sidebar;