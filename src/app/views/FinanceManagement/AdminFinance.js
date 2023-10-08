import React, { useState, useEffect } from "react";
import supabase from "../../DataBase/Clients/SupabaseClient";
import SimpleCard from "../../components/SimpleCard";
import FinanceCards from "./Components/FinanceCards";
import { styled,Box, Button,Grid,Table,TableBody,TableCell,TableHead,TableRow} from "@mui/material";
import { getClubs } from "../../DataBase/services/ClubsService";
import { getBudgetByClub } from "../../DataBase/services/BudgetService";

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

    const getTotalSuppEarningsByClub = async (clubId) => {
      const { data, error } = await supabase
        .from("Activites")
        .select("Supp_budget, Earnings")
        .eq("id_club", clubId);

      if (error) {
        console.error("Error calculating total:", error.message);
        return { total_supp_budget: 0, total_earnings: 0 };
    } else {
      const total_supp_budget = data.reduce(
        (sum, item) => sum + (item.Supp_budget || 0),
        0
      );
      const total_earnings = data.reduce(
        (sum, item) => sum + (item.Earnings || 0),
        0
      );
      return { total_supp_budget ,total_earnings};
      }
    };


  /*useEffect(() => {
    const fetchClubs = async () => {
      const fetchedclubs = await getClubs();
      if (fetchedclubs) {
        setClubs(fetchedclubs);
      }
    };
    fetchClubs();
  }, []);
  */
  useEffect(() => {
    getClubs().then(async (data) => {
      const clubData = await Promise.all(
        data.map(async (club) => {
          const budget = await getBudgetByClub(club.id);
          const { total_supp_budget, total_earnings } = await getTotalSuppEarningsByClub(club.id);
          return {
            id: club.id,
            name: club.nom,
            Budget: budget.budget,
            Rest: budget.rest,
            Supp_budget: total_supp_budget,
            Earnings: total_earnings,
          };
        })
      );
      setClubs(clubData);
    });
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
            <StyledButton variant="contained" href="/AssignBudget">
                Assign budget
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
              <TableCell align="left">{club.name}</TableCell>
              <TableCell align="center">{club.Budget}</TableCell>
              <TableCell align="center">{club.Supp_budget}</TableCell>
              <TableCell align="center">{club.Earnings}</TableCell>
              <TableCell align="center">{club.Rest}</TableCell>
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
