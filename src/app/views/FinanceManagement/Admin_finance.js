import React, { useState } from "react";
import supabase from "../../DataBase/Clients/SupabaseClient";
import { getUserClub } from "../../../old_project/Utils/UserInfos";
import StatCards from "../dashboard/shared/StatCards";
import SimpleCard from "../../components/SimpleCard";
import FinanceCards from "./Components/FinanceCards";
import ChargesTable from "./Components/ChargesTable";
import { styled,useTheme,Box, Button, Card, Icon, Grid} from "@mui/material";

const EventsDetail = [
    {
      Event: "Ramadan Iftar",
      date: "20 march, 2023",
      Cost: "3000 DH",
      Earned: "2000 DH ",
      supplementary_budget: "none",
    },
    {
        Event: "Ramadan Iftar",
        date: "20 march, 2023",
        Cost: "3000 DH",
        Earned: "2000 DH ",
        supplementary_budget: "none",
      },
      {
        Event: "Ramadan Iftar",
        date: "20 march, 2023",
        Cost: "3000 DH",
        Earned: "2000 DH ",
        supplementary_budget: "none",
      },
      {
        Event: "Ramadan Iftar",
        date: "20 march, 2023",
        Cost: "3000 DH",
        Earned: "2000 DH ",
        supplementary_budget: "none",
      },
      {
        Event: "Ramadan Iftar",
        date: "20 march, 2023",
        Cost: "3000 DH",
        Earned: "2000 DH ",
        supplementary_budget: "none",
      },
      {
        Event: "Ramadan Iftar",
        date: "20 march, 2023",
        Cost: "3000 DH",
        Earned: "2000 DH ",
        supplementary_budget: "none",
      },
      {
        Event: "Ramadan Iftar",
        date: "20 march, 2023",
        Cost: "3000 DH",
        Earned: "2000 DH ",
        supplementary_budget: "none",
      },
      {
        Event: "Ramadan Iftar",
        date: "20 march, 2023",
        Cost: "3000 DH",
        Earned: "2000 DH ",
        supplementary_budget: "none",
      },
  ];
  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }));


const Admin_finance = () => {

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
                Assign the annual budget
            </StyledButton>
            <StyledButton variant="contained" color="secondary" href="/addCharge">
                Add an event charge
            </StyledButton>
            </Box>
            <SimpleCard title="Charges Table">
            <ChargesTable MyData={EventsDetail} tableHeading={["EventName","Date","Cost","Earned","Supp_Budget"]}/>
            </SimpleCard>
        </ContentBox1>
    );
}
export default Admin_finance;
