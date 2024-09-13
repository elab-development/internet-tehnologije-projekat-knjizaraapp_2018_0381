import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { Book } from '../types';
import axios from 'axios';
import { Container, Pagination } from 'react-bootstrap';

const CustomerHomePage: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/books?page=${currentPage}`)
            .then(response => {
                console.log(response.data['books'])
                setBooks(response.data['books'])
                setTotalPages(response.data['meta']['last_page'])
            })
            .catch(error => console.log('Error fetching book formats', error))
    }, [currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPaginationItems = () => {
        const items = [];
        for (let page = 1; page <= totalPages; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }
        return items;
    };

    return (
        <>
            <BookList books={books} />
            <Container className="d-flex justify-content-center mt-3">
                <Pagination>
                    {currentPage > 1 && (
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                    )}
                    {renderPaginationItems()}
                    {currentPage < totalPages && (
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                    )}
                </Pagination>
            </Container>
        </>
    );
};

export default CustomerHomePage;