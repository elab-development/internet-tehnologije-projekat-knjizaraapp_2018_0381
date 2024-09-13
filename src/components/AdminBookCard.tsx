import { Button, Card } from "react-bootstrap";
import { Book } from "../types";
import { useCart } from "../context/CartContext";

interface BookCardProps {
    book: Book;
}

const AdminBookCard: React.FC<BookCardProps> = ({ book }) => {

    return (
        <Card style={{ width: '12rem', padding: '20px' }}>
            <Card.Img variant="top" src={`http://127.0.0.1:8000/${book.cover_image_path}`} />
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author.name}</Card.Text>
                <Card.Text>{book.price} RSD</Card.Text>

                <Button variant="primary" >Izmeni</Button>
                <Button variant="danger" >Obrisi</Button>
            </Card.Body>
        </Card>
    )
}


export default AdminBookCard;