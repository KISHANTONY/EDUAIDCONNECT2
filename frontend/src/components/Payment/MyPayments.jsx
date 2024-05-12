import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProofModal from "./ProofModal";

const MyPayments = () => {
  const { user } = useContext(Context);
  const [payments, setPayments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [proofImageUrl, setProofImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Student") {
        axios
          .get("http://localhost:4000/api/v1/payment/Student/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setPayments(res.data.payments);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/payment/Reqseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setPayments(res.data.payments);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deletePayment = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/payment/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setPayments((prevPayment) =>
            prevPayment.filter((payment) => payment._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setProofImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_payments page">
      {user && user.role === "Sponsor" ? (
        <div className="container">
          <h1>YOUR PAYMENTS</h1>
          {payments.length <= 0 ? (
            <>
              {" "}
              <h4>No Payments Found</h4>{" "}
            </>
          ) : (
            payments.map((element) => {
              return (
                <ReqseekerCard
                  element={element}
                  key={element._id}
                  deletePayment={deletePayment}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Payments</h1>
          {payments.length <= 0 ? (
            <>
              <h4>No Payments Found</h4>
            </>
          ) : (
            payments.map((element) => {
              return (
                <StudentCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ProofModal imageUrl={proofImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyPayments;

const ReqseekerCard = ({ element, deletePayment, openModal }) => {
  return (
    <>
      <div className="request_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="proof">
          <img
            src={element.proof.url}
            alt="proof"
            onClick={() => openModal(element.proof.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deletePayment(element._id)}>
            Delete 
          </button>
        </div>
      </div>
    </>
  );
};

const StudentCard = ({ element, openModal }) => {
  return (
    <>
      <div className="request_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="proof">
          <img
            src={element.proof.url}
            alt="proof"
            onClick={() => openModal(element.proof.url)}
          />
        </div>
      </div>
    </>
  );
};
