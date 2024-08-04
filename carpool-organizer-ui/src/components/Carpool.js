import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import api from '../services/api';

function CarpoolManagement() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [carpools, setCarpools] = useState([]);

  useEffect(() => {
    const fetchCarpools = async () => {
      try {
        const response = await api.get('/carpools');
        setCarpools(response.data);
      } catch (error) {
        console.error('Error fetching carpools', error);
      }
    };

    fetchCarpools();
  }, []);

  const handleCreateCarpool = async () => {
    try {
      await api.post('/carpools', { origin, destination, time, user_ids: userIds });
      setOrigin('');
      setDestination('');
      setTime('');
      setUserIds([]);
      // Refresh carpools list
      const response = await api.get('/carpools');
      setCarpools(response.data);
    } catch (error) {
      console.error('Error creating carpool', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Carpool Management</Typography>
      <TextField
        label="Origin"
        variant="outlined"
        fullWidth
        margin="normal"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <TextField
        label="Destination"
        variant="outlined"
        fullWidth
        margin="normal"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <TextField
        label="Time"
        type="datetime-local"
        variant="outlined"
        fullWidth
        margin="normal"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <TextField
        label="User IDs (comma-separated)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userIds.join(',')}
        onChange={(e) => setUserIds(e.target.value.split(',').map(id => id.trim()))}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreateCarpool}
        style={{ marginTop: '16px' }}
      >
        Create Carpool
      </Button>
      <Typography variant="h5" gutterBottom style={{ marginTop: '32px' }}>Existing Carpools</Typography>
      <Grid container spacing={3}>
        {carpools.map(carpool => (
          <Grid item xs={12} sm={6} md={4} key={carpool.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">From: {carpool.origin}</Typography>
                <Typography>To: {carpool.destination}</Typography>
                <Typography>Time: {new Date(carpool.time).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CarpoolManagement;
