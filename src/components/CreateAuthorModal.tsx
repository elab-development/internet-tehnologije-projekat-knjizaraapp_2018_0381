import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import CreateAuthorForm from './CreateAuthorForm';

interface CreateAuthorModalProps {
    show: boolean;
    onHide: () => void;
}

const CreateAuthorModal: React.FC<CreateAuthorModalProps> = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Dodaj autora</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateAuthorForm />
            </Modal.Body>
        </Modal>
    );
};

export default CreateAuthorModal;