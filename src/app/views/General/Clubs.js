import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getClubs,deleteClub } from '../../DataBase/Clients/ClubsClient';
import { getEtudiantByMembre, getMembresByClub } from "../../DataBase/Clients/MembersClient";

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

  const [clubs, setClubs] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
  const fetchClubs = async () => {
    const fetchedClubs = await getClubs();
    if (fetchedClubs) {
      setClubs(fetchedClubs);
    }
  };
  
  fetchClubs();
}, []);

useEffect(() => {
  const fetchMembers = async () => {
    if (clubs[activeClub] && activeClub !== null) {
      const data = await getMembresByClub(clubs[activeClub].id);
      const membresWithEtudiants = await Promise.all(
          data.map(async (membre) => {
              const etudiant = await getEtudiantByMembre(membre.id_etd);
              return { ...membre, Etudiants: etudiant[0] };
          })
      );
      setMembers(membresWithEtudiants);
        }
  };
  fetchMembers();
}, [activeClub, clubs]);


  const handleLearnMore = (index) => {
    setActiveClub(index);
    setShowDetails(true);
  };

  const handleBackToTop = () => {
    setShowDetails(false);
    setActiveClub(null);
  };

  const handleDeleteClub = async () => {
    if (activeClub !== null) {
      const confirmation = window.confirm('Are you sure you want to delete this club?');
      if (confirmation) {
        const clubToDelete = clubs[activeClub];
        await deleteClub(clubToDelete.id);

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
              <img src={clubs[activeClub].logo} alt={`Logo ${clubs[activeClub].nom}`} />
            </div>
            <div className="club-info">
              <div className="back-icon" onClick={handleBackToTop}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <h2>{clubs[activeClub].nom}</h2>
              <p>{clubs[activeClub].description}</p>
              <h3>Members:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Filed</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={index}>
                      <td>{member.Etudiants.nom}</td>
                      <td>{member.role}</td>
                      <td>{member.Etudiants.filiere}</td>
                      <td>{member.Etudiants.email}</td>
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
