import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Clubs = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeClub, setActiveClub] = useState(null);
  const [joinFormVisible, setJoinFormVisible] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const clubs = [
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 1',
      description: 'Description du Club 1 ',
      buttonLabel: 'Join Us',
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 2',
      description: 'Description du Club 2',
      buttonLabel: 'Join Us',
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 3',
      description: 'Description du Club 3',
      buttonLabel: 'Join Us',
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 4',
      description: 'Description du Club 4',
      buttonLabel: 'Join Us',
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 5',
      description: 'Description du Club 5',
      buttonLabel: 'Join Us',
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 6',
      description: 'Description du Club 6',
      buttonLabel: 'Join Us',
      background: 'white',
    },
  ];

  const handleLearnMore = (index) => {
    setActiveClub(index);
    setShowDetails(true);
  };

  const handleBackToTop = () => {
    setShowDetails(false);
    setActiveClub(null);
    setJoinFormVisible(false);
  };

  const handleJoinUs = (index) => {
    setActiveClub(index);
    setJoinFormVisible(true);
  };

  return (
    <div className="clubs">
      <h1>Clubs</h1>
      {showDetails ? (
        <div>
          <div onClick={handleBackToTop} className="back-icon">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className="club-details-container">
            <div className={`club-details ${activeClub !== null ? 'active' : ''}`}>
              <div className="club-icon">
                <img src={clubs[activeClub].logo} alt={`Logo ${clubs[activeClub].name}`} />
              </div>
              {joinFormVisible ? (
                <div className="join-form">
                  <h3>Join {clubs[activeClub].name}</h3>
                  <form>
                    <div className="form-group">
                      <input type="text" placeholder="Name" />
                    </div>
                    <div className="form-group">
                      <input type="email" placeholder="Email" />
                    </div>
                    <button>Submit</button>
                  </form>
                </div>
              ) : (
                <div className="club-info">
                  <h2>{clubs[activeClub].name}</h2>
                  <p>{clubs[activeClub].description}</p>
                  <button onClick={() => handleJoinUs(activeClub)} className="join-button">Join Us</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Slider {...settings}>
          {clubs.map((club, index) => (
            <div className="card-wrapper" key={index}>
              <div className="card" style={{ background: club.background }}>
                <div className="circle">
                  <img src={club.logo} alt={`Logo ${club.name}`} />
                </div>
                <h3>{club.name}</h3>
                {!showDetails && (
                  <button onClick={() => handleLearnMore(index)}>En savoir plus</button>
                )}
              </div>
            </div>
          ))}
        </Slider>
      )}
      <style jsx>{`
        /* Existing styles... */
/* Existing styles... */

	.clubs {
          text-align: center;
        }

        h1 {
          font-family: Montserrat, sans-serif;
          letter-spacing: 2px;
          font-size: 35px;
          font-weight: 400;
          margin: 15px 10px;
        }

        .card-wrapper {
          margin: 20px 10px;
          background-color: white;
        }

        .card {
          padding: 20px;
          border-radius: 5px;
        }

        .circle {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        h3 {
          margin: 10px 10px;
        }

        p {
          margin: 10px 10px;
        }

        .card button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .card button:hover {
          background-color: #45a049;
        }

        .club-details-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 40px;
          
        }

        .club-details {
          display: flex;
          align-items: center;
          width: 500px;
          background-color: #f5f5f5;
          padding: 20px;
          margin: 10px;
          border-radius: 5px;
          text-align: center;
          transition: transform 0.3s ease-in-out;
          border-radius: 5px;
          text-align: left;
          transition: transform 0.3s ease-in-out;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .club-details.active {
          transform: scale(1.1);
        }

        .club-icon {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 20px;
        }

        .club-info {
          text-align: left;
        }

        .back-icon {
          cursor: pointer;
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }

        .join-form {
          margin-top: 20px;
          text-align: center;
        }

        .join-form h3 {
          margin-bottom: 10px;
        }

        .join-form form {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .join-form input {
          margin-bottom: 10px;
          padding: 5px;
          width: 200px;
        }

        .join-form button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .join-form button:hover {
          background-color: #45a049;
        }

        .join-button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
      
        .join-button:hover {
          background-color: #45a049;
        }

        .join-button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .join-button:hover {
          background-color: #45a049;
        }
        /* Add or modify styles as needed */
        .join-form {
          margin-top: 20px;
          text-align: center;
        }

        .join-form h3 {
          margin-bottom: 10px;
        }

        .join-form form {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .join-form .form-group {
          margin-bottom: 15px;
        }

        .join-form .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .join-form .form-group input,
        .join-form .form-group textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 300px;
          max-width: 100%;
        }

        .join-form button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .join-form button:hover {
          background-color: #45a049;
        }

        .join-button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .join-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default Clubs;