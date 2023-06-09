import React, { useState, useEffect } from "react";
import supabase from "../../DataBase/Clients/SupabaseClient";
import SimpleCard from "../../components/SimpleCard";
import FinanceCards from "./Components/FinanceCards";
import { styled,Box, Button,Grid,Table,TableBody,TableCell,TableHead,TableRow} from "@mui/material";

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }));

  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));

  const ContentBox1 = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));

const AdminFinance = () => {
  const [totalSuppBudget, setTotalSuppBudget] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  const [clubs, setClubs] = useState([]);
  const [clubBudget, setClubBudget] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase.from("Clubs").select("nom, id");
      if (error) {
        console.error("Error fetching Activites:", error);
      } else {
        setClubs(data);
        console.log("Fetched data:", data);
      }
    };

    fetchClubs();
  }, []);
  

  useEffect(() => {
    const fetchInfos = async () => {
      const { data, error } = await supabase
        .from("Activites")
        .select("Supp_budget")
        //.eq("Date", new Date().getFullYear()); 
      if (error) {
        console.error("Error fetching Donations:", error);
    } else {
        const totalSuppBudget = data.reduce(
          (sum, item) => sum + (item.Supp_budget || 0),
          0
        );
        setTotalSuppBudget(totalSuppBudget);
      }
    };
  
    fetchInfos();
  }, []);


  useEffect(() => {
    const fetchClubBudget = async () => {
      const { data, error } = await supabase
        .from("Budget")
        .select("budget")
        .eq("annee", new Date().getFullYear()); 

      if (error) {
        console.error("Error fetching Budget value:", error);
    } else if (data && data.length > 0) {
        const totalBudget = data.reduce(
          (sum, item) => sum + (item.budget || 0),
          0
        );
        setTotalBudget(totalBudget);
      } else {
        console.log("Budget value not found");
      }
    };
    fetchClubBudget();
  }, []);


  const cardList = [
    { name: "Total Budget", amount: `${totalBudget} DH` , icon: "attach_money" },
    { name: "Total supplementary budget", amount: `${totalSuppBudget} DH`, icon: "attach_money" },
  ];

    return (
        <ContentBox1>
            <h1>Finance Management</h1>
            <Grid container spacing={3} sx={{ mb: '24px' }}>
                {cardList.map((card, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <FinanceCards
                            key={index}
                            title={card.name}
                            subtitle={card.amount}
                            icon={card.icon}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <StyledButton variant="contained" href="/addCharge">
                Assign budget
            </StyledButton>
            <StyledButton variant="contained" color="secondary" href="/addCharge">
                Add an event charge
            </StyledButton>
            </Box>

            <SimpleCard title="Charges Table">
            <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Club Name</TableCell>
            <TableCell align="center">Assigned Budget</TableCell>
            <TableCell align="center">Total supplementary budget</TableCell>
            <TableCell align="center">Total earned budget</TableCell>
            <TableCell align="center">Rest</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {clubs.map((club, index) => (
            <TableRow key={index}>
              <TableCell align="left">{club.nom}</TableCell>
              <TableCell align="center">{club.company}</TableCell>
              <TableCell align="center">{club.date}</TableCell>
              <TableCell align="center">{club.status}</TableCell>
              <TableCell align="center">${club.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
            </SimpleCard>
        </ContentBox1>
    );
}
export default AdminFinance;
