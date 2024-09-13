import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

interface TagModalProps {
    show: boolean;
    onHide: () => void;
    availableTags: string[];
    checkedTags: string[]
    onTagsSelected: (tags: string[]) => void;
}

const TagModal: React.FC<TagModalProps> = ({ show, onHide, availableTags, checkedTags, onTagsSelected }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(checkedTags);

    const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setSelectedTags(prevTags =>
            checked ? [...prevTags, value] : prevTags.filter(tag => tag !== value)
        );
    };

    const handleSave = () => {
        onTagsSelected(selectedTags);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Izaberi kategorije</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {availableTags.map((tag, index) => (
                    <Form.Check
                        key={index}
                        type="checkbox"
                        id={`tag-${index}`}
                        label={tag}
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={handleTagChange}
                    />
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Zatvori
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Sacuvaj
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TagModal;