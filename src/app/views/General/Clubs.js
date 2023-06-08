import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Clubs = () => {
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
      description: 'Description du Club 1',
      buttonLabel: 'En savoir plus',
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 2',
      description: 'Description du Club 2',
      buttonLabel: 'En savoir plus',
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 3',
      description: 'Description du Club 3',
      buttonLabel: 'En savoir plus',
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 4',
      description: 'Description du Club 4',
      buttonLabel: 'En savoir plus',
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 5',
      description: 'Description du Club 5',
      buttonLabel: 'En savoir plus',
      background: 'white',
    },
    {
      logo: 'https://www.evaair.com/Images/vivn/the-club-logo_tcm43-68807.jpg',
      name: 'Club 6',
      description: 'Description du Club 6',
      buttonLabel: 'En savoir plus',
      background: 'white',
    },
  ];

  return (
    <div className="clubs">
      <h1 style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '2px', fontSize: '35px', fontWeight: '400', margin: '15px 10px' }}>Clubs</h1>
      <Slider {...settings}>
        {clubs.map((club, index) => (
          <div className="card-wrapper" key={index}>
            <div className="card" style={{ background: club.background }}>
              <div className="circle">
                <img src={club.logo} alt={`Logo ${club.name}`} />
              </div>
              <h3>{club.name}</h3>
              <p>{club.description}</p>
              <button>{club.buttonLabel}</button>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx>{`
        .clubs {
          text-align: center;
        }

        .card-wrapper {
          margin: 20px 10px; /* Add margin for spacing on both sides */
          background-color: white
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

        h3 {
          margin: 10px 10px
        }

        p {
          margin: 10px 10px
        }

        .card button {
          background-color: #4CAF50;
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
      `}</style>
    </div>
  );
};

export default Clubs;
