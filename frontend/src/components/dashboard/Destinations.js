import React, { useState, useEffect } from 'react';
import {
    Box,
    Snackbar,
    CircularProgress,
    Alert,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
} from '@mui/material';
import { useTripContext } from '../../hooks/useTripContext';
import { chatSession } from '../../config/AIModel';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';

const Destinations = () => {
    const { tripData } = useTripContext();
    const { user } = useAuthContext();

    const [aiResult, setAIResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });

    const { vertical, horizontal, open } = snackbarState;

    useEffect(() => {
        const generateAIContent = async () => {
            if (!tripData) {
                setMessage('No trip data found.');
                setSnackbarState({ ...snackbarState, open: true });
                setLoading(false);
                return;
            }

            try {
                const AI_PROMPT = `Generate Travel Plan for Location: ${tripData.destinations[0].name}, for ${tripData.days} Days for ${tripData.people} people with a ${tripData.budget} budget. Provide hotel options and an itinerary in JSON format.`;
                console.log(AI_PROMPT);

                const result = await chatSession.sendMessage(AI_PROMPT);
                const data = await result.response.text();
                const parsedData = JSON.parse(data);

                // Validate the response
                if (!Array.isArray(parsedData.hotels) || !Array.isArray(parsedData.itinerary)) {
                    throw new Error('Invalid AI response format.');
                }

                setAIResult(parsedData);
            } catch (err) {
                console.error('AI Error:', err);
                setError('Failed to generate content from AI.');
                setMessage('An error occurred while generating travel plans.');
                setSnackbarState({ ...snackbarState, open: true });
            } finally {
                setLoading(false);
            }
        };

        generateAIContent();
    }, [tripData]);

    const saveAITrip = async (tripDataAI) => {
        try {
            const docID = Date.now().toString();
            await setDoc(doc(db, 'TripSuggestions', docID), {
                TripDataAI: tripDataAI,
                userEmail: user?.email,
                id: docID,
            });
            console.log('Trip data saved successfully!');
        } catch (err) {
            console.error('Error saving trip data:', err);
            setError('Failed to save the generated trip data.');
            setSnackbarState({ ...snackbarState, open: true });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    const renderLoading = () => (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
            }}
        >
            <CircularProgress />
            <Typography variant="h6" color="primary">
                Generating travel plan...
            </Typography>
        </Box>
    );

    const renderError = () =>
        error && (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );

    const renderHotels = () =>
        aiResult?.hotels?.length ? (
            <>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ marginBottom: 4, fontWeight: 'bold', color: '#333' }}
                >
                    Hotel Recommendations
                </Typography>
                <Grid container spacing={3}>
                    {aiResult.hotels.map((hotel, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={hotel.hotelName || index}
                        >
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'scale(1.03)' },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: '180px',
                                        objectFit: 'cover',
                                        borderRadius: '10px 10px 0 0',
                                    }}
                                    image={hotel.imageUrl || './assets/destination1.jpg'}
                                    alt={hotel.hotelName}
                                />
                                <CardContent sx={{ padding: 2 }}>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ fontWeight: 'bold', color: '#222' }}
                                    >
                                        {hotel.hotelName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ marginTop: 1 }}
                                    >
                                        <LocationOnIcon
                                            fontSize="small"
                                            sx={{ marginRight: 0.5, color: '#888' }}
                                        />
                                        {hotel.hotelAddress}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.primary"
                                        sx={{ marginTop: 1 }}
                                    >
                                        <AttachMoneyIcon
                                            fontSize="small"
                                            sx={{ marginRight: 0.5, color: '#888' }}
                                        />
                                        {hotel.priceRange || 'N/A'} per night
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ marginTop: 1 }}
                                    >
                                        <StarIcon
                                            fontSize="small"
                                            sx={{ marginRight: 0.5, color: '#FFD700' }}
                                        />
                                        {hotel.rating || 'N/A'} stars
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </>
        ) : (
            <Typography>No hotels found.</Typography>
        );

    const renderItinerary = () =>
        aiResult?.itinerary?.length ? (
            <>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ marginTop: 4, fontWeight: 'bold', color: '#333' }}
                >
                    Places to Visit
                </Typography>
                {aiResult.itinerary.map((dayPlan, index) => (
                    <Box key={dayPlan.day || index} sx={{ marginBottom: 4 }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{ color: '#555', fontWeight: 600 }}
                        >
                            Day {dayPlan.day}
                        </Typography>
                        <Grid container spacing={3}>
                            {dayPlan.plan?.map((activity, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                            transition: 'transform 0.2s',
                                            '&:hover': { transform: 'scale(1.03)' },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{ height: '200px', objectFit: 'cover' }}
                                            image={activity.imageUrl || './assets/destination3.jpg'}
                                            alt={activity.placeName}
                                        />
                                        <CardContent sx={{ padding: 2 }}>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                    color: '#222',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {activity.placeName || 'Unknown'}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ marginBottom: 1 }}
                                            >
                                                {activity.placeDetails || 'No details available.'}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginTop: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                >
                                                    <AccessTimeIcon
                                                        fontSize="small"
                                                        sx={{ marginRight: 0.5, color: '#888' }}
                                                    />
                                                    {activity.timeTravel || 'N/A'} minutes
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                >
                                                    <AttachMoneyIcon
                                                        fontSize="small"
                                                        sx={{ marginRight: 0.5, color: '#888' }}
                                                    />
                                                    {activity.ticketPricing || 'Free'}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </>
        ) : (
            <Typography>No itinerary found.</Typography>
        );

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleCloseSnackbar}
                message={message}
                key={vertical + horizontal}
                autoHideDuration={6000}
            />
            {loading
                ? renderLoading()
                : aiResult
                ? (
                    <>
                        {renderHotels()}
                        {renderItinerary()}
                    </>
                )
                : <Typography>{message}</Typography>}
            {renderError()}
        </Box>
    );
};

export default Destinations;
