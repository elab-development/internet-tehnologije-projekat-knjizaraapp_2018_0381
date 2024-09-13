import React from 'react';
import CreateBookForm from '../components/CreateBookForm';
import Sidebar from '../components/Sidebar';
import { Col, Container, Row } from 'react-bootstrap';

const CreateBookPage: React.FC = () => {
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
                            <h2>Kreiraj knjigu</h2>
                            <CreateBookForm />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CreateBookPage;