import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Button, Icon} from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../components";
import { Span } from "../../components/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getProfileById } from '../../DataBase/services/UsersService'
import { addEvent } from "../../DataBase/services/EventsService";
import NotificationsService from "../../DataBase/services/NotificationsService";
import DocumentsService from "../../DataBase/services/DocumentsService";

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
    const fetchUsers = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const userProfile = await getProfileById(currentUser.id);
          if (userProfile.length > 0) {
            setClubId(userProfile[0].id_club);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  
  const docName = `Fiche explicative ${Name}`;
  console.log(docName);

  useEffect(() => {
    const fetchDocument = async () => {
      const { url, error } = await DocumentsService.getDocByName(docName);
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
    const {notification , error} = await NotificationsService.addNotification(
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
      const {notification , error} = await NotificationsService.addNotification(
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
  const handleClickDocument = () => {
    if (document && document.length > 0) {
      const docUrl = document[0].path;
      console.log("path : ",docUrl);
      window.open(docUrl, "_blank");
    }
  };

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
                <StyledLinkWrapper  onClick={handleClickDocument}>
                {docName}
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