import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Button, Grid, Icon, Link } from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../components";
import { Span } from "../../components/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import supabase from "../../DataBase/Clients/SupabaseClient";
import { useNavigate } from "react-router-dom";
import {addNotification, getNotificationById } from "../../DataBase/Clients/NotificationsClient";
import { getCurrentUser,getUserMember } from "../../DataBase/Clients/UsersClient";
import { getMembreClub } from "../../DataBase/Clients/MembersClient";
import { addEvent } from "../../DataBase/Clients/EventsClient";
import { getDocByName } from "../../DataBase/Clients/DocumentsClient";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  const StyledLinkWrapper = styled("div")(({ theme }) => ({
    marginBottom: "20px",
  }));

const ValidationEvent = () => {

  const [notification, setNotification] = useState(null);
  const [clubId, setClubId] = useState(null);
  const [document, setDocument] = useState(null);
  const navigate = useNavigate();
  const { Name, Date, Description, Location, notifId } = useParams();

  useEffect(() => {
    const fetchNotification = async () => {
      const { data, error } = await getNotificationById(notifId);
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
  const docName = `Fiche explicative ${Name}`;
  console.log(docName);

  useEffect(() => {
    const fetchDocument = async () => {
      const { url, error } = await getDocByName(docName);
      if (error) {
        console.error(error);
      } else {
        console.log(url);
        setDocument(url);
      }
    };

    fetchDocument();
  }, []);




  const handleRefuse = async () => {
    try {
    const {notification , error} = await addNotification(
      {
        heading: "Answer",
        title: `Event ${Name} refused`,
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
      const {notification , error} = await addNotification(
        {
          heading: "Answer",
          title: "Event accepted",
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

    await addEvent({Name: Name, Date: Date, description: Description, Location: Location,});
    console.log("Event added successfully");
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
              {document && (
                <StyledLinkWrapper>
                <Link href={document[0].path} target="_blank" rel="noopener noreferrer" underline="none" color="inherit">
                {docName}
              </Link>
              </StyledLinkWrapper>
            )}
            
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

export default ValidationEvent;