import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper, Grid, Card, CardContent, Avatar } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import { useTripContext } from "../../hooks/useTripContext";

const TripDetails = () => {
  const { tripData } = useTripContext();

  if (!tripData || !tripData.destinations) {
    return (
      <Box sx={{ padding: '16px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
        <Typography variant="h4" sx={{ marginBottom: '16px', fontWeight: 'bold', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
          Trip Details
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ color: '#bbb', fontFamily: 'Poppins, sans-serif' }}>
          No trip selected.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: '24px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Poppins, sans-serif',
        mt: 4, px: 3, mb: 3, marginLeft: 3
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: '32px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1976D2',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Your Trip Details
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '16px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#1c1c1c',
              color: '#fff',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#00bcd4', marginRight: '12px' }}>
                  <CalendarTodayIcon />
                </Avatar>
                <Typography variant="body1" sx={{ color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                  <strong>Number of Days:</strong> {tripData.days || 'N/A'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '16px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#1c1c1c',
              color: '#fff',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#00bcd4', marginRight: '12px' }}>
                  <AttachMoneyIcon />
                </Avatar>
                <Typography variant="body1" sx={{ color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                  <strong>Budget:</strong> {tripData.budget ? tripData.budget.charAt(0).toUpperCase() + tripData.budget.slice(1) : 'N/A'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '16px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#1c1c1c',
              color: '#fff',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#00bcd4', marginRight: '12px' }}>
                  <GroupIcon />
                </Avatar>
                <Typography variant="body1" sx={{ color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                  <strong>Friends:</strong>{' '}
                  {tripData.friends && tripData.friends.length > 0 ? tripData.friends.join(', ') : 'No friends added'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '16px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#1c1c1c',
              color: '#fff',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#00bcd4', marginRight: '12px' }}>
                  <BuildIcon />
                </Avatar>
                <Typography variant="body1" sx={{ color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                  <strong>Services:</strong>{' '}
                  {tripData.services && tripData.services.length > 0 ? tripData.services.join(', ') : 'No services selected'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: '#333' }} />

      <Typography variant="h5" sx={{ marginBottom: '16px', color: '#00bcd4', fontFamily: 'Poppins, sans-serif', fontWeight: '700', textAlign: 'center' }}>
        Destinations
      </Typography>
      <Paper
        elevation={5}
        sx={{
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: '#1c1c1c',
          color: '#fff',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <List
          sx={{
            maxHeight: '250px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#00bcd4',
              borderRadius: '8px',
            },
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {tripData.destinations.map((destination, index) => (
            <ListItem
              key={index}
              sx={{
                padding: '12px 0',
                borderBottom: index !== tripData.destinations.length - 1 ? '1px solid #333' : 'none',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              <PlaceIcon sx={{ marginRight: '12px', color: '#00bcd4' }} />
              <ListItemText
                primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold', color: '#fff', fontFamily: 'Poppins, sans-serif' }}
                primary={`${index + 1}. ${destination.name}`}
                secondary={`Coordinates: (${destination.position.lat}, ${destination.position.lng})`}
                secondaryTypographyProps={{ color: '#bbb', fontFamily: 'Poppins, sans-serif' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TripDetails;
