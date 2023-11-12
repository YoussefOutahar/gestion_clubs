import { Card, Grid, styled, useTheme, Typography, CardContent } from "@mui/material";
import { Fragment } from "react";
import Campaigns from "./shared/Campaigns";
import DoughnutChart from "./shared/Doughnut";
import RowCards from "./shared/RowCards";
import StatCards from "./shared/StatCards";
import StatCards2 from "./shared/StatCards2";
import TopSellingTable from "./shared/TopSellingTable";

import LineChart from "./shared/LineChart";
import UpgradeCard from "./shared/UpgradeCard";

const ContentBox = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
    fontSize: "1rem",
    fontWeight: "500",
    marginRight: ".5rem",
    textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: "16px",
    textTransform: "capitalize",
    color: theme.palette.text.secondary,
}));

const Analytics = () => {
    const { palette } = useTheme();

    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container item justifyContent="space-between" spacing={2}>
                    {/* Top Row with 3 Cards */}
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <DoughnutChart
                                    height="300px"
                                    color={[
                                        palette.primary.dark,
                                        palette.primary.main,
                                        palette.primary.light,
                                    ]}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Campaigns />
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Card 3</Typography>
                                {/* Add your content here */}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Bottom Row with Cards taking the whole space */}
                    <Grid item xs={12}>
                        <StatCards />
                    </Grid>
                    <Grid item xs={12}>
                        <StatCards2 />
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <LineChart
                                    height="350px"
                                    color={[palette.primary.main, palette.primary.light]}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <TopSellingTable />

                        <H4>Ongoing Projects</H4>
                        <RowCards />
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card sx={{ px: 3, py: 2, mb: 3 }}>
                            <Title>Traffic Sources</Title>
                            <SubTitle>Last 30 days</SubTitle>
                        </Card>
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
};

export default Analytics;
