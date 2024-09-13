import axios from "axios";
import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap"


interface FormData {
    fullName: string;
    description: string;
}

const CreateAuthorForm: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({ fullName: '', description: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        axios.post('http://localhost:8080/api/authors', formData)
            .then(response => {
                alert('Author created successfully');
            })
            .catch(error => {
                console.error('Error creating author', error);
            });
    };



    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicAuthorName">
                <Form.Label>Naziv</Form.Label>
                <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAuthorDescription">
                <Form.Label>Opis</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Sacuvaj
            </Button>
        </Form>
    )
}

export default CreateAuthorForm