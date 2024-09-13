import React, { useEffect, useState } from 'react';
import CreateBookForm from '../components/CreateBookForm';
import Sidebar from '../components/Sidebar';
import { Button, Col, Container, Row } from 'react-bootstrap';
import BookList from '../components/BookList';
import AdminBookList from '../components/AdminBookList';
import AdminAuthorsTable from '../components/AdminAuthorsTable';
import axios from 'axios';
import { Author } from '../types';
import CreateAuthorModal from '../components/CreateAuthorModal';

const AdminViewAuthorsPage: React.FC = () => {

    const [authors, setAuthors] = useState<Author[]>([])
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/authors', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => setAuthors(response.data))
            .catch(e => console.log('Error fetching authors'))
    }, [])

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Container
                fluid
                style={{ marginLeft: '250px', padding: '20px' }} // Adjust to match sidebar width
            >
                <Row>
                    <Col>
                        <div className="container mt-4">
                            <Row>
                                <Col>

                                    <h2>Pregled autora</h2>
                                </Col>
                                <Col>
                                    <Button onClick={() => setShowModal(true)}>Dodaj autora</Button>
                                </Col>

                            </Row>
                            <AdminAuthorsTable authors={authors} />
                        </div>
                    </Col>
                </Row>
            </Container>

            <CreateAuthorModal
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </div>
    );
};

export default AdminViewAuthorsPage;