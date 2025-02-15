import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem,
    ListItemText, useMediaQuery, Slide
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Banner from '../components/dashboard/Banner';
import MyTrip from '../components/dashboard/MyTrip';
import BestRoute from '../components/dashboard/BestRoute';
import Services from '../components/dashboard/Services';
import RecentUsedServices from '../components/dashboard/RecentUsedServices';
import Notifications from '../components/dashboard/Notifications';
import TripDetails from '../components/dashboard/TripDetails';
import Destinations from '../components/dashboard/Destinations';
import { useAuthContext } from "../authentication/hooks/useAuthContext";
import { useTripContext } from "../hooks/useTripContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const { user } = useAuthContext();
    const { tripData, setTripData } = useTripContext();
    const [userTrips, setUserTrips] = useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
                const data = await response.json();
                // Ensure the response is an array before setting it
                if (Array.isArray(data)) {
                    setUserTrips(data);
                } else {
                    setUserTrips([]);  // Default to an empty array if not
                }
                if (!tripData) {
                    setOpen(true);
                }
            } catch (error) {
                console.error('Error fetching trips:', error);
                setUserTrips([]);  // Default to an empty array on error
            }
        };

        fetchTrips();
    }, [user.token, setTripData, tripData]);

    const handleSelectTrip = (trip) => {
        setTripData(trip);
        setOpen(false);
    };

    return (
        <Box sx={{ padding: 5 }}>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Transition}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Select a Trip"}</DialogTitle>
                <DialogContent>
                    <List>
                        {userTrips.length > 0 ? (
                            userTrips.map((trip) => (
                                <ListItem button onClick={() => handleSelectTrip(trip)} key={trip._id}>
                                    <ListItemText primary={`${trip.destinations[0]?.name || "Unnamed Trip"} - ${trip.days} days`} />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No trips available" />
                            </ListItem>
                        )}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Banner />
                </Grid>
                <Grid item xs={5} sm={6} md={6}>
                  <TripDetails />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                   //MyTrip 
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                   <BestRoute />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                   <Services />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    //Recent 
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                   // Notification 
                </Grid>
                <Grid item xs={12}>
                    // Destinations
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
