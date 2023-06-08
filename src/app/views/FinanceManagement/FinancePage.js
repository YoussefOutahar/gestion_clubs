import React, { useState, useEffect } from "react";
import supabase from "../../DataBase/Clients/SupabaseClient";
import SimpleCard from "../../components/SimpleCard";
import FinanceCards from "./Components/FinanceCards";
import ChargesTable from "./Components/ChargesTable";
import { styled,useTheme,Box, Button, Card, Icon, Grid} from "@mui/material";

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }));


  const ContentBox1 = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));

  const cardList = [
    { name: 'Total Budget', amount: '200000 DH', icon: 'attach_money' },
    { name: 'Total supplementary budget', amount: '5000 DH', icon: 'attach_money' },
    { name: 'Total Donations', amount: '10000 DH', icon: 'attach_money' },
    { name: 'Rest', amount: '3099 DH', icon: 'attach_money' },
  ];

const FinancePage = () => {
  const [eventsDetail, setEventsDetail] = useState([]);

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
