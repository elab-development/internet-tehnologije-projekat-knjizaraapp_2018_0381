import { Button, Col, Form, Row } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";



interface LoginResponse {
    token: string
}

interface DecodedToken {
    sub: string;
    roles: string[];
}

const RegistrationForm: React.FC = () => {

    const { setIsAuthenticated, setIsAdmin } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/register', formData)
            .then(response => {
                console.log(response.data)
                const token = response.data['access_token']
                localStorage.setItem('token', token);
                setIsAuthenticated(true)

                const roles = response.data['roles']
                localStorage.setItem('roles', JSON.stringify(roles));

                if (roles.includes('admin')) {
                    setIsAdmin(true)
                    navigate('/admin');
                } else if (roles.includes('customer')) {
                    setIsAdmin(false)
                } else {
                    navigate('/'); // Fallback or default page
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Ime i Prezime</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Form.Label className='mt-3'>Email</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <Form.Label className="mt-3">Lozinka</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button type='submit' variant='primary' className="mt-4">Registruj se</Button>
            </div>
        </Form>
    )
}

export default RegistrationForm;