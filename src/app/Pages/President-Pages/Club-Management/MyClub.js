import { Typography, Grid, Card, CardContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import { getCurrentUser, getProfileById } from '../../DataBase/services/UsersService'
import ClubsService from '../../DataBase/services/ClubsService'


const MyClub = () => {
  const [activeClub, setActiveClub] = useState({});
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const userProfile = await getProfileById(currentUser.id);
          if (userProfile.length > 0) {

            const userClubId = userProfile[0].id_club;
            const clubInfo = await ClubsService.getClub(userClubId);
            setActiveClub(clubInfo[0]);

            // Fetch and set the club category
            const ClubCategory = await ClubsService.getClubCategorie(clubInfo[0].id_cat);
            console.log(" ClubCategory : ", ClubCategory);
            setCategory(ClubCategory[0].category_name);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Typography variant="h4" component="div" align="center" sx={{ my: 2 }}>
        {activeClub.name}
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <img src={activeClub.logo} alt={activeClub.name} style={{ width: '70%', aspectRatio: '1/1', objectFit: 'cover' }} />
        </Grid>
      </Grid>
      <Typography variant="body1" sx={{ my: 2, textAlign: 'center' }}>
        {activeClub.mission}
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" align="center">
                Number of Members
              </Typography>
              <Typography variant="body1" component="div" align="center">
                {activeClub.nb_membre}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" align="center">
                Category
              </Typography>
              <Typography variant="body1" component="div" align="center">
                {category}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" align="center">
                Creation Date
              </Typography>
              <Typography variant="body1" component="div" align="center">
                {activeClub.date_creation}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </>
  )
}

export default MyClub