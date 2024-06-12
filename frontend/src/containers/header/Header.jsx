import React from "react";
import "./Header.css";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";

const Header = () => {
  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">
        <br></br>
        <br></br>
          Reforming the Future of Drug Discovery
        </h1>
        <p>
        Is someone you care about struggling with drug use? Our system analyzes 
        eye images to identify potential signs associated with
        drug use. This is not a diagnostic tool, but it can be a valuable first step. 
        Take control
        and make informed decisions with cutting-edge ViT Technology.
        </p>
        <div className="gpt3__header-content__input">
          <input type="email" placeholder="Your Email Address" />
          <button type="button">Get Started</button>
        </div>
        {/* <div className="gpt3__header-content__people">
          <img src={people} alt="people" />
          <p></p>
        </div> */}
      </div>
      <div className="gpt3__header-image">
        <img src={ai} alt="ai" />
      </div>
    </div>
  );
};

export default Header;
