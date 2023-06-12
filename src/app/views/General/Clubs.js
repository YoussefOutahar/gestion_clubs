import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getClubs,deleteClub } from '../../DataBase/Clients/ClubsClient';
import { getEtudiantByMembre, getMembresByClub } from "../../DataBase/Clients/MembersClient";

import { Grid, Card,Button, CardMedia, CardContent, Typography, IconButton, Box,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreInfoIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { ArrowBack } from '@mui/icons-material';
import supabase from '../../DataBase/Clients/SupabaseClient';

const Clubs = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeClub, setActiveClub] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [clubs, setClubs] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
  const fetchClubs = async () => {
    const fetchedClubs = await getClubs();
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
    await deleteClub(clubToDelete.id);
    const fetchClubs = async () => {
      const fetchedClubs = await getClubs();
      if (fetchedClubs) {
        setClubs(fetchedClubs);
      }
    };
    
    fetchClubs();
    setOpenDeleteDialog(false);
};

  if(showDetails) {
    return (
      <>
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={handleGoBack}
        sx={{ position: 'absolute', top: 16, left: 16 }}
      >
        Back
      </Button>
      <Typography variant="h4" component="div" align="center" sx={{ my: 2 }}>
        {activeClub.nom}
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>

      <img src={activeClub.logo} alt={activeClub.nom}  style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
        </Grid>
      </Grid>
      <Typography variant="body1" sx={{ my: 2, textAlign: 'center' }}>
        {activeClub.description}
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
    );
  }else{
    return (
      <>
      <Grid container spacing={2} margin={1}>
      {clubs.map((club,index) => (
        <Grid item xs={12} sm={6} md={4} key={club.id}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              image={club.logo}
              alt={club.nom}
              sx={{ paddingTop: '10%',
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
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton
                  aria-label="edit"
                  sx={{
                    borderRadius: '12px',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    margin: '0 4px',
                    width: '40px',
                    height: '40px',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '&:active': {
                      bgcolor: 'primary.light',
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="more info"
                  sx={{
                    borderRadius: '12px',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    margin: '0 4px',
                    width: '40px',
                    height: '40px',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '&:active': {
                      bgcolor: 'primary.light',
                    },
                  }}
                  onClick={() => handleLearnMore(index)}
                >
                  <MoreInfoIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(club)}
                  sx={{
                    borderRadius: '12px',
                    bgcolor: 'error.main',
                    color: 'error.contrastText',
                    margin: '0 4px',
                    width: '40px',
                    height: '40px',
                    '&:hover': {
                      bgcolor: 'error.dark',
                    },
                    '&:active': {
                      bgcolor: 'error.light',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
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
      </>
    );
  }
};

export default Clubs;
