import { Stack, Button,Grid, Icon, styled,Box,IconButton,Table,TableBody,TableCell,TableHead,TableRow,} from "@mui/material";
import { Span } from "../../components/Typography";
import { Breadcrumb, SimpleCard } from "../../components";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import supabase from "../../DataBase/Clients/SupabaseClient";

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  const subscribarList = [
    {
      name: "john doe",
      date: "18 january, 2019",
      amount: 1000,
      status: "close",
      company: "ABC Fintech LTD.",
    },
]

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

const AssignBudget = () => {
    const [state, setState] = useState({ date: new Date() });

  useEffect(() => {
    ValidatorForm.addValidationRule("isInvoiceMatch", (value) => {
      if (value !== state.Invoice) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isInvoiceMatch");
  }, [state.Invoice]);

  const handleSubmit = async (event) => {
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    eventName,
    totalCost,
  } = state;

    return (
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Finance", path: "/finance" }, { name: "Supplimentary Budget" }]} />
          </Box>
    
          <Stack spacing={3}>
            <SimpleCard title="Request supplimentary Budget">
                <div>
                <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Club Name</TableCell>
            <TableCell align="center">Budget</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {subscribarList.map((subscriber, index) => (
            <TableRow key={index}>
              <TableCell align="left">{subscriber.name}</TableCell>
              <TableCell align="center">{subscriber.company}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <Icon color="error">close</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </StyledTable>
                </div>
            </SimpleCard>
          </Stack>
        </Container>
      );
};

export default AssignBudget;