import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {styled,Box,Button} from "@mui/material";

import MeetingsService from "../../../DataBase/services/MeetingsService";

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));


const localizer = momentLocalizer(moment);

const Meetings = () => {
  
  const [events, setEvents] = useState([]);

  //const [searchDate, setSearchDate] = useState(null);
  //const [searchClub, setSearchClub] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [role, setRole] = useState("");

  /*const handleSearchDateChange = (date) => {
    setSearchDate(date);
  };*/

  /*const handleSearchClubChange = (event) => {
    setSearchClub(event.target.value);
  };*/

  const handleEventSelect = async (event) => {
    setSelectedEvent(event);
  };

  const handleDeleteMeeting = async () => {
    if (selectedEvent !== null) {
      const confirmation = window.confirm('Are you sure you want to delete this club?');
      if (confirmation) {
        const { id } = selectedEvent;
      console.log("Deleting meeting:", selectedEvent);
      await MeetingsService.deleteMeeting(id);
        setSelectedEvent(null);
      }
    }
  };

  /*const filteredEvents = events.filter((event) => {
    const eventDate = moment(event.start).startOf('day');
    const searchDateFormatted = searchDate ? moment(searchDate).startOf('day') : null;

    const isMatchedDate = searchDateFormatted ? eventDate.isSame(searchDateFormatted) : true;
    const isMatchedClub = searchClub ? event.club.toLowerCase().includes(searchClub.toLowerCase()) : true;

    return isMatchedDate && isMatchedClub;
  });

  const eventComponents = filteredEvents.map((event) => {
    return {
      ...event,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
    };
  });*/
  const eventComponents = events.map((event) => {
    return {
      ...event,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
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
            {/*<h3>{selectedEvent.Name}</h3>*/}
            <p>Location: {selectedEvent.location}</p>
            <p>Description: {selectedEvent.description}</p>
            <div>
          {/*<button className="delete-club-button" onClick={handleDeleteMeeting}>
            Delete Club
      </button>*/}
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <Link to={`/update_meeting/${selectedEvent.id}`}>
          <StyledButton variant="contained" color="inherit" >
                Edit
            </StyledButton>
            </Link>
            <StyledButton variant="contained" color="secondary" onClick={handleDeleteMeeting}>
                Delete
            </StyledButton>
            </Box>
        </div>

          </div>
        </>
      ) : (
        <>
          <h1>Meetings</h1>
          <div className="search-section">
            <Box display="flex" justifyContent="space-between" alignItems="center">
            {role == "admin" ? (
              <StyledButton variant="contained" color="secondary" href="/new_meeting">
              New meeting
          </StyledButton>
            ) : (
              <></>  
            )
            }
            </Box>
          </div>
          <div className="calendar-container">
            <Calendar
              localizer={localizer}
              events={eventComponents}
              startAccessor="Date"
              endAccessor="Date"
              titleAccessor="description"
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

export default Meetings;
