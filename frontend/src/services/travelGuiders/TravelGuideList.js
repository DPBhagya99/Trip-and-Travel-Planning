import React, { useEffect, useState } from 'react';
import GuideCard from './GuideCard';
import BookedGuidesList from './BookedGuidesList';
import { Grid, Container, Typography, TextField, MenuItem, Slider, Button, Paper, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../../hooks/useTripContext';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';

const TravelGuideList = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceRange, setPriceRange] = useState([50, 200]);
    const [minRating, setMinRating] = useState(3);
    const [languages, setLanguages] = useState([]);
    const navigate = useNavigate();
    const { tripData } = useTripContext();
    const { user } = useAuthContext();

    const fetchGuides = async () => {
        if (!tripData || !tripData.destinations || tripData.destinations.length === 0) return;

        const currentDestination = tripData.destinations[0];
        const { lat, lng } = currentDestination.position;

        try {
            setLoading(true);
            const response = await fetch(`/api/guides/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    lat,
                    lng,
                    maxDistance: 20,
                    minRating,
                    priceRange,
                    languages,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch travel guides');
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setGuides(data);
            } else {
                throw new Error('Invalid data format: Expected an array');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuides();
    }, [tripData, priceRange, minRating, languages]);

    const handleClearFilters = () => {
        setPriceRange([50, 200]);
        setMinRating(3);
        setLanguages([]);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6" color="error" gutterBottom>
                    Error: {error}
                </Typography>
                <Button variant="contained" color="primary" onClick={fetchGuides}>
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 4, mb: 4, mt: 4, borderRadius: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600 }}>
                    Find Your Perfect Guide
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Minimum Rating"
                            type="number"
                            inputProps={{ min: 1, max: 5 }}
                            value={minRating}
                            onChange={(e) => setMinRating(Number(e.target.value))}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom>Price Range per Day</Typography>
                        <Slider
                            value={priceRange}
                            onChange={(e, newValue) => setPriceRange(newValue)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={500}
                            marks
                            sx={{ color: 'primary.main' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Languages"
                            select
                            fullWidth
                            value={languages}
                            onChange={(e) => setLanguages(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                            SelectProps={{ multiple: true, renderValue: (selected) => selected.join(', ') }}
                            variant="outlined"
                        >
                            {["English", "Spanish", "French", "German"].map((lang) => (
                                <MenuItem key={lang} value={lang}>
                                    {lang}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        onClick={handleClearFilters}
                        sx={{
                            mr: 2,
                            ':hover': { backgroundColor: 'rgba(0, 123, 255, 0.1)' },
                        }}
                    >
                        Clear Filters
                    </Button>
                    <Button
                        variant="contained"
                        onClick={fetchGuides}
                        color="primary"
                        sx={{
                            ':hover': { backgroundColor: 'primary.dark' },
                        }}
                    >
                        Apply Filters
                    </Button>
                </Box>
            </Paper>

            <Grid container spacing={3}>
                {guides.length > 0 ? (
                    guides.map((guide) => (
                        <Grid item xs={12} sm={6} md={4} key={guide._id}>
                            
                                <GuideCard guide={guide} onViewDetails={(id) => navigate(`/services/travel-guiders/${id}`)} />
                            
                        </Grid>
                    ))
                ) : (
                    <Box display="flex" justifyContent="center" width="100%" mt={4}>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', color: 'text.secondary' }}>
                            No guides available for the selected filters.
                        </Typography>
                    </Box>
                )}
            </Grid>

            <Typography variant="h4" sx={{ mt: 5, mb: 3, fontFamily: 'Roboto, sans-serif', fontWeight: 600 }}>
                My Booked Guides
            </Typography>
            <BookedGuidesList />
        </Container>
    );
};

export default TravelGuideList;
