import { styled,Box, Button,Grid,Table,TableBody,TableCell,TableHead,TableRow} from "@mui/material";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import supabase from "../../DataBase/Clients/SupabaseClient";

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }));

  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));

  const ContentBox1 = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));

  const localizer = momentLocalizer(moment);

const Meetings = () => {

  const [meetings, setMeetings] = useState([]);
  const [searchDate, setSearchDate] = useState(null);
  const [searchClub, setSearchClub] = useState('');
  const [selectedmeeting, setSelectedmeeting] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      const { data, error } = await supabase.from("Meetings").select("*");
      if (error) {
        console.error("Error fetching meetings:", error);
      } else {
        setMeetings(data);
        console.log("Fetched data:", data);
      }
    };
    fetchMeetings();
  }, []);

  const handleSearchDateChange = (date) => {
    setSearchDate(date);
  };

  const handleSearchClubChange = (meeting) => {
    setSearchClub(meeting.target.value);
  };

  const handleMeetingselect = async (meeting) => {
    setSelectedmeeting(meeting);
  };
  const filteredMeetings = Meetings.filter((meeting) => {
    const meetingDate = moment(meeting.start).startOf('day');
    const searchDateFormatted = searchDate ? moment(searchDate).startOf('day') : null;

    const isMatchedDate = searchDateFormatted ? meetingDate.isSame(searchDateFormatted) : true;
    const isMatchedClub = searchClub ? meeting.club.toLowerCase().includes(searchClub.toLowerCase()) : true;

    return isMatchedDate && isMatchedClub;
  });

  const meetingComponents = filteredMeetings.map((meeting) => {
    return {
      ...meeting,
      start: moment(meeting.start).toDate(),
      end: moment(meeting.end).toDate(),
    };
  });


    return (
      <div className="Meetings-container">
      {selectedmeeting ? (
        <>
          <h2>meeting's Details</h2>
          <div className="meeting-details">
            <button className="back-button" onClick={() => setSelectedmeeting(null)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h3>{selectedmeeting.Name}</h3>
            {/* <p>Club: {club[0].name}</p> */}
            <p>Location: {selectedmeeting.location}</p>
            <p>Description: {selectedmeeting.description}</p>
          </div>
        </>
      ) : (
        <>
          <h1>Meetings</h1>
          <div className="search-section">
            <div className="search-item">
              <label htmlFor="search-date">Search by Date:</label>
              <input id="search-date" type="date" value={searchDate} onChange={(e) => handleSearchDateChange(e.target.value)} />
            </div>
            <div className="search-item">
              <label htmlFor="search-club">Search by Club:</label>
              <input id="search-club" type="text" value={searchClub} onChange={handleSearchClubChange} />
            </div>
          </div>
          <div className="calendar-container">
            <Calendar
              localizer={localizer}
              Meetings={meetingComponents}
              startAccessor="Date"
              endAccessor="Date"
              titleAccessor="description"
              views={['month']}
              defaultView="month"
              onSelectmeeting={handleMeetingselect}
            />
          </div>
        </>
      )}
      <style jsx>{`
        .Meetings-container {
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

        .meeting-details {
          margin-bottom: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
          text-align: left;
          background-color: #f9f9f9;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .meeting-details h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .meeting-details h3 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .meeting-details p {
          font-size: 16px;
          margin-bottom: 5px;
        }

        /* Add the following styles to adjust the section's position */
        .Meetings-container {
          position: relative;
        }

        .meeting-details {
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
          .meeting-details {
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

        .Meetings-container h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
      `}</style>
    </div>
    );
}

export default Meetings;