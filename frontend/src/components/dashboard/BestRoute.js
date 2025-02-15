import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GoogleMap, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { useTripContext } from '../../hooks/useTripContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Load the Poppins font globally
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  }
});

const BestRoute = () => {
  const [directions, setDirections] = useState(null);
  const [startLocation, setStartLocation] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const autocompleteRef = useRef(null);
  const { tripData, updateTripData } = useTripContext();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = { lat: latitude, lng: longitude };
        setStartLocation(currentLocation);
        setMapCenter(currentLocation);
      },
      () => {
        setError('Unable to fetch current location. Using default location.');
        setMapCenter({ lat: 6.9271, lng: 79.8612 }); // Default to Colombo
        setStartLocation({ lat: 6.9271, lng: 79.8612 });
      }
    );
  }, []);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setStartLocation(newLocation);
        setMapCenter(newLocation);
      }
    }
  };

  const calculateRoute = async () => {
    if (!tripData || tripData.destinations.length === 0) {
      setError('Please provide at least one destination.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const geocoder = new window.google.maps.Geocoder();
      const geocodedDestinations = await Promise.all(
        tripData.destinations.map((dest) => {
          if (!dest.name) {
            throw new Error('Invalid destination address');
          }
          return new Promise((resolve, reject) => {
            geocoder.geocode({ address: dest.name }, (results, status) => {
              if (status === 'OK' && results[0]) {
                resolve({
                  ...dest,
                  position: results[0].geometry.location.toJSON(),
                });
              } else {
                reject(new Error(`Failed to geocode: ${dest.name}`));
              }
            });
          });
        })
      );

      const waypoints = geocodedDestinations.map((destination) => ({
        location: destination.position,
        stopover: true,
      }));

      const directionsService = new window.google.maps.DirectionsService();
      const result = await new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin: startLocation,
            destination: waypoints[waypoints.length - 1].location,
            waypoints: waypoints.slice(0, -1),
            optimizeWaypoints: true,
            travelMode: travelMode,
          },
          (result, status) => {
            if (status === 'OK') {
              resolve(result);
            } else {
              reject(new Error(`Directions request failed: ${status}`));
            }
          }
        );
      });

      setDirections(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearRoute = () => {
    setDirections(null);
    updateTripData({ destinations: [] });
    setError(null);
  };

  const handleRemoveDestination = (index) => {
    const newDestinations = [...tripData.destinations];
    newDestinations.splice(index, 1);
    updateTripData({ destinations: newDestinations });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 4, px: 3, mb: 3, }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976D2', textAlign: 'center' }}>
          Travel Sri Route Finder
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <TextField
                  label="Start Location"
                  fullWidth
                  margin="normal"
                  value={typeof startLocation === 'string' ? startLocation : ''}
                  onChange={(e) => setStartLocation(e.target.value)}
                  placeholder="Enter your start location"
                />
              </Autocomplete>
              <List sx={{ mt: 2 }}>
                {(tripData.destinations || []).map((dest, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveDestination(index)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <ListItemText primary={dest.name} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                onClick={calculateRoute}
                sx={{
                  mt: 2,
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Calculate Route'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={clearRoute}
                sx={{ mt: 2, ml: 2, textTransform: 'none' }}
              >
                Clear Route
              </Button>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Travel Mode</Typography>
                <Select
                  value={travelMode}
                  onChange={(e) => setTravelMode(e.target.value)}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  <MenuItem value="DRIVING">Driving</MenuItem>
                  <MenuItem value="WALKING">Walking</MenuItem>
                  <MenuItem value="BICYCLING">Bicycling</MenuItem>
                </Select>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <GoogleMap
              mapContainerStyle={{ height: '400px', width: '100%' }}
              zoom={10}
              center={mapCenter}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
            {directions && (
              <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#1e1e1e',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  flex: '1 1 45%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Total Distance
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '1.2rem' }}>
                  {directions.routes[0].legs.reduce((sum, leg) => sum + leg.distance.value, 0) / 1000} km
                </Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#1e1e1e',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  flex: '1 1 45%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Total Duration
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '1.2rem' }}>
                  {Math.ceil(directions.routes[0].legs.reduce((sum, leg) => sum + leg.duration.value, 0) / 60)} mins
                </Typography>
              </Paper>
            </Box>
            
            )}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default BestRoute;
