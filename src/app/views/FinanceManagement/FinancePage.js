import React, { useState } from "react";
import supabase from "../../DataBase/Clients/SupabaseClient";
import { getUserClub } from "../../../old_project/Utils/UserInfos";
import StatCards from "../dashboard/shared/StatCards";
import SimpleCard from "../../components/SimpleCard";
import PaginationTable from "../material-kit/tables/PaginationTable";
import { styled,useTheme,Box, Card, Icon, Grid} from "@mui/material";

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


const FinancePage = () => {

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
                        <SimpleCard
                            key={index}
                            title={card.name}
                            subtitle={card.amount}
                            icon={card.icon}
                        />
                    </Grid>
                ))}
            </Grid>
            <PaginationTable MyData={EventsDetail} tableHeading={["EventName","Date","Cost","Earned","Supp_Budget"]}/>
        </ContentBox1>
    );
}
export default FinancePage;
