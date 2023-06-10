import React, { useState, useEffect } from "react";
import supabase from "../../DataBase/Clients/SupabaseClient";
import SimpleCard from "../../components/SimpleCard";
import FinanceCards from "./Components/FinanceCards";
import ChargesTable from "./Components/ChargesTable";
import { styled,Box, Button, Grid} from "@mui/material";

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }));


  const ContentBox1 = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));

const FinancePage = () => {
  const [eventsDetail, setEventsDetail] = useState([]);
  const [budgetValue, setBudgetValue] = useState(null);
  const [donationsTotal, setDonationsTotal] = useState(0);
  const [SuppBudgetTotal, setSuppBudgetTotal] = useState(0);
  const [costTotal, setCostTotal] = useState(0);

  useEffect(() => {
    const fetchActivites = async () => {
      const { data, error } = await supabase.from("Activites").select("Name,Date,Cost,Earnings,Supp_budget");
      if (error) {
        console.error("Error fetching Activites:", error);
      } else {
        setEventsDetail(data);
        console.log("Fetched data:", data);
      }
    };

    fetchActivites();
  }, []);

  useEffect(() => {
    const fetchInfos = async () => {
      const { data, error } = await supabase
        .from("Activites")
        .select("Earnings, Cost,Supp_budget")
        .eq("id_club", 1);
  
      if (error) {
        console.error("Error fetching Donations:", error);
      } else {
        const totalEarnings = data.reduce(
          (sum, activity) => sum + (activity.Earnings || 0),
          0
        );
        const totalCost = data.reduce(
          (sum, activity) => sum + (activity.Cost || 0),
          0
        );
        const totalSuppBudget = data.reduce(
          (sum, activity) => sum + (activity.Supp_budget || 0),
          0
        );
        setDonationsTotal(totalEarnings);
        setCostTotal(totalCost);
        setSuppBudgetTotal(totalSuppBudget);
      }
    };
  
    fetchInfos();
  }, []);


  useEffect(() => {
    const fetchBudgetValue = async () => {
      const { data, error } = await supabase
        .from("Budget")
        .select("budget")
        .eq("id_club", 1)
        .limit(1);

      if (error) {
        console.error("Error fetching Budget value:", error);
      } else if (data && data.length > 0) {
        setBudgetValue(data[0].budget);
      } else {
        console.log("Budget value not found");
      }
    };
    fetchBudgetValue();
  }, []);

  const earningsTotal = donationsTotal + budgetValue + SuppBudgetTotal;
  const rest = earningsTotal - costTotal;

  const cardList = [
    { name: "Budget", amount: budgetValue ? `${budgetValue} DH` : "Fetching...", icon: "attach_money" },
    { name: "Total supplementary budget", amount: `${SuppBudgetTotal} DH`, icon: "attach_money" },
    { name: "Total Donations", amount: `${donationsTotal} DH`, icon: "attach_money" },
    { name: "Rest", amount: `${rest} DH`, icon: "attach_money" },
  ];

    return (
        <ContentBox1>
            <h1>Finance Management</h1>
            {/*<StatCards />*/}
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
                Request a supplementary budget
            </StyledButton>
            <StyledButton variant="contained" color="secondary" href="/addCharge">
                Add an event charge
            </StyledButton>
            </Box>
            <SimpleCard title="Charges Table">
            <ChargesTable MyData={eventsDetail}/>
            </SimpleCard>
        </ContentBox1>
    );
}
export default FinancePage;
