import { Typography, Grid, Card, CardContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import  supabase  from '../../DataBase/Clients/SupabaseClient'
import { getCurrentUser,getProfileById } from '../../DataBase/services/UsersService'
import { getMembreByProfile,getMembreClub } from '../../DataBase/services/MembersService'

const MyClubPage = () => {
    const [activeClub, setActiveClub] = useState({})
    const [category, setCategory] = useState('')

    useEffect(() => {
        getCurrentUser().then((user) => {
            getProfileById(user.id).then((profile) => {
                getMembreByProfile(profile[0].id).then((member) => {
                    getMembreClub(member[0].id).then((club) => {
                        setActiveClub(club[0])
                        supabase.from('Categorie').select('*').eq('id', club[0].id_cat).then((categorie) => {
                            console.log(categorie)
                            setCategory(categorie.data[0].categorie)
                        })
                    })
                })
            })
        })
    }, [])


    return (
        <>
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
    )
}

export default MyClubPage