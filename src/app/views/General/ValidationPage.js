import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Button, Grid, Icon, MenuItem } from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../components";
import { Span } from "../../components/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import supabase from "../../DataBase/Clients/SupabaseClient";
import { useNavigate } from "react-router-dom";
import { getNotificationById } from "../../DataBase/Clients/NotificationsClient";

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

  //TODO:
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const { notifId } = useParams();

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
    console.log(notification)
  },[notification])
if(notifId){
    return (
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Dashboard", path: "/Dashboard" }, { name: "Validation" }]} />
          </Box>
          <Stack spacing={3}>
            <SimpleCard title={"Notification"}>
              <p>{notification[0].title}</p>
              <p>{notification[0].subtitle}</p>
              <p>{notification[0].title}</p>
            
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Button color="primary" variant="contained" type="submit" marginTop="20px">
                        <Icon>check-circle</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Confirm</Span>
                    </Button>
                    <Button color="primary" variant="contained" type="submit" marginTop="20px">
                        <Icon>cancel</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Refuse</Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
          </Stack>
        </Container>
      );
}else{
  return <p></p>
}
};

export default ValidationPage;