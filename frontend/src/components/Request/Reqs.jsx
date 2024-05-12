import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Reqs = () => {
  const [reqs, setReqs] = useState([]);
  const [selectedAmountRange, setSelectedAmountRange] = useState("");
  const [filteredReqs, setFilteredReqs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }

    try {
      axios
        .get("http://localhost:4000/api/v1/request/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setReqs(res.data);
          setFilteredReqs(res.data.Reqs); // Initialize filteredReqs with all requests
        });
    } catch (error) {
      console.log(error);
    }
  }, [isAuthorized, navigateTo]);

  const handleAmountRangeChange = (event) => {
    setSelectedAmountRange(event.target.value);
  };

  const filterRequests = () => {
    if (selectedAmountRange === "") {
      setFilteredReqs(reqs.Reqs); // Show all requests if no range is selected
    } else {
      const filtered = reqs.Reqs.filter(
        (element) =>
          (selectedAmountRange === "100-1000" &&
            element.fixedAmount >= 100 &&
            element.fixedAmount < 1000) ||
          (selectedAmountRange === "1000-5000" &&
            element.fixedAmount >= 1000 &&
            element.fixedAmount < 5000) ||
          (selectedAmountRange === "above 5000" && element.fixedAmount >= 5000)
      );
      setFilteredReqs(filtered);
    }
  };

  return (
    <section className="Reqs page">
      <div className="container">
        <h1>REQUESTS</h1>
        <div>
          <label htmlFor="amountRange">Amount Range:</label>
          <select id="amountRange" value={selectedAmountRange} onChange={handleAmountRangeChange}>
            <option value="">All</option>
            <option value="100-1000">100-1000</option>
            <option value="1000-5000">1000-5000</option>
            <option value="above 5000">Above 5000</option>
          </select>
          <button onClick={filterRequests}>Filter</button>
        </div>
        <div className="banner">
          {filteredReqs.map((element) => {
            return (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.Gender}</p>
                <p>Amount: {element.fixedAmount}</p>
                <Link to={`/request/${element._id}`}>DONATE NOW</Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Reqs;
