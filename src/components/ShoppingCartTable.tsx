import Table from 'react-bootstrap/Table';
import { useCart } from '../context/CartContext';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';


const ShoppingCartTable: React.FC = () => {

    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Proizvod</th>
                    <th>Cena</th>
                    <th>Količina</th>
                    <th>Ukupno</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cart.map((cartItem, i) => (
                    <tr key={cartItem.id}>
                        <td>{i + 1}</td>
                        <td>
                            <Container>
                                <Row className='align-items-start'>
                                    <Col xs='auto'>
                                        <Image style={{ width: '100px', height: '100px' }} src={`http://127.0.0.1:8000/${cartItem.cover_image_path}`} />
                                    </Col>
                                    <Col>
                                        <p className='font-weight-bold'>
                                            {cartItem.title}
                                        </p>
                                        <p>
                                            {cartItem.author.name}
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </td>
                        <td>{(cartItem.price)} RSD</td>
                        <td>
                            <Container className='d-flex align-items-center justify-content-center'>
                                <Row>
                                    <Col>
                                        {cartItem.quantity}
                                    </Col>
                                    <Row>
                                        <Col>
                                            <Button size='sm' className='mr-2' onClick={() => increaseQuantity(cartItem.id)}>+</Button>
                                            <Button size='sm' onClick={() => decreaseQuantity(cartItem.id)}>-</Button>
                                        </Col>
                                    </Row>
                                </Row>
                            </Container>
                        </td>
                        <td>{(cartItem.price * cartItem.quantity).toFixed(2)} RSD</td>
                        <td><Button onClick={() => removeFromCart(cartItem.id)}>Izbaci</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ShoppingCartTable;