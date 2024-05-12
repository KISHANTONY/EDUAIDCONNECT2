import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import MarklistModal from "./MarklistModal";
const ReqDetails = () => {
  const [modalOpen, setModalOpen] = useState(false); // State for controlling modal visibility
  const [marklistUrl, setMarklistUrl] = useState("");
  const { id } = useParams();
  const [request, setrequest] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);
  const openModal = (url) => {
    setMarklistUrl(url);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/request/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setrequest(res.data.request);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="requestDetail page">
      <div className="container">
        <h3>Student Details</h3>
        <div className="banner">
          <p>
            Name: <span> {request.title}</span>
          </p>
          <p>
            Gender: <span>{request.Gender}</span>
          </p>
          <p>
            UPI: <span>{request.UPI}</span>
          </p>
          <p>
            College: <span>{request.city}</span>
          </p>
          <p>
            Location: <span>{request.location}</span>
          </p>
          <p>
            Description: <span>{request.description}</span>
          </p>
          <p>
            Posted On: <span>{request.requestPostedOn}</span>
          </p>
          <p>
            Amount:{" "}
            {request.fixedAmount ? (
              <span>{request.fixedAmount}</span>
            ) : (
              <span>
                {request.AmountFrom} - {request.AmountTo}
              </span>
            )}
          </p>
          {request.marklist && request.marklist.url && (
            <div>
              <p>Marklist:</p>
              <img
                src={request.marklist.url}
                alt="Marklist"
                onClick={() => openModal(request.marklist.url)}
              />
            </div>
          )}
          {user && user.role === "Student" ? (
            <></>
          ) : (
            <Link to={`/payment/${request._id}`}>Pay Now</Link>
          )}
        </div>
      </div>
      {modalOpen && (
        <MarklistModal marklistUrl={marklistUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default ReqDetails;
