import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Button, Grid, Icon} from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../components";
import { Span } from "../../components/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import supabase from "../../DataBase/Clients/SupabaseClient";
import { useNavigate } from "react-router-dom";

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

const UpdateMeeting = () => {
    const navigate = useNavigate();

  const [state, setState] = useState({
    date: new Date(),
    description: "",
    location: ""
  });

  //TODO:
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from("Meetings").update([
        {
          Date: state.date,
          description: state.description,
          location: state.location,
        },
      ]).eq("id", meetingId);

      if (error) {
        console.error(error);
      } else {
        console.log("Data inserted successfully:", data);
        navigate("/Meetings");
      }

    } catch (error) {
      console.error(error);
    }
  };
  const { meetingId } = useParams(); // Replace "meeting_id" with the actual ID of the meeting you want to update

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const { data, error } = await supabase.from("Meetings").select().eq("id", meetingId);
        if (error) {
          console.error(error);
        } else if (data && data.length > 0) {
          const meeting = data[0];
          setState({
            date: new Date(meeting.date),
            description: meeting.description,
            location: meeting.location
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeeting();
  }, [meetingId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
  setState((prevState) => ({
    ...prevState,
    [name]: value,
    }));
  };

  const {location, date, description } = state;

    return (
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Meetings", path: "/Meetings" }, { name: "New meeting" }]} />
          </Box>
    
          <Stack spacing={3}>
            <SimpleCard title="Add new meeting">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
        
            <TextField
              type="date"
              name="date"
              label="Date"
              onChange={handleChange}
              value={state.date ? state.date : ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="text"
              name="description"
              label="Description"
              onChange={handleChange}
              value={state.description  || ""}
              errorMessages={["this field is required"]}
              validators={["required"]}
            />

            <TextField
              type="text"
              name="location"
              value={state.location|| ""}
              label="Location"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
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

export default UpdateMeeting;