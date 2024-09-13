import { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { Author, Publisher, Genre } from '../types';
import ImageUpload from './ImageUpload';
import { ListGroup } from 'react-bootstrap';
import TagModal from './TagModal';

interface FormData {
    title: string;
    description: string;
    isbn: string;
    pages: number;
    price: number;
}

interface SelectOption {
    value: number | string;
    label: string;
}

const formatOptions: SelectOption[] = [
    { value: 'Tvrd povez', label: 'Tvrd povez' },
    { value: 'Mek povez', label: 'Mek povez' }
];


const availableTags = ['Klasika', 'Trileri', 'Fikcija']

const CreateBookForm: React.FC = () => {

    const [authors, setAuthors] = useState<SelectOption[]>([]);
    const [selectedAuthor, setSelectedAuthor] = useState<SelectOption | null>(null);
    const [publishers, setPublishers] = useState<SelectOption[]>([]);
    const [selectedPublisher, setSelectedPublisher] = useState<SelectOption | null>(null);
    const [genres, setGenres] = useState<Genre[]>([])
    const [selectedFormat, setSelectedFormat] = useState<SelectOption | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        isbn: '',
        pages: 0,
        price: 0
    });

    useEffect(() => {
        // Fetch authors from the API
        axios.get<Author[]>('http://127.0.0.1:8000/api/authors', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }) // Adjust the URL as needed
            .then(response => {
                setAuthors(response.data.map(author => ({
                    value: author.id,
                    label: author.name
                })));
            })
            .catch(error => {
                console.error('Error fetching authors', error);
            });

        axios.get<Publisher[]>('http://127.0.0.1:8000/api/publishers', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }) // Adjust the URL as needed
            .then(response => {
                setPublishers(response.data.map(publisher => ({
                    value: publisher.id,
                    label: publisher.name
                })));
            })
            .catch(error => {
                console.error('Error fetching publishers', error);
            });


        axios.get<Genre[]>('http://127.0.0.1:8000/api/genres') // Adjust the URL as needed
            .then(response => {
                setGenres(response.data)
            })
            .catch(error => {
                console.error('Error fetching genres', error);
            });


    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Check file type
            if (!file.type.startsWith('image/')) {
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAuthorChange = (selectedOption: SingleValue<SelectOption>) => {
        setSelectedAuthor(selectedOption);
    };

    const handlePublisherChange = (selectedOption: SingleValue<SelectOption>) => {
        setSelectedPublisher(selectedOption);
    };

    const handleFormatChange = (selectedOption: SingleValue<SelectOption>) => {
        setSelectedFormat(selectedOption);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleTagsSelected = (tags: string[]) => {
        setSelectedGenres(tags);
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!imageFile) {
            // Handle error for missing data
            alert('Please fill out all fields and upload an image.');
            return;
        }

        const dataToSend = new FormData();
        dataToSend.append('image', imageFile);
        dataToSend.append('title', formData.title)
        dataToSend.append('description', formData.description)
        dataToSend.append('page_count', formData.pages.toString())
        dataToSend.append('price', formData.price.toString())
        dataToSend.append('isbn', formData.isbn)
        dataToSend.append('format', selectedFormat!.value.toString())
        dataToSend.append('author_id', selectedAuthor!.value.toString())
        dataToSend.append('publisher_id', selectedPublisher!.value.toString())

        // Add selected genres (tags)
        selectedGenres.forEach((tag, index) => {
            dataToSend.append(`genres[${index}]`, tag);
        });


        axios.post('http://127.0.0.1:8000/api/books', dataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                alert('Book created successfully');
            })
            .catch(error => {
                console.error('Error creating book', error);
            });
    };


    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicBookTitle">
                <Row>
                    <Col>
                        <Form.Label>Naziv</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Col>

                    <Col>
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="authorId">
                <Row>
                    <Col>

                        <Form.Label>Autor</Form.Label>
                        <Select
                            value={selectedAuthor}
                            onChange={handleAuthorChange}
                            options={authors}
                            placeholder="Pronadji autora..."
                            isClearable
                            required
                        />
                    </Col>

                    <Col>
                        <Form.Group controlId="publisherId">
                            <Form.Label>Izdavac</Form.Label>
                            <Select
                                value={selectedPublisher}
                                onChange={handlePublisherChange}
                                options={publishers}
                                placeholder="Pronadji izdavaca..."
                                isClearable
                                required
                            />
                        </Form.Group>

                    </Col>

                </Row>
            </Form.Group>
            <Button variant="primary" onClick={handleShowModal}>
                Kategorije
            </Button>

            <TagModal
                show={showModal}
                onHide={handleCloseModal}
                availableTags={genres.map(g => g.name)}
                checkedTags={selectedGenres}
                onTagsSelected={handleTagsSelected}
            />

            <ListGroup className="mt-3 mb-3">
                {selectedGenres.map((tag, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        {tag}
                    </ListGroup.Item>
                ))}
            </ListGroup>


            <Form.Group className="mb-3" controlId="formBasicBookDescription">
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

            <Form.Group className="mb-3" controlId="pages">
                <Row>
                    <Col>
                        <Form.Label>Format</Form.Label>
                        <Select
                            value={selectedFormat}
                            onChange={handleFormatChange}
                            options={formatOptions}
                            isClearable
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Label>Broj stranica</Form.Label>
                        <Form.Control
                            type="number"
                            name="pages"
                            value={formData.pages}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Label>Cena (RSD)</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Dodaj sliku</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </Form.Group>

            {selectedImage && (
                <div className="mt-3">
                    <Image
                        src={selectedImage as string}
                        alt="Selected"
                        thumbnail
                        style={{ maxWidth: '150px' }}
                    />
                </div>
            )}

            <Container fluid>
                <Row>
                    <Col style={{ display: 'flex', justifyContent: 'right' }}>
                        <Button variant="primary" type="submit">
                            Sacuvaj
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form >
    );
}

export default CreateBookForm