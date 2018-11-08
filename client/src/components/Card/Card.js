import React from "react";
import "../Card/Card.css";

const Card = props => (
  <div className="main-card-div">
    {props.eventUsers.map(user => (
      <div key={user.id}>
        <div className="card">
          <div className="card-header bg-info"></div>
          <div className="card-body">
            <div className="header-div">
              <div className="user-photo-div">
                <img src={user.photo} className="user-photo" alt="Card"/>
              </div>
              <div className="header-info">
                <h3>{user.name}</h3>
                {/* <h5>{user.email}</h5> */}
                <a href={`mailto:${user.email}`} 
                  rel="noopener noreferrer" 
                  className="links"
                  >{user.email}</a>
                <p>{user.phone}</p>
              </div>
            </div>
            <div className="social-div">
              <div className="social-inner twitter">
                <div className="contact-image mr-2">
                  <i className="fab fa-twitter"></i>
                </div>
                <a href={`http://www.twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="links">{user.twitter ? user.twitter : ""}</a>
              </div>
              <div className="social-inner fb">
                <div className="contact-image mr-2">
                  <i className="fab fa-facebook"></i>
                </div>
                <a href={`http://www.facebook.com/${user.fb}`} target="_blank" rel="noopener noreferrer" className="links">{user.fb}</a>
              </div>
              <div className="social-inner linkedin">
                <div className="contact-image mr-2">
                  <i className="fab fa-linkedin"></i>
                </div>
                <a href={`http://www.linkedin.com/in/${user.link}`} target="_blank" rel="noopener noreferrer" className="links">{user.link}</a>
              </div>
              <div className="social-inner github">
                <div className="contact-image mr-2">
                  <i className="fab fa-github"></i>
                </div>
                <a href={`http://www.github.com/${user.git}`} target="_blank" rel="noopener noreferrer" className="links">{user.git}</a>
              </div>
              <button className="btn btn-danger export-button">Export
                <i className="fas fa-download"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
  
  export default Card;