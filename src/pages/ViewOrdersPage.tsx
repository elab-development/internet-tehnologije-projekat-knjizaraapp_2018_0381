import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AdminAuthorsTable from '../components/AdminAuthorsTable';
import axios from 'axios';
import { Order } from '../types';
import CreateAuthorModal from '../components/CreateAuthorModal';
import AdminOrdersTable from '../components/AdminOrdersTable';
import OrdersTable from './OrdersTable';

const ViewOrdersPage: React.FC = () => {

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/orders', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => setOrders(response.data['orders']))
            .catch(e => console.log('Error fetching orders'))
    }, [])

    return (
        <div style={{ display: 'flex' }}>
            <Container
                fluid
                style={{ marginLeft: '250px', padding: '20px' }} // Adjust to match sidebar width
            >
                <Row>
                    <Col>
                        <div className="container mt-4">
                            <Row>
                                <Col>
                                    <h2>Pregled porudzbina</h2>
                                    <OrdersTable orders={orders} />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default ViewOrdersPage
