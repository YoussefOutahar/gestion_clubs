import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { styled, Grid, Card, Button, CardMedia, CardContent, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import supabase from '../../DataBase/Clients/SupabaseClient';
import ClubsService from '../../DataBase/services/ClubsService';
import { getEtudiantByMembre, getMembresByClub } from "../../DataBase/services/MembersService";

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  backgroundColor: '#003667',
}));

const Clubs = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeClub, setActiveClub] = useState(null);

  const [clubs, setClubs] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchClubs = async () => {
      const fetchedClubs = await ClubsService.getClubs();
      if (fetchedClubs) {
        setClubs(fetchedClubs);
      }
    };

    fetchClubs();
  }, []);

  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      if (clubs[activeClub] && activeClub !== null) {
        const data = await getMembresByClub(clubs[activeClub].id);
        const membresWithEtudiants = await Promise.all(
          data.map(async (membre) => {
            const etudiant = await getEtudiantByMembre(membre.id_etd);
            return { ...membre, Etudiants: etudiant[0] };
          })
        );
        setMembers(membresWithEtudiants);

      }
    };
    fetchMembers();
  }, [activeClub, clubs]);

  useEffect(() => {
    if (activeClub !== null) {
      supabase.from('Categorie').select('*').eq('id', activeClub.id_cat).then((categorie) => {
        setCategory(categorie.data[0].categorie)
      })
    }
  }, [activeClub]);


  const handleLearnMore = (index) => {
    setActiveClub(clubs[index])
    setShowDetails(true);
  };

  const handleGoBack = () => {
    setShowDetails(false);
  };

  const handleBackToTop = () => {
    setShowDetails(false);
    setActiveClub(null);
  };


  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [clubToDelete, setClubToDelete] = useState(null);

  const handleDelete = (club) => {
    setOpenDeleteDialog(true);
    setClubToDelete(club);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    await ClubsService.deleteClub(clubToDelete.id);
    const fetchClubs = async () => {
      const fetchedClubs = await ClubsService.getClubs();
      if (fetchedClubs) {
        setClubs(fetchedClubs);
      }
    };

    ClubsService.fetchClubs();
    setOpenDeleteDialog(false);
  };

  if (showDetails) {
    return (
      <>
        <StyledButton variant="contained" onClick={handleBackToTop}>
          <ArrowBack /> Back to Club List
        </StyledButton>
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', mb: 1, fontSize: 25, fontWeight: 'bold' }}>
          {activeClub.nom} {/* Display the title */}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={activeClub.logo} alt={activeClub.nom} style={{ width: '350px', marginLeft: '50px', marginRight: '50px' }} /> {/* Display the image with 100px width */}
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '650px' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="body1" sx={{ textAlign: 'left', mb: 1, fontSize: 16, fontWeight: 'bold' }}>
                Creation date : {activeClub.date_creation}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'left', mb: 1, fontSize: 16, fontWeight: 'bold' }}>
                Number of Members : {activeClub.nb_membre}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'left', mb: 1, fontSize: 16, fontWeight: 'bold' }}>
                Category : {category}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'left', mb: 1, fontSize: 16, fontWeight: 'bold' }}>
                Mission : {activeClub.description}
              </Typography>
              <Button
                variant="contained"
                color="error"
                style={{ marginLeft: 'auto', marginTop: '16px', marginRight: '8px', backgroundColor: '#dc3545' }}
                onClick={() => handleDelete(activeClub)} // Call the handleDelete function
              > Delete
              </Button>
            </CardContent>
          </Card>
          <Dialog open={openDeleteDialog} onClose={handleClose}>
            <DialogTitle>Delete Club</DialogTitle>
            <DialogContent>
              <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="primary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Grid container spacing={2} margin={1}>
          {clubs.map((club, index) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={club.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }} onClick={() => handleLearnMore(index)} >
                <CardMedia
                  component="img"
                  image={club.logo}
                  alt={club.nom}
                  sx={{
                    paddingTop: '10%',
                    paddingBottom: '10%',
                    paddingLeft: '10%',
                    paddingRight: '10%',
                    aspectRatio: '1',
                    objectFit: 'cover'
                  }} // Set a 16:9 aspect ratio
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h6" component="div" sx={{ textAlign: 'center', mb: 1 }}>
                    {club.nom}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
};

export default Clubs;
