import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "../../components";
import ChargeForm from "./Components/ChargeForm";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const AddCharge = () => {
    return (
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Finance", path: "/finance" }, { name: "Add Charge" }]} />
          </Box>
          <Stack spacing={3}>
            <SimpleCard title="Add event charge">
              <ChargeForm />
            </SimpleCard>
          </Stack>
        </Container>
      );
};

export default AddCharge;