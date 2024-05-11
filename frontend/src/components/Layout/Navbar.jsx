import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <h3><span>EduAid</span>Connect</h3>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          {user && user.role === "Sponsor" && (
            <li>
              <Link to={"/request/getall"} onClick={() => setShow(false)}>
                REQUESTS
              </Link>
            </li>
          )}
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Student"
                ? "PAYMENT NOTIFICATIONS"
                : "YOUR PAYMENTS"}
            </Link>
          </li>
          {user && user.role === "Student" && (
            <>
              <li>
                <Link to={"/request/post"} onClick={() => setShow(false)}>
                  POST NEW REQUEST
                </Link>
              </li>
              <li>
                <Link to={"/request/me"} onClick={() => setShow(false)}>
                  VIEW YOUR REQUESTS
                </Link>
              </li>
            </>
          )}
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
