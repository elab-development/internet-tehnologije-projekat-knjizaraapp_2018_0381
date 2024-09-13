import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ReusableModalProps {
    show: boolean;
    handleClose: () => void;
    title: string;
    body: React.ReactNode;
    footer?: React.ReactNode;
}

const ReusableModal: React.FC<ReusableModalProps> = ({ show, handleClose, title, body, footer }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            {footer && <Modal.Footer>{footer}</Modal.Footer>}
        </Modal>
    );
};

export default ReusableModal;