import { Stack, Button, Grid, Icon, styled, Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, } from "@mui/material";
import { Span } from "../../components/Typography";
import { Breadcrumb, SimpleCard } from "../../components";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import supabase from "../../DataBase/Clients/SupabaseClient";
import { useNavigate } from "react-router-dom";
import ClubsService from "../../../DataBase/services/ClubsService";

//Style Css
const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

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

// AssignBudget 
const AssignBudget = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({ date: new Date() });
  const [Clubs, setClubs] = useState([]);

  //fetchClubs
  /*useEffect(() => {
    const fetchClubs = async () => {
      const fetchedClubs = await ClubsService.getActiveClubs();
      if (fetchedClubs) {
        setClubs(fetchedClubs);
        console.log("Fetched clubs:", Clubs);
      }
    };

    fetchClubs();
  }, []);*/

  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase.from("Clubs").select("*").eq("state", "active");
      if (data) {
        setClubs(data);
        console.log("Fetched clubs:", Clubs);
      }
      else{
        console.log("Fetched clubs error :", error);
      }
    };

    fetchClubs();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be inserted into the database
    const budgets = Clubs.map((club, index) => ({
      id_club: club.id,
      budget: state[`budget-${index}`] || 0,
      year: new Date().getFullYear(), // Set the actual year
      source: "DVE",
      rest: state[`budget-${index}`] || 0,
    }));

    // Insert the data into the database using Supabase
    const { data, error } = await supabase.from('Budget').insert(budgets);
    if (data) {
      console.log('Budgets inserted successfully:', data);
      // Redirect to finance page
      navigate("/AdminFinance");
    } else {
      console.error('Error inserting budgets:', error);
    }
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Finance", path: "/finance" }, { name: "Assign Budgets" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Assign Budgets">
          <div>
            <ValidatorForm onSubmit={handleSubmit}>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Club Name</TableCell>
                    <TableCell align="center">Budget</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Clubs.map((club, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{club.name}</TableCell>
                      <TableCell align="center">
                        <TextField name={`budget-${index}`} value={state[`budget-${index}`] || ''} onChange={handleChange} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </ValidatorForm>
          </div>
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AssignBudget;