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

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const ValidationSuppBudget = () => {


  //TODO:
  const handleSubmit = async (event) => {
    event.preventDefault();
  };



    return (
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Dashboard", path: "/Dashboard" }, { name: "Validation" }]} />
          </Box>
          <Stack spacing={3}>
            <SimpleCard title="Add new meeting">
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
};

export default ValidationSuppBudget;