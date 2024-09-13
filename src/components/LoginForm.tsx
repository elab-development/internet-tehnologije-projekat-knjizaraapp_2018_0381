import { Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";



interface LoginResponse {
    access_token: string,
    roles: string[]
}


const LoginForm: React.FC = () => {

    const { setIsAuthenticated, setIsAdmin } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        axios.post<LoginResponse>('http://127.0.0.1:8000/api/login', formData)
            .then(response => {
                const { access_token, roles } = response.data
                localStorage.setItem('token', access_token);
                localStorage.setItem('roles', JSON.stringify(roles))
                setIsAuthenticated(true)

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
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <Form.Label className='mt-3'>Lozinka</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button type='submit' variant='primary' className="mt-4">Uloguj se</Button>
            </div>
        </Form>
    )
}

export default LoginForm;