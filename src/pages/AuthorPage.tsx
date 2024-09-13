import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { Book, Author } from '../types';
import BookList from '../components/BookList';

const AuthorPage: React.FC = () => {
    const { authorId } = useParams<{ authorId: string }>();
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedAuthorID, setSelectedAuthorID] = useState<string | null>(authorId || null);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch book formats based on selected author ID
        if (selectedAuthorID) {
            axios.get<Book[]>(`http://127.0.0.1:8000/api/authors/${selectedAuthorID}/books`)
                .then(response => setBooks(response.data))
                .catch(e => console.log(e));
        }
    }, [selectedAuthorID]);

    useEffect(() => {
        // Set initial selectedAuthorID when authorId is available
        if (authorId) {
            setSelectedAuthorID(authorId);
        }
    }, [authorId]);

    return (
        <div className='text-center mt-4'>
            {books.length > 0 && <h4>{books[0].author.name}</h4>}
            <BookList books={books} />
        </div>
    );
};

export default AuthorPage;