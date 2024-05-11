import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyReqs = () => {
  const [myReqs, setMyReqs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all Reqs
  useEffect(() => {
    const fetchReqs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/request/getmyReqs",
          { withCredentials: true }
        );
        setMyReqs(data.myReqs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyReqs([]);
      }
    };
    fetchReqs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Student")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (requestId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that request whose ID has been send.
    setEditingMode(requestId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The request
  const handleUpdaterequest = async (requestId) => {
    const updatedrequest = myReqs.find((request) => request._id === requestId);
    await axios
      .put(`http://localhost:4000/api/v1/request/update/${requestId}`, updatedrequest, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting request
  const handleDeleterequest = async (requestId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/request/delete/${requestId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyReqs((prevReqs) => prevReqs.filter((request) => request._id !== requestId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (requestId, field, value) => {
    // Update the request object in the Reqs state with the new value
    setMyReqs((prevReqs) =>
      prevReqs.map((request) =>
        request._id === requestId ? { ...request, [field]: value } : request
      )
    );
  };

  return (
    <>
      <div className="myReqs page">
        <div className="container">
          <h1>Your Posted Requests</h1>
          {myReqs.length > 0 ? (
            <>
              <div className="banner">
                {myReqs.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <span>UPI:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.UPI}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "UPI",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Gender:</span>
                          <select
                            value={element.Gender}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "Gender",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="Male">
                              Male
                            </option>
                            <option value="Female">
                              Female
                            </option>
                          </select>
                        </div>
                        
                        <div>
                          <span>
                            Amount:{" "}
                            {element.fixedAmount ? (
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.fixedAmount}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedAmount",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.AmountFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "AmountFrom",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.AmountTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "AmountTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div>
                          {" "}
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdaterequest(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleterequest(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any requests or may be you deleted all of your Requests!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyReqs;
