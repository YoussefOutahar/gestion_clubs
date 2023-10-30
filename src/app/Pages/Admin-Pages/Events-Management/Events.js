import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { styled, Box, Button , Card, CardContent, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import EventsService from '../../../DataBase/services/EventsService'

const localizer = momentLocalizer(moment);
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Events = () => {

  const [events, setEvents] = useState([]);
  const [club, setClub] = useState([]);


  const [searchDate, setSearchDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await EventsService.getEvents();
      if (fetchedEvents) {
        setEvents(fetchedEvents);
      }
    };
    fetchEvents();
  }, []);

  /*useEffect(() => {
    const fetchSelectedClub = async () => {
      if(selectedEvent != null) {
        let eventClub = await EventsService.getEventClub(selectedEvent.id);
      console.log(eventClub)
      setClub(eventClub)
      console.log(club)
      }
    }
  
    fetchSelectedClub();
  }, [selectedEvent]);*/

  const handleSearchDateChange = (date) => {
    setSearchDate(date);
  };

  const handleEventSelect = async (event) => {
    setSelectedEvent(event);
  };
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [clubToDelete, setClubToDelete] = useState(null);

  const handleDelete = (club) => {
    //setOpenDeleteDialog(true);
    //setClubToDelete(club);
  };

  const handleClose = () => {
    //setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    /*await ClubsService.deleteClub(clubToDelete.id);
    const fetchClubs = async () => {
      const fetchedClubs = await ClubsService.getClubs();
      if (fetchedClubs) {
        setClubs(fetchedClubs);
      }
    };

    ClubsService.fetchClubs();
    setOpenDeleteDialog(false);*/
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = moment(event.Date).startOf('day');
    const searchDateFormatted = searchDate ? moment(searchDate).startOf('day') : null;

    const isMatchedDate = searchDateFormatted ? eventDate.isSame(searchDateFormatted) : true;

    return isMatchedDate;
  });

  const eventComponents = filteredEvents.map((event) => {
    if (event.state == 'active') {
      return {
        ...event,
        start: moment(event.Date).toDate(),
        end: moment(event.Date).toDate(),
      };
    }
  });

  return (
    <div className="events-container">
      {selectedEvent ? (
        <>
          {/*<div className="event-details">
          <button className="back-button" onClick={() => setSelectedEvent(null)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2>{selectedEvent.Name}</h2>
          <img src={selectedEvent.img} alt="Event" className="event-image" />
          <div className="event-description">
            <p>Location: {selectedEvent.Location}</p>
            <p>Description: {selectedEvent.description}</p>
          </div>
      </div>*/}
          <button className="back-button" onClick={() => setSelectedEvent(null)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <Typography variant="h6" component="div" sx={{ textAlign: 'center', mb: 1, fontSize: 25, fontWeight: 'bold' }}>
            {selectedEvent.name} {/* Display the title */}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={selectedEvent.img} alt={selectedEvent.name} style={{ width: '350px', marginLeft: '50px', marginRight: '50px' }} /> {/* Display the image with 100px width */}
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '650px' }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ textAlign: 'left', mb: 1, fontSize: 16, fontWeight: 'bold' }}>
                  Location : {selectedEvent.location}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'left', mb: 1, fontSize: 16, fontWeight: 'bold' }}>
                  Description : {selectedEvent.description}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'left', mb: 1, fontSize: 16, fontWeight: 'bold' }}>
                  Mission : {selectedEvent.name}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  style={{ marginLeft: 'auto', marginTop: '16px', marginRight: '8px', backgroundColor: '#dc3545' }}
                  onClick={() => handleDelete(selectedEvent)} // Call the handleDelete function
                > Delete
                </Button>
              </CardContent>
            </Card>
            <Dialog open={openDeleteDialog} onClose={handleClose}>
              <DialogTitle>Delete Club</DialogTitle>
              <DialogContent>
                <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <StyledButton variant="contained" color="secondary" href="/new_event">
                New Event
              </StyledButton>
            </Box>
          </div>
          <div className="calendar-container">
            <Calendar
              localizer={localizer}
              events={eventComponents}
              startAccessor="date"
              endAccessor="date"
              titleAccessor="name"
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
