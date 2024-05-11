import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div class="service" id="service">

      <div className="service" id="service">
      <h5>SERVICES</h5>
      <div className="details">
        <div className="info">
          <div className="logo"><i className="fas fa-book-reader"></i></div>
          <p id="head">What we do</p>
          <p>We help underprivileged students with financial support for their better education</p>
        </div>
        <div className="info" data-aos="fade-up">
          <div className="logo"><i className="fas fa-book-open"></i></div>
          <p id="head">How we do it</p>
          <p>We allow potential donors to connect with students through our website</p>
        </div>
        <div className="info" data-aos="fade-up">
          <div className="logo"><i className="fas fa-book"></i></div>
          <p id="head">Make a difference</p>
          <p>Provide equal opportunities to students in their academics</p>
        </div>
      </div>
    </div>

<div className="contact" id="contact">
      <h1>CONTACT US</h1>
      <br/>
      <div className="contactcontanner">
        <div className="contanner">
          <div className="heading">
            <div className="icon"><i className="far fa-map"></i></div>
            <div className="info">
              <p>Address :</p>
              <p id="contactinfo">Fisat,Mookanoor,Angamaly</p>
            </div>
          </div>
          <div className="heading">
            <div className="icon"><i className="fas fa-phone-alt"></i></div>
            <div className="info">
              <p>Phone :</p>
              <p id="contactinfo">9048625492</p>
            </div>
          </div>
          <div className="heading">
            <div className="icon"><i className="far fa-envelope"></i></div>
            <div className="info">
              <p>Emails :</p>
              <p id="contactinfo">eduAidConnect@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="messageform">
          <div className="form">
            <form action="https://api.web3forms.com/submit" method="POST">
              <style>
                {`
                  ::placeholder {color: rgba(255, 255, 255, 0.7);}
                `}
              </style>
              <input type="hidden" name="access_key" value="8483b16a-3bc2-41cc-9215-3c9a74e66d9c"/>
              <input type="text" name="name" placeholder="NAME" required/>
              <input type="email" name="email" placeholder="EMAIL" required/>
              <input type="text" name="subject" placeholder="SUBJECT" required/>
              <textarea type="message" name="message" id="inputbox" cols="30" rows="5" placeholder="MESSAGE" required></textarea>
              <button type="submit">SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </div>
    </div>

</div>


    </>
  );
};

export default HowItWorks;
