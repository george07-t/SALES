import React from "react";
import { Modal, Button } from "react-bootstrap";

const FooterModal = ({ show, onHide, title, children }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title className="fw-bold">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ maxHeight: 400, overflowY: "auto" }}>
      {children}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default FooterModal;