import React from "react";
import "../Card/Card.css";

//create a new vCard
// const contact = vCard();

// //set properties
// contact.firstName = 'Eric';
// contact.middleName = 'J';
// contact.lastName = 'Nesser';
// contact.organization = 'ACME Corporation';
// contact.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
// contact.workPhone = '312-555-1212';
// contact.birthday = new Date('01-01-1985');
// contact.title = 'Software Developer';
// contact.url = 'https://github.com/enesser';
// contact.note = 'Notes on Eric';

// //save to file
// contact.saveToFile('./eric-nesser.vcf');

const Card = props => (
  <div className="main-card-div">
    {props.eventUsers.map(user => (
      <div key={user._id}>
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
            {
              user.twitter
              ?
              <div className="social-inner twitter">
                <div className="contact-image mr-2">
                  <i className="fab fa-twitter"></i>
                </div>
                <a href={`http://www.twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="links">{user.twitter ? user.twitter : ""}</a>
              </div>
              :
              <span></span>
            }
            {
              user.fb
              ?
              <div className="social-inner fb">
                <div className="contact-image mr-2">
                  <i className="fab fa-facebook"></i>
                </div>
                <a href={`http://www.facebook.com/${user.fb}`} target="_blank" rel="noopener noreferrer" className="links">{user.fb}</a>
              </div>
              :
              <span></span>
            }
            {
              user.link
              ?
              <div className="social-inner linkedin">
                <div className="contact-image mr-2">
                  <i className="fab fa-linkedin"></i>
                </div>
                <a href={`http://www.linkedin.com/in/${user.link}`} target="_blank" rel="noopener noreferrer" className="links">{user.link}</a>
              </div>
              :
              <span></span>
            }
            {
              user.git
              ?
              <div className="social-inner github">
                <div className="contact-image mr-2">
                  <i className="fab fa-github"></i>
                </div>
                <a href={`http://www.github.com/${user.git}`} target="_blank" rel="noopener noreferrer" className="links">{user.git}</a>
              </div>
              :
              <span></span>
            }
              {/* <button className="btn btn-danger export-button">Export
                <i className="fas fa-download"></i>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
  
  export default Card;