import React from 'react';
import Sidebar from '../components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPage: React.FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Container
                fluid
                style={{ marginLeft: '250px', padding: '20px' }} // Adjust to match sidebar width
            >
                <Row>
                    <Col>
                        {/* Main content goes here */}
                        <h1>Admin Dashboard</h1>
                        {/* More content */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminPage;