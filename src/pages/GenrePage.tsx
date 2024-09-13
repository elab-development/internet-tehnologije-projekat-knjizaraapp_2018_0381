import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { Book, Genre } from '../types';
import BookList from '../components/BookList';

const GenrePage: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedGenreID, setSelectedGenreID] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch all genres
    useEffect(() => {
        axios.get<Genre[]>('http://127.0.0.1:8000/api/genres')
            .then(response => { setGenres(response.data); console.log(response.data) })
            .catch(e => console.log(e));
    }, []);

    // Fetch genreId from query parameters
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const genreId = queryParams.get('genreId');

        if (genreId) {
            setSelectedGenreID(genreId); // Set selected genre ID
            axios.get<Book[]>(`http://127.0.0.1:8000/api/genres/${genreId}/books`)
                .then(response => setBooks(response.data))
                .catch(e => console.log(e));
        }
    }, [location.search]);

    // Handle genre click to navigate to the genre's page
    const handleGenreClick = (id: string) => {
        navigate(`/books/genres?genreId=${id}`); // Navigate to the new route
    };

    return (
        <Container fluid>
            <Row>
                <Col md={3} className="p-3">
                    <h2 className='mb-4'>Kategorije</h2>
                    <ListGroup>
                        {genres.map((genre) => (
                            <ListGroup.Item
                                key={genre.id}
                                action
                                active={genre.id.toString() === selectedGenreID}
                                onClick={() => handleGenreClick(genre.id.toString())}
                            >
                                {genre.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={9} className="p-3">
                    <h2 className='ml-3'>Knjige</h2>
                    <BookList books={books} />
                </Col>
            </Row>
        </Container>
    );
};

export default GenrePage;