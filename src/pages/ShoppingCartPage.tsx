import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ShoppingCartTable from "../components/ShoppingCartTable";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ShoppingCartPage: React.FC = () => {
    const { cart, clearCart } = useCart();
    const { isAuthenticated } = useAuth()

    const handleCheckout = () => {
        // Transform the cart array into the desired format
        const items = cart.map(item => ({
            book_id: item.id,  // Assuming `id` in cart items is book_id
            quantity: item.quantity
        }));

        const data = {
            items
        };

        // Get token from local storage
        const token = localStorage.getItem('token'); // Adjust the key if necessary

        // Check if token is available
        if (!token) {
            alert('No token found. Please log in.');
            return;
        }

        axios.post('http://127.0.0.1:8000/api/orders', data, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
            .then(response => {
                alert('Order created');
                clearCart();
            })
            .catch(e => console.log(e));
    };

    const isCartEmpty = cart.length === 0;
    const totalPrice = cart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);

    return (
        <Container className="mt-4">
            <Row>
                <Col lg={10}>
                    <ShoppingCartTable />
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Vaša Porudžbina</Card.Title>
                            {isCartEmpty ? (
                                <Card.Text>Vaša korpa je prazna.</Card.Text>
                            ) : (
                                <>
                                    <Card.Text>
                                        Ukupna cena: {totalPrice} RSD
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={handleCheckout}
                                        disabled={!isAuthenticated}
                                    >
                                        {isAuthenticated ? 'Kupi' : 'Morate se prijaviti pre kupovine'}
                                    </Button>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ShoppingCartPage;