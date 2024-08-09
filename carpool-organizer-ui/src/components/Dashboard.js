import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper, Box, Card, CardContent, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');

      if (userId) {
        try {
          const response = await api.get(`/users/${userId}`);
          console.log('User data fetched:', response.data); // Log user data
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user', error);
        }
      } else {
        console.error('No userId found in local storage');
      }
    };

    fetchUser();
  }, []);

  const handleOpenForm = () => {
    setEditableUser(user); 
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditableUser(null);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const { id, name, location, availability, number, email, password } = editableUser;
      await api.put(`/users/${id}`, { name, location, availability, number, email, password });
      setUser(editableUser); 
      handleCloseForm();  
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <Typography variant="body1">Loading user information...</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        p: 4,
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 4, fontWeight: 'bold', color: '#3f51b5' }}
      >
        Dashboard
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          marginBottom: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h6" gutterBottom>User Information</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
          <Typography variant="body1"><strong>Location:</strong> {user.location}</Typography>
          <Typography variant="body1"><strong>Availability:</strong> {user.availability}</Typography>
          <Typography variant="body1"><strong>Number:</strong> {user.number}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleOpenForm}
        >
          Update User Information
        </Button>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6">My Carpools</Typography>
              <Typography variant="body2">
                View and manage your current carpools.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                fullWidth
                onClick={() => navigate('/carpool')}
              >
                Go to My Carpools
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6">Find Carpools</Typography>
              <Typography variant="body2">
                Search for carpools based on your location and availability.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                fullWidth
                onClick={() => navigate('/find-carpools')}
              >
                Find Carpools
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6">Create a Carpool</Typography>
              <Typography variant="body2">
                Set up a new carpool group with your desired location, time, and coworkers.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="success"
                fullWidth
                onClick={() => navigate('/create-carpool')}
              >
                Create a Carpool
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6">View Analytics</Typography>
              <Typography variant="body2">
                Analyze carpool data and get insights on money, time, and fuel saved.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="info"
                fullWidth
                onClick={() => navigate('/view-analytics')}
              >
                View Analytics
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Update User Form */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Update User Information</DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdateUser}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editableUser?.name || ''}
              onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editableUser?.location || ''}
              onChange={(e) => setEditableUser({ ...editableUser, location: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Availability"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editableUser?.availability || ''}
              onChange={(e) => setEditableUser({ ...editableUser, availability: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editableUser?.number || ''}
              onChange={(e) => setEditableUser({ ...editableUser, number: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editableUser?.email || ''}
              onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editableUser?.password || ''}
              onChange={(e) => setEditableUser({ ...editableUser, password: e.target.value })}
              sx={{ mb: 2 }}
            />
            <DialogActions>
              <Button onClick={handleCloseForm} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Dashboard;
