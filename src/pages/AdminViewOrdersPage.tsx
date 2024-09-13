import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AdminAuthorsTable from '../components/AdminAuthorsTable';
import axios from 'axios';
import { Order } from '../types';
import CreateAuthorModal from '../components/CreateAuthorModal';
import AdminOrdersTable from '../components/AdminOrdersTable';

const AdminViewOrdersPage: React.FC = () => {

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/invoices', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => setOrders(response.data))
            .catch(e => console.log('Error fetching invoices'))
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
                                    <h2>Pregled racuna</h2>
                                    <AdminOrdersTable orders={orders} />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default AdminViewOrdersPage
