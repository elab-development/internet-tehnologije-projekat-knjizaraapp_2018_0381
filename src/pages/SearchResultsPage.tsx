// SearchResultsPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Book } from '../types';
import BookList from '../components/BookList';

const SearchResultsPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query') || '';

        if (query) {
            setSearchTerm(query);
            axios.get<Book[]>(`http://127.0.0.1:8000/api/books/search?query=${query}`)
                .then(response => setSearchResults(response.data))
                .catch(error => console.error(error));
        }
    }, [location.search]);

    return (
        <div className='text-center mt-4'>
            <h4 className='text-secondary'>{searchResults.length} rezultata pretrage za: "{searchTerm}"</h4>
            <BookList books={searchResults} />
        </div>
    );
};

export default SearchResultsPage;