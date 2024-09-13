import React, { useState } from 'react';
import { Container, Row, Col, Image, Tabs, Tab, Button, ToastContainer, Toast } from 'react-bootstrap';
import { Book } from '../types';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

interface BookDetailsProps {
    book: Book | null;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState('description');
    const [showToast, setShowToast] = useState(false);
    const [disableAddToCart, setDisableAddToCart] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // Track hover state for author name
    const navigate = useNavigate()

    if (!book) {
        return <p>Loading...</p>;
    }

    const handleAddToCart = () => {
        addToCart(book);
        setShowToast(true);
        setDisableAddToCart(true); // Disable button

        setTimeout(() => {
            setShowToast(false);
            setDisableAddToCart(false); // Re-enable button after 3 seconds
        }, 3000);
    };

    const rowStyle = {
        padding: '5px 0',
        borderBottom: '1px solid #ddd' // Light gray divider line
    };

    const lastRowStyle = {
        ...rowStyle,
        borderBottom: 'none' // Remove border from the last item
    };

    return (
        <Container className="mt-5">
            <Row>
                {/* Image on the left */}
                <Col md={4}>
                    <Image src={`http://127.0.0.1:8000/${book.cover_image_path}`} alt={book.title} fluid />
                </Col>

                {/* Book details in the middle */}
                <Col md={6}>
                    <div className="mb-3">
                        {/* Genres above the title */}
                        <div>
                            {book.genres.map((genre) => (
                                <Link
                                    key={genre.id}
                                    to={`/books/genres?genreId=${genre.id}`}
                                    style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff' }}
                                >
                                    {genre.name}
                                </Link>
                            ))}
                        </div>
                        <h2>{book.title}</h2>
                        <h5
                            className="text-muted"
                            style={{
                                cursor: 'pointer',
                                color: isHovered ? '#007bff' : 'inherit', // Blue when hovered
                                textDecoration: isHovered ? 'underline' : 'none' // Underline on hover
                            }}
                            onClick={() => navigate(`/authors/${book.author.id}/books`)}
                            onMouseEnter={() => setIsHovered(true)} // Handle hover state
                            onMouseLeave={() => setIsHovered(false)} // Handle hover state
                        >
                            {book.author.name}
                        </h5>
                    </div>

                    <div className="mt-4">
                        {/* Tabs Component */}
                        <Tabs
                            id="book-details-tabs"
                            activeKey={activeTab}
                            onSelect={(key) => setActiveTab(key || 'description')}
                            className="mb-3"
                        >
                            <Tab eventKey="description" title="Opis">
                                <p>{book.description}</p>
                            </Tab>
                            <Tab eventKey="declaration" title="Deklaracija">
                                <div style={{ padding: '10px' }}>
                                    <Row style={rowStyle}>
                                        <Col xs={6}><strong>ISBN:</strong></Col>
                                        <Col xs={6} className="text-end">{book.isbn}</Col>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Col xs={6}><strong>Izdavac:</strong></Col>
                                        <Col xs={6} className="text-end">{book.publisher.name}</Col>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Col xs={6}><strong>Broj stranica:</strong></Col>
                                        <Col xs={6} className="text-end">{book.page_count}</Col>
                                    </Row>
                                    <Row style={lastRowStyle}>
                                        <Col xs={6}><strong>Format:</strong></Col>
                                        <Col xs={6} className="text-end">{book.format}</Col>
                                    </Row>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </Col>

                {/* Price and Add to Cart button on the right */}
                <Col md={2} className="d-flex justify-content-center align-items-center p-3 rounded" style={{ height: '400px', backgroundColor: '#f8f9fa' }}>
                    <div className="text-center">
                        <h5 className=''>Cena:</h5>
                        <h5 className="text-danger mb-3"><strong>{book.price} RSD</strong></h5>
                        {book.total_stock > 0 ?
                            <>
                                <Button
                                    variant={disableAddToCart ? 'secondary' : 'outline-primary'}
                                    onClick={handleAddToCart}
                                    disabled={disableAddToCart} // Disable the button
                                    className={disableAddToCart ? 'disabled' : ''}
                                >
                                    {disableAddToCart ? 'Dodato' : 'Dodaj u korpu'} <FaShoppingCart />
                                </Button>
                                <p className='mt-3 text-primary' style={{ cursor: 'pointer' }}>Proveri dostupnost po knjižarama</p>
                            </>
                            :
                            <p className='bg-warning p-2'><strong>Trenutno nije na stanju</strong></p>
                        }
                    </div>
                </Col>
            </Row>

            <ToastContainer position="bottom-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} style={{ border: '2px solid green' }}>
                    <Toast.Header>
                        <strong className="me-auto">Korpa</strong>
                    </Toast.Header>
                    <Toast.Body>Knjiga je uspešno dodata u korpu</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default BookDetails;