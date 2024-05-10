import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div class="service" id="service">

<h5>SERVICES</h5>

<div class="details">

    <div class="info">

        <div class="logo"><i class="fas fa-book-reader"></i></div>
        <p id="head">What we do</p>
        <p>We help underprivileged students with financial support for their better education</p>

    </div>

    <div class="info" data-aos="fade-up">

        <div class="logo"><i class="fas fa-book-open"></i></div>
        <p id="head">How we do it</p>
        <p>We allow potential donors to connect with students through our website</p>
    </div>

    <div class="info" data-aos="fade-up">

        <div class="logo"><i class="fas fa-book"></i></div>
        <p id="head">Make a difference</p>
        <p>Provide equal opportunities to students in their accademics</p>

    </div>


</div>

</div>


    </>
  );
};

export default HowItWorks;
