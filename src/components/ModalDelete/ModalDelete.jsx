import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function ModalDelete(props) {
    return (
        <>
            {/* <Button variant='primary' onClick={handleShow}>
                Launch demo modal
            </Button> */}
            <Modal
                show={props.show}
                onHide={props.handleClose}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, are you sure to delete this user:{' '}
                    {props.dataModal.email}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={props.confirmDeleteUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
