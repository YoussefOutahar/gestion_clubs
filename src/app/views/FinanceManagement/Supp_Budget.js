import { Stack, Button,Grid, Icon, styled,MenuItem} from "@mui/material";
import { Box } from "@mui/system";
import { Span } from "../../components/Typography";
import { Breadcrumb, SimpleCard } from "../../components";
import { useEffect, useState } from "react";
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

const Supp_Budget = () => {

  const navigate = useNavigate();

  const [state, setState] = useState({
    date: new Date(),
    eventName: "",
    activities: [],
  });

  {/*useEffect(() => {
    ValidatorForm.addValidationRule("isInvoiceMatch", (value) => {
      if (value !== state.Invoice) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isInvoiceMatch");
  }, [state.Invoice]);*/}

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase.from("Activites").select("Name");
        if (error) {
          console.error("Error fetching activities:", error);
        } else {
          setState((prevState) => ({
            ...prevState,
            activities: data.map((activity) => activity.Name),
          }));
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from("Notifications").insert([
        {
          heading: "Request",
          title: "Supplimentary budget request",
          subtitle: state.eventName,
          timestamp: state.date,
          body: `Request an amount of ${state.totalCost} DH to the event ${state.eventName}`,
          icon: {
            name: "Message",
            color: "primary"
          },
          path: "finance"
        },
      ])

      if (error) {
        console.error(error);
      } else {
        console.log("Request sent successfully:", data);
        // Redirect to finance page
        navigate("/finance");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  setState((prevState) => ({
    ...prevState,
    [name]: value,
    }));
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const { eventName, totalCost,activities } = state;

    return (
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Finance", path: "/finance" }, { name: "Supplimentary Budget" }]} />
          </Box>
    
          <Stack spacing={3}>
            <SimpleCard title="Request supplimentary Budget">
              <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextField
              select
              name="eventName"
              value={eventName || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Event Name"
              validators={["required"]}
            >
              {activities.map((activity, index) => (
                <MenuItem key={index} value={activity}>
                  {activity}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="number"
              name="totalCost"
              label="Amount Requested"
              onChange={handleChange}
              value={totalCost || ""}
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
    </div>
            </SimpleCard>
          </Stack>
        </Container>
      );
};

export default Supp_Budget;