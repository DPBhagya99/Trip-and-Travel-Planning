import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, Alert, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTripContext } from "../../hooks/useTripContext";
import { useAuthContext } from "../../authentication/hooks/useAuthContext";

const MyTrip = () => {
    const { user } = useAuthContext();
    const [userTrips, setUserTrips] = useState([]);
    const [error, setError] = useState(null);
    const { setTripData } = useTripContext();

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch('/api/trips', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch trips');
                }
                const data = await response.json();
                setUserTrips(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, [user.token]);

    const handleSelectTrip = (trip) => {
        setTripData(trip);
    };

    return (
        <Box sx={{ mt: 4, px: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>My Trips</Typography>
            {error ? (
                <Alert severity="error" sx={{ mb: 2, px: 2, py: 1.5 }}>
                    {error}
                </Alert>
            ) : (
                <Box
                    sx={{
                        maxHeight: '500px', // Maximum height for the list
                        overflowY: 'auto', // Enable vertical scrollbar
                        scrollbarWidth: 'thin', // For Firefox
                        '&::-webkit-scrollbar': {
                            width: '8px', // Modern scrollbar width
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#f0f0f0', // Track color
                            borderRadius: '10px', // Rounded corners for the track
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888', // Thumb color
                            borderRadius: '10px', // Rounded corners for the thumb
                            '&:hover': {
                                backgroundColor: '#555', // Thumb color on hover
                            },
                        },
                    }}
                >
                    <List>
                        {userTrips.map((trip) => (
                            <React.Fragment key={trip._id}>
                                <Paper elevation={3} sx={{ borderRadius: 2, mb: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' }, margin: 3 }}>
                                    <ListItem
                                        button
                                        onClick={() => handleSelectTrip(trip)}
                                        sx={{
                                            borderRadius: 2,
                                            p: 2,
                                            '&:hover': { backgroundColor: '#f9f9f9' }
                                        }}
                                    >
                                        <ListItemIcon>
                                            <LocationOnIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={trip.destinations[0]?.name || "Unnamed Trip"}
                                            secondary={`Days: ${trip.days}, Budget: ${trip.budget.charAt(0).toUpperCase() + trip.budget.slice(1)}`}
                                            primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
                                            secondaryTypographyProps={{ color: '#777' }}
                                        />
                                    </ListItem>
                                </Paper>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default MyTrip;
