import React, { useState, useRef } from "react";
import salesdonationImage from "../../assets/salesdonation.png";
import "./possibility.css";
import emailjs from '@emailjs/browser';

const predefinedAmounts = [500, 1000, 2000, 5000];
const currencies = [
  { code: "BDT", label: "৳ BDT" },
  { code: "USD", label: "$ USD" },
  { code: "INR", label: "₹ INR" },
];

const Possibility = () => {
  const [selectedAmount, setSelectedAmount] = useState(predefinedAmounts[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState("BDT");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleAmountClick = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value.replace(/[^0-9]/g, ""));
    setSelectedAmount(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^01[3-9]\d{8}$/.test(phone) || /^[6-9]\d{9}$/.test(phone) || /^\+?\d{10,15}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = customAmount ? Number(customAmount) : selectedAmount;
    if (!form.name || !form.phone || !form.email || !amount) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!validatePhone(form.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Set hidden fields for emailjs template
    formRef.current.elements.title.value = "Donation Details";
    formRef.current.elements.time.value = new Date().toLocaleString();
    formRef.current.elements.ammount.value = `${amount} ${currency}`;

    setLoading(true);
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_DONATION_TEMPLATE_ID,
        formRef.current,
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      );
      setSuccess("Thank you for your donation! We have received your details.");
      setForm({ name: "", phone: "", email: "", message: "" });
      setCustomAmount("");
      setSelectedAmount(predefinedAmounts[0]);
      setCurrency("BDT");
      setError("");
    } catch (err) {
      setError("Failed to send donation details. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <section
      className="sprc__possibility section__padding"
      id="possibility"
      style={{ background: "#CCDCDB", paddingTop: "40px", paddingBottom: "40px" }}
    >
      <div className="container py-4">
        <div className="row justify-content-center align-items-center g-4">
          <div className="col-12">
            <h1 className="gradient__text text-center mb-4" style={{ fontWeight: 700, fontSize: "2rem" }}>
              Donate &amp; Empower Lives
            </h1>
          </div>
          <div className="col-12 col-lg-5 mb-3 mb-lg-0 d-flex justify-content-center">
            <div className="w-100 d-flex flex-column align-items-center">
              <img
                src={salesdonationImage}
                alt="Donation Possibility"
                className="img-fluid rounded-4 shadow mx-auto w-100 w-md-75 w-lg-75"
                style={{ maxHeight: 260, objectFit: "cover", maxWidth: 400 }}
              />
              <div className="text-center mt-3">
                <h4 className="text-success fw-semibold mb-1" style={{ fontSize: "1.1rem" }}>Support Our Mission</h4>
                <p className="text-muted" style={{ fontSize: "0.98rem" }}>
                  Your donation helps us reach more people in need. Every contribution, big or small, makes a difference!
                </p>
              </div>
            </div>
          </div>
          <div id='maindonate' className="col-12 col-lg-7">
            <div className="card shadow-lg border-0 rounded-4 p-2 p-md-4">
              <div className="card-body">
                <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
                  {/* Hidden fields for emailjs */}
                  <input type="hidden" name="title" />
                  <input type="hidden" name="time" />
                  <input type="hidden" name="ammount" />

                  {/* Amount & Currency */}
                  <div className="mb-3">
                    <label className="fw-semibold mb-2">Choose Amount</label>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {predefinedAmounts.map((amt) => (
                        <button
                          type="button"
                          key={amt}
                          className={`btn amount-btn py-1 px-2${selectedAmount === amt ? " selected" : ""}`}
                          style={{ fontSize: "0.95rem" }}
                          onClick={() => handleAmountClick(amt)}
                        >
                          {amt}
                        </button>
                      ))}
                      <input
                        type="text"
                        className="form-control ms-2"
                        style={{ width: 90, display: "inline-block", fontSize: "0.95rem", height: "32px" }}
                        placeholder="Custom"
                        value={customAmount}
                        onChange={handleCustomAmount}
                      />
                      <select
                        className="form-select ms-2"
                        style={{ width: 90, fontSize: "0.95rem", height: "32px" }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        {currencies.map((cur) => (
                          <option key={cur.code} value={cur.code}>{cur.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Name & Contact */}
                  <div className="row g-2 mb-2">
                    <div className="col-12 col-md-6">
                      <label className="fw-semibold" style={{ fontSize: "0.95rem" }}>
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                        style={{ fontSize: "0.95rem", height: "32px" }}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="fw-semibold" style={{ fontSize: "0.95rem" }}>
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 017xxxxxxxx"
                        style={{ fontSize: "0.95rem", height: "32px" }}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="fw-semibold" style={{ fontSize: "0.95rem" }}>
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      style={{ fontSize: "0.95rem", height: "32px" }}
                    />
                  </div>
                  {/* Message */}
                  <div className="mb-2">
                    <label className="fw-semibold" style={{ fontSize: "0.95rem" }}>
                      Message <span className="text-muted">(optional)</span>
                    </label>
                    <textarea
                      className="form-control"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Describe your donation or leave a message..."
                      style={{ fontSize: "0.95rem" }}
                    />
                  </div>
                  {error && <div className="alert alert-danger py-1 mb-2">{error}</div>}
                  {success && <div className="alert alert-success py-1 mb-2">{success}</div>}
                  <button
                    type="submit"
                    className="btn donate-btn btn-sm w-100 fw-bold rounded-3 mt-2"
                    style={{ fontSize: "1rem", padding: "10px 0" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </span>
                    ) : (
                      <span>
                        <span role="img" aria-label="heart">❤️</span> Donate Now
                      </span>
                    )}
                  </button>
                </form>
                <div className="text-center mt-3" style={{ fontSize: "0.92rem", color: "#888" }}>
                  100% of your donation goes to our mission. Thank you for your support!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Possibility;