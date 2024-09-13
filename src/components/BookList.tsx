import { Container, Row, Col } from "react-bootstrap";
import BookCard from "./BookCard";
import { Book } from "../types";

const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
    const rows = Array.from({ length: Math.ceil(books.length / 4) }, (_, index) =>
        books.slice(4 * index, 4 * index + 4)
    );

    return (
        <Container className='mt-4'>
            {rows.map((books, rowIndex) => (
                <Row key={rowIndex} className="mb-4" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    {books.map(book => (
                        <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch mb-3">
                            <BookCard book={book} />
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    );
}

export default BookList;