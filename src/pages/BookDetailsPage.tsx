import React, { useEffect, useState } from 'react';
import BookDetails from '../components/BookDetails';
import { useParams } from 'react-router-dom';
import { Book } from '../types';
import axios from 'axios';


const BookDetailsPage: React.FC = () => {

    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<Book | null>(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/books/${bookId}`)
            .then(response => {
                console.log(response.data['book'])
                setBook(response.data['book'])
            })
            .catch(e => console.log(e))
    }, [bookId])

    return (
        <BookDetails book={book} />
    );
};

export default BookDetailsPage;