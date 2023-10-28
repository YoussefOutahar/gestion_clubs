import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Button,Icon} from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../components";
import { Span } from "../../components/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotificationsService from "../../DataBase/services/NotificationsService";
import { getCurrentUser,getUserMember } from "../../DataBase/services/UsersService";
import { getMembreClub } from "../../DataBase/services/MembersService";
import EventsService from "../../DataBase/services/EventsService";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const ValidationPage = () => {

  const [notification, setNotification] = useState(null);
  const [clubId, setClubId] = useState(null);
  const navigate = useNavigate();
  const { Cost, Event, notifId } = useParams();

  useEffect(() => {
    const fetchNotification = async () => {
      const { data, error } = await NotificationsService.getNotificationById(notifId);
      if (error) {
        console.error(error);
      } else {
        setNotification(data);
      }
    };

    fetchNotification();
  }, []);
  useEffect(() => {
    getCurrentUser().then((user) => {
      getUserMember(user.id).then((member) => {
        getMembreClub(member[0].id).then((club) => {
          setClubId(club[0].id);
        });
      });
    })
  }, []);

  const handleRefuse = async () => {
    try {
    const {notification , error} = await NotificationsService.addNotification(
      {
        heading: "Answer",
        title: "Supplimentary budget refused",
        subtitle: Event,
        timestamp: null,
        body: `your request is refused`,
        icon: {
          name: "Message",
          color: "primary"
        },
        path: '/finance',
        id_club: clubId,
      },
    )
     navigate("/finance");
  } catch (error) {
    console.error(error);
  }
};
  
  const handleConfirm = async () => {
    try {
      const {notification , error} = await NotificationsService.addNotification(
        {
          heading: "Answer",
          title: "Supplimentary budget accepted",
          subtitle: Event,
          timestamp: null,
          body: `your request is accepted`,
          icon: {
            name: "Message",
            color: "primary"
          },
          path: '/finance',
          id_club: clubId,
        },
      )
      const event = await EventsService.getEventByName(Event);
    if (!event || event.length === 0) {
      console.error("Event not found");
      return;
    }

    const eventId = event[0].id;
    await EventsService.updateEvent(eventId,{Supp_budget: Cost});
    console.log("Event updated successfully");
       navigate("/finance");
    } catch (error) {
      console.error(error);
    }
  }

if(notification){
    return (
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Dashboard", path: "/Dashboard" }, { name: "Validation" }]} />
          </Box>
          <Stack spacing={3}>
            <SimpleCard title={"Notification"}>
              <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>{notification[0].title}</p>
              <p style={{ fontSize: "18px", marginBottom: "8px" }}>{notification[0].subtitle}</p>
              <p style={{ fontSize: "15px", marginBottom: "20px"}}>{notification[0].body}</p>
            
            
                    <Button color="primary" variant="contained" type="submit" marginTop="20px" onClick={handleConfirm}>
                        <Icon>check-circle</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Confirm</Span>
                    </Button>
                    <Button style={{ marginLeft: "20px" }} color="secondary" variant="contained" type="submit" marginTop="20px" onClick={handleRefuse}>
                        <Icon>cancel</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Refuse</Span>
                    </Button>
            </SimpleCard>
          </Stack>
        </Container>
      );
}else{
  return <p></p>
}
};

export default ValidationPage;