import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Postreq = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Gender, setGender] = useState("");
  const [UPI, setUPI] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [fixedAmount, setFixedAmount] = useState("");
  const [marklist, setMarklist] = useState(null); // New state for marklist

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Function to handle file input changes for marklist
  const handleFileChange = (event) => {
    const marklistFile = event.target.files[0];
    setMarklist(marklistFile);
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("Gender", Gender);
    formData.append("UPI", UPI);
    formData.append("city", city);
    formData.append("location", location);
    formData.append("fixedAmount", fixedAmount); // Append fixedAmount to form data
    formData.append("marklist", marklist); // Append marklist to form data

    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  if (!isAuthorized || (user && user.role !== "Student")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW REQUEST</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name"
              />
              <select
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={UPI}
                onChange={(e) => setUPI(e.target.value)}
                placeholder="UPI"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="College"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Address"
            />
            <div className="Amount_wrapper">
              <div>
                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={fixedAmount}
                  onChange={(e) => setFixedAmount(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label>Marklist</label>
              <input
                type="file"
                accept=".pdf, .jpg, .png"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Reason"
            />
            <button type="submit">Done</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Postreq;
