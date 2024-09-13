import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { Author } from "../types"

interface AdminAuthorsTableProps {
    authors: Author[]
}

const AdminAuthorsTable: React.FC<AdminAuthorsTableProps> = ({ authors }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Sifra</th>
                    <th>Naziv</th>
                    <th>Opis</th>
                </tr>
            </thead>
            <tbody>
                {authors.map((a, i) => (
                    <tr key={a.id}>
                        <td>{i + 1}</td>
                        <td>{a.id}</td>
                        <td>{a.name}</td>
                        <td>
                            {a.bio}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default AdminAuthorsTable