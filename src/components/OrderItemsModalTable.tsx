import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap"
import { Order } from "../types"

interface OrderItemsModalTableProps {
    order: Order | null,
    show: boolean;
    onHide: () => void
}

const OrderItemsModalTable: React.FC<OrderItemsModalTableProps> = ({ order, show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Detalji porudžbine ({order?.id})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container style={{ height: order && order?.items.length >= 3 ? '500px' : '300px', width: '800px', overflowY: 'auto' }}>
                    <h4>Stavke:</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Knjiga</th>
                                <th>ISBN</th>
                                <th>Cena</th>
                                <th>Kolicina</th>
                                <th>Ukupna cena</th>
                            </tr>
                        </thead>
                        {order &&
                            <tbody>
                                {order.items.map((orderItem, i) => (
                                    <tr key={orderItem.id}>
                                        <td>{i + 1}</td>
                                        <td>{orderItem.book.title}</td>
                                        <td>{orderItem.book.isbn}</td>
                                        <td>{orderItem.book.price} RSD</td>
                                        <td>1</td>
                                        <td>{orderItem.book.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </Table>
                </Container>
                <Row className="justify-content-end">
                    <Col xs="auto">
                        <h5 className="mt-4 text-end">Ukupan iznos: {order?.total_amount} RSD</h5>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default OrderItemsModalTable