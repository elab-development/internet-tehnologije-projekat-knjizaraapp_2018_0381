import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import { useAuth } from '../context/AuthContext';

const AdminNavbar: React.FC = () => {

    const navigate = useNavigate()
    const { setIsAuthenticated, setIsAdmin } = useAuth();


    const handleLogout = () => {
        // Clear token from local storage
        localStorage.clear()
        setIsAuthenticated(false)
        setIsAdmin(false)
        navigate('/');
    }

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
        // Implement the search logic here, e.g., filtering data or making API calls
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className='p-2'>
            <Container>
                <div></div>

                <Nav className="mx-auto">
                    <SearchComponent onSearch={handleSearch} />
                </Nav>

                <Nav>
                    <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }} className='text-light'>
                        Odjavite se
                    </Nav.Link>

                </Nav>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;