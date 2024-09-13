import React, { useState } from 'react';
import { Form, Button, Image, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageUpload: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Check file type
            if (!file.type.startsWith('image/')) {
                setError('Please upload a valid image file.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4">
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </Form.Group>


            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {selectedImage && (
                <div className="mt-3">
                    <h5>Image Preview:</h5>
                    <Image
                        src={selectedImage as string}
                        alt="Selected"
                        thumbnail
                        style={{ maxWidth: '300px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;