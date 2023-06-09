import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';


//Testing Clients :
// import { getClub , addClub,deleteClub,getClubEvents,getClubs,updateClub } from './app/DataBase/Clients/ClubsClient'
// import {addEvent,deleteEvent,getEvent,getEventClub,getEvents,updateEvent} from './app/DataBase/Clients/EventsClient'

// addClub(
//   {
//     nom: "Club 1",
//     nb_membres: 10,
//     id_category: 1,
//     description: "Club 1 description",
//     logo: "https://www.uir.ac.ma/upload/cbuilder/c076f4b3518ce8be7f84bb05ec8ce0b2cc0f366f.png",
//   }
// );

// addEvent(
//   {
//     image:"src\Images\event1.png",
//     Name:"Event 1",
//     Date : "2021-10-10",
//     Lieu : "UIR",
//     Cost : 100,
//     Earnings : 200,
//     Supp_budget : 100,
//     id_club 


ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </StyledEngineProvider>,
  document.getElementById('root')
);

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
