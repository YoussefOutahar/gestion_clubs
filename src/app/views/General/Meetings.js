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

const Meetings = () => {
    return (
        <ContentBox1>
            <h1>Meetings Management</h1>
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <StyledButton variant="contained" href="/newMeeting">
                New meeting
            </StyledButton>
            </Box>
        </ContentBox1>
    );
}

export default Meetings;