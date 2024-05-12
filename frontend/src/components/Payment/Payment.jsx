import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
const Payment = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [proof, setProof] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const proof = event.target.files[0];
    setProof(proof);
  };

  const { id } = useParams();
  const handlePayment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("proof", proof);
    formData.append("requestId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/payment/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setProof("");
      toast.success(data.message);
      navigateTo("/request/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Student")) {
    navigateTo("/");
  }

  return (
    <section className="payment">
      <div className="container">
        <h3>PAYMENT</h3>
        <form onSubmit={handlePayment}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            placeholder="Say Something..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Payment proof
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">DONE</button>
        </form>
      </div>
    </section>
  );
};

export default Payment;
