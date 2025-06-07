import React, { useState, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import emailjs from "@emailjs/browser";

const GetInvolvedModal = ({ show, onHide }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    reason: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, address, phone, email, reason } = form;
    if (!name || !address || !phone || !email || !reason) {
      setError("Please fill in all fields.");
      return;
    }

    // Set hidden fields for emailjs template
    formRef.current.elements.title.value = "Get Involved Request";
    formRef.current.elements.time.value = new Date().toLocaleString();
    formRef.current.elements.address.value = address;

    setLoading(true);
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_INVOLVEMENT_TEMPLATE_ID,
        formRef.current,
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      );
      setSuccess("Thank you for getting involved! We have received your details.");
      setForm({ name: "", address: "", phone: "", email: "", reason: "" });
      setError("");
      setTimeout(() => {
        setSuccess("");
        onHide();
      }, 1500);
    } catch (err) {
      setError("Failed to send your request. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md" contentClassName="border-0 rounded-4 shadow">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold" style={{ fontSize: "1.5rem" }}>
          Get Involved
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2">
        <Form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
          {/* Hidden fields for emailjs */}
          <input type="hidden" name="title" />
          <input type="hidden" name="time" />
          <input type="hidden" name="address" />

          <Row className="g-3">
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Name</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="rounded-3"
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Phone Number</Form.Label>
                <Form.Control
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 017xxxxxxxx"
                  className="rounded-3"
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className="rounded-3"
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">Address</Form.Label>
                <Form.Control
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Your Address"
                  className="rounded-3"
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">Why do you want to join?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  required
                  placeholder="Tell us why you want to join..."
                  className="rounded-3"
                />
              </Form.Group>
            </Col>
          </Row>
          {error && <div className="alert alert-danger py-1 mt-3">{error}</div>}
          {success && <div className="alert alert-success py-1 mt-3">{success}</div>}
          <Button
            variant="success"
            type="submit"
            className="w-100 fw-bold mt-4 rounded-3"
            style={{
              background: "linear-gradient(90deg, #4CB572 0%, #135E4B 100%)",
              border: "none",
              fontSize: "1.1rem",
              letterSpacing: "1px",
            }}
            disabled={loading}
          >
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GetInvolvedModal;