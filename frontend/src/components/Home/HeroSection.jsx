import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    
  ];
  return (
    <>
      <div className="heroSection">
          <div className="cover">
            <div className="information">
              <h1>-</h1>
              <h2>We rise by</h2>
              <h1><span>Lifting others</span></h1>
              <h3>- Robert Ingersoll</h3>
              <h1>-</h1>
            </div>
          </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
      <div className="about">
    <div className="imgcontanner">
        <div className="aboutimg"></div>
    </div>
    <div className="aboutcontent">
        <h5>_</h5>
        <h1>Why Donate?</h1>
        <p>We know that students are looking for a platform to seek financial assistance
            for their education.
            So we connect students with potential donors, scholarships, and
            other funding opportunities
            and empower students to overcome financial barriers and
            succeed academically.</p>

        <br />
        <br />
        <h5>_</h5>
    </div>
</div>

    </>
  );
};

export default HeroSection;
