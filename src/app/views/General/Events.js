import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getEvents , getEventClub } from '../../DataBase/Clients/EventsClient';

const localizer = momentLocalizer(moment);

const Events = () => {
  
  const [events, setEvents] = useState([]);
  const [club , setClub] = useState([]);

  
  const [searchDate, setSearchDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
  const fetchEvents = async () => {
    const fetchedEvents = await getEvents();
    if (fetchedEvents) {
      setEvents(fetchedEvents);
    }
  };
  fetchEvents();
}, []);

useEffect(() => {
  const fetchSelectedClub = async () => {
    if(selectedEvent != null) {
      let eventClub = await getEventClub(selectedEvent.id);
    console.log(eventClub)
    setClub(eventClub)
    console.log(club)
    }
  }

  fetchSelectedClub();
}, [selectedEvent]);

  const handleSearchDateChange = (date) => {
    setSearchDate(date);
  };

  const handleEventSelect = async (event) => {
    setSelectedEvent(event);
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = moment(event.Date).startOf('day');
    const searchDateFormatted = searchDate ? moment(searchDate).startOf('day') : null;

    const isMatchedDate = searchDateFormatted ? eventDate.isSame(searchDateFormatted) : true;

    return isMatchedDate;
  });

  const eventComponents = filteredEvents.map((event) => {
    return {
      ...event,
      start: moment(event.Date).toDate(),
      end: moment(event.Date).toDate(),
    };
  });

  return (
    <div className="events-container">
      {selectedEvent ? (
        <>
          <h2>Event's Details</h2>
          <div className="event-details">
            <button className="back-button" onClick={() => setSelectedEvent(null)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h3>{selectedEvent.Name}</h3>
            {/* <p>Club: {club[0].name}</p> */}
            <p>Location: {selectedEvent.Location}</p>
            <p>Description: {selectedEvent.description}</p>
          </div>
        </>
      ) : (
        <>
          <h1>Events</h1>
          <div className="search-section">
            <div className="search-item">
              <label htmlFor="search-date">Search by Date:</label>
              <input id="search-date" type="date" value={searchDate} onChange={(e) => handleSearchDateChange(e.target.value)} />
            </div>
          </div>
          <div className="calendar-container">
            <Calendar
              localizer={localizer}
              events={eventComponents}
              startAccessor="Date"
              endAccessor="Date"
              titleAccessor="Name"
              views={['month']}
              defaultView="month"
              onSelectEvent={handleEventSelect}
            />
          </div>
        </>
      )}
      <style jsx>{`
        .events-container {
          padding: 20px;
          text-align: center;
        }

        h1 {
          font-family: Montserrat, sans-serif;
          letter-spacing: 2px;
          font-size: 35px;
          font-weight: 400;
          margin: 0 0 20px;
        }

        .event-details {
          margin-bottom: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
          text-align: left;
          background-color: #f9f9f9;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .event-details h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .event-details h3 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .event-details p {
          font-size: 16px;
          margin-bottom: 5px;
        }

        /* Add the following styles to adjust the section's position */
        .events-container {
          position: relative;
        }

        .event-details {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          max-width: 400px;
          background-color: #f9f9f9;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        @media screen and (max-width: 480px) {
          .event-details {
            width: 90%;
          }
        }

        .search-section {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .search-item {
          margin-right: 20px;
        }

        .search-item label {
          font-weight: bold;
          margin-right: 10px;
        }

        .search-item input[type='date'],
        .search-item input[type='text'] {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        .search-item input[type='date']:focus,
        .search-item input[type='text']:focus {
          outline: none;
          border-color: #4285f4;
          box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.2);
        }

        .calendar-container {
          height: 500px;
          text-align: center;
        }

        .back-button {
          background-color: #ccc;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .back-button:hover {
          background-color: #999;
        }

        .events-container h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
      `}</style>
    </div>
  );
};

export default Events;
