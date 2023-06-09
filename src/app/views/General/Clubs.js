import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Clubs = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeClub, setActiveClub] = useState(null);

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
      name: 'Club de débat',
      description: 'Offre aux étudiants la possibilité d améliorer leurs compétences.',
      members: [
        { name: 'Member 1', email: 'member1@example.com', status: 'Active', position: 'President', startDate: '2022-01-01' },
        { name: 'Member 2', email: 'member2@example.com', status: 'Inactive', position: 'Assistant', startDate: '2022-02-01' },
        { name: 'Member 3', email: 'member3@example.com', status: 'Active', position: 'Intern', startDate: '2022-03-01' },
        { name: 'Member 4', email: 'member2@example.com', status: 'Inactive', position: 'Assistant', startDate: '2022-02-01' },
        { name: 'Member 5', email: 'member3@example.com', status: 'Active', position: 'Intern', startDate: '2022-03-01' },
      ],
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club de théâtre',
      description: 'Permet aux étudiants passionnés de théâtre de développer leurs talents artistiques.',
      members: [
        { name: 'Member 1', email: 'member1@example.com', status: 'Active', position: 'President', startDate: '2022-01-01' },
        { name: 'Member 2', email: 'member2@example.com', status: 'Inactive', position: 'Assistant', startDate: '2022-02-01' },
        { name: 'Member 3', email: 'member3@example.com', status: 'Active', position: 'Intern', startDate: '2022-03-01' },
      ],
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club Entrepreneuriat',
      description: 'Encourage les étudiants à explorer et à développer leurs idées commerciales.',
      members: [
        { name: 'Member 1', email: 'member1@example.com', status: 'Active', position: 'President', startDate: '2022-01-01' },
        { name: 'Member 2', email: 'member2@example.com', status: 'Inactive', position: 'Assistant', startDate: '2022-02-01' },
        { name: 'Member 3', email: 'member3@example.com', status: 'Active', position: 'Intern', startDate: '2022-03-01' },
      ],
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club de journalisme',
      description: 'Offre aux étudiants intéressés par le journalisme et les médias une plateforme pour développer leurs compétences.',
      members: [
        { name: 'Member 1', email: 'member1@example.com', status: 'Active', position: 'President', startDate: '2022-01-01' },
        { name: 'Member 2', email: 'member2@example.com', status: 'Inactive', position: 'Assistant', startDate: '2022-02-01' },
        { name: 'Member 3', email: 'member3@example.com', status: 'Active', position: 'Intern', startDate: '2022-03-01' },
      ],
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club de photographie',
      description: 'Réunit les amateurs de photographie de l université.',
      members: [
        { name: 'Member 1', email: 'member1@example.com', status: 'Active', position: 'President', startDate: '2022-01-01' },
        { name: 'Member 2', email: 'member2@example.com', status: 'Inactive', position: 'Assistant', startDate: '2022-02-01' },
        { name: 'Member 3', email: 'member3@example.com', status: 'Active', position: 'Intern', startDate: '2022-03-01' },
      ],
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club de bénévolat communautaire',
      description: 'Encourage les étudiants à s impliquer dans des initiatives de service à la communauté.',
      members: [
        { name: 'Member 1', email: 'member1@example.com', status: 'Active', position: 'President', startDate: '2022-01-01' },
        { name: 'Member 2', email: 'member2@example.com', status: 'Inactive', position: 'Assistant', startDate: '2022-02-01' },
        { name: 'Member 3', email: 'member3@example.com', status: 'Active', position: 'Intern', startDate: '2022-03-01' },
      ],
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
  };

  const handleDeleteClub = () => {
    if (activeClub !== null) {
      const confirmation = window.confirm('Are you sure you want to delete this club?');
      if (confirmation) {
        const updatedClubs = [...clubs];
        updatedClubs.splice(activeClub, 1);
        // Update the clubs array or perform any other necessary actions
        setShowDetails(false);
        setActiveClub(null);
      }
    }
  };

  return (
    <div className="clubs">
      <h1>Clubs</h1>
      {showDetails && (
        <div>
          <button className="delete-club-button" onClick={handleDeleteClub}>
            Delete Club
          </button>
        </div>
      )}
      {showDetails ? (
        <div className="overflow-x-scroll">
          <div className={`club-details ${activeClub !== null ? 'active' : ''}`}>
            <div className="club-icon">
              <img src={clubs[activeClub].logo} alt={`Logo ${clubs[activeClub].name}`} />
            </div>
            <div className="club-info">
              <div className="back-icon" onClick={handleBackToTop}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <h2>{clubs[activeClub].name}</h2>
              <p>{clubs[activeClub].description}</p>
              <h3>Members:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Position</th>
                    <th>Start Date</th>
                  </tr>
                </thead>
                <tbody>
                  {clubs[activeClub].members.map((member, index) => (
                    <tr key={index}>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.status}</td>
                      <td>{member.position}</td>
                      <td>{member.startDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
        .clubs {
          text-align: center;
        }
        h1 {
          font-family: Montserrat, sans-serif;
          letter-spacing: 2px;
          font-size: 35px;
          font-weight: 400;
          margin: 25px 10px;
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
          width: 999px;
          background-color: #f5f5f5;
          padding: 20px;
          margin: 150px;
          border-radius: 5px;
          text-align: center;
          transition: transform 0.3s ease-in-out;
          border-radius: 5px;
          text-align: center;
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
          overflow-wrap: break-word;
        }

        .back-icon {
          cursor: pointer;
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }
        .overflow-x-scroll {
          overflow-x: auto;
          white-space: nowrap;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          margin-left: 15px;
        }
        th,
        td {
          padding: 15px 35px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
          text-align: center;
        }
        ul {
          padding-left: 20px;
        }
        .slick-dots {
          bottom: -30px;
        }
        .slick-dots li button:before {
          font-size: 10px;
          color: #000;
        }

        .delete-club-button {
          background-color: #E21818;
          color: #ffffff;
          border: none;
          padding: 20px 40px;
          font-size: 17px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }

        .delete-club-button:hover {
          background-color: #c40000;
        }
      `}</style>
    </div>
  );
};

export default Clubs;
