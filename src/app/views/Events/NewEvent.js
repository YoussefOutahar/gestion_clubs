import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Button, Grid, Icon, MenuItem } from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../components";
import { Span } from "../../components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import supabase from "../../DataBase/Clients/SupabaseClient";
import { useNavigate } from "react-router-dom";
import NotificationsService from "../../DataBase/services/NotificationsService";
import { getCurrentUser, getProfileById } from "../../DataBase/services/UsersService";
import DocumentsService from "../../DataBase/services/DocumentsService";
import EventsService from "../../DataBase/services/EventsService";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const NewEvent = () => {
  const navigate = useNavigate();
  const [clubId, setClubId] = useState(null);

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

  const [state, setState] = useState({
    date: new Date(),
    time: "",
    description: "",
    location: "",
    name: "",
    aimed_target: "",
    funding_method: ""
  });

  //TODO:
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        setUploading(true);
        const { file, error } = await supabase.storage
          .from("Documents")
          .upload(selectedFile.name, selectedFile);

        console.log(selectedFile);

        if (error) {
          console.error("Error uploading file:", error);
        } else {
          const fileUrl = "https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Documents/" + selectedFile.name;
          await EventsService.addEvent(
            {
              name: state.name,
              date: state.date,
              time: state.time,
              description: state.description,
              location: state.location,
              aimed_target: state.aimed_target,
              funding_method: state.funding_method,
              state: "pending",
              id_club: clubId,
            },);

          const actualEvent = await EventsService.getEventByName(state.name);

          await DocumentsService.addDoc({
            name: `Fiche explicative ${state.name}`,
            path: fileUrl,
            id_activity: actualEvent.id,
          });

          console.log("File uploaded and reference saved successfully.");
          //TODO: notification must be done after validations 
          /*await NotificationsService.addNotification(
            {
              heading: "Request",
              title: "Request new Event",
              subtitle: state.name,
              timestamp: state.date,
              body: `we want to make an event :${state.name}`,
              icon: {
                name: "Message",
                color: "primary"
              },
              //path: `validationEvent/${Name}/${Date}/${Description}/${Location}`,
              path:"",
              id_club: clubId,
            },
          )*/
          navigate("/Events-Management-Admin");

        }
      } catch (error) {
        console.error("Error uploading file:", error.message);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { location, date, description, name, time, aimed_target, funding_method } = state;

  //Fiche explicative
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Events", path: "/Events" }, { name: "New Event" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Add new event">
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                <TextField
                  type="text"
                  name="name"
                  value={name || ""}
                  label="Name"
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <TextField
                  type="date"
                  name="date"
                  label="Date"
                  onChange={handleChange}
                  value={date || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <TextField
                  type="time"
                  name="time"
                  value={time || ""}
                  label="Time"
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <TextField
                  type="text"
                  name="location"
                  value={location || ""}
                  label="Location"
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <TextField
                  type="text"
                  name="aimed_target"
                  value={aimed_target || ""}
                  label="Aimed target"
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <TextField
                  type="text"
                  name="funding_method"
                  value={funding_method || ""}
                  label="Funding method"
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <TextField
                  type="text"
                  name="description"
                  label="Description"
                  onChange={handleChange}
                  value={description || ""}
                  errorMessages={["this field is required"]}
                  validators={["required"]}
                />

                <Grid container direction="row" justifyContent="center" alignItems="center" gap={2}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    id="fiche-input"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="fiche-input">
                    <Button sx={{ mb: 4 }} color="primary" component="span" variant="outlined">
                      Upload explanatory sheet
                    </Button>
                  </label>

                  <Span style={{ display: "inline-flex", verticalAlign: "middle" }}>
                    {uploading ? "Uploading ..." : null}
                    {selectedFile ? selectedFile.name : null}
                  </Span>
                </Grid>
              </Grid>
            </Grid>

            <Button color="primary" variant="contained" type="submit" marginTop="20px">
              <Icon>send</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
            </Button>
          </ValidatorForm>
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default NewEvent;