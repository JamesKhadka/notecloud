import React from "react";

const About = () => {
  return (
    <div className="container my-3">
      <h1 className="my-3"><b>This is Cloud Storage for your data</b></h1>

      <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
        <div className="card" style={{ width: "35rem" }}>
          <img
            src="https://codewithharry.nyc3.cdn.digitaloceanspaces.com/assets/090fefe24d23d47584f6ddc7eb5a241e.png"
            className="card-img-top"
            alt="Cloud Computing"
          />
          <div className="card-body">
            <h5 className="card-title"><b>Guide [CodeWithHarry]</b></h5>
            <p className="card-text">
              Welcome to CodeWithHarry. Learn Web Development. Confused on which course to take? I have got you covered. Browse courses and find out the best course for you. It's free! Code With Harry is my attempt to teach basics and those coding techniques to people in a short time which took me ages to learn.
            </p>
            <a href="https://www.codewithharry.com/" className="btn btn-success">Website</a>
          </div>
        </div>

        <div className="card" style={{ width: "35rem" }}>
          <img
            src="https://www.datocms-assets.com/48294/1680588724-future-of-cloud-computing-6-cloud-computing-has-redefined-the-tech-industry.jpeg?auto=format"
            className="card-img-top"
            alt="Cloud Computing"
          />
          <div className="card-body">
            <h5 className="card-title"><b>Student [James Khadka]</b></h5>
            <p className="card-text">
              Welcome to my portfolio. Meet James Khadka, a 24-year-old from Damak, Nepal, who's currently rocking his BSc CSIT studies. I'm not just about hitting the books though, James lives for football and volleyball, and is pretty awesome at both. But that's not all – also a smooth talker with a knack for making friends wherever he goes. When he's not on the field or hitting the books, you'll find him exploring new places and soaking in different cultures. James is the ultimate go-getter who's always up for a challenge and ready to make every moment count!
            </p>
            <a href="https://kganesh.com.np/" className="btn btn-success">Website</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

