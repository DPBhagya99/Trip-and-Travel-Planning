import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    List,
    Container,
    Typography,
    Button,
    TextField,
    Rating,
    Paper,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stepper,
    Step,
    StepLabel,
    Divider,
    Avatar,
    Stack,
    Grid
} from '@mui/material';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';
import PaymentForm from './PaymentForm';
import Review from './Review';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaceIcon from '@mui/icons-material/Place';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';

const steps = ['Booking Details', 'Payment Information', 'Review and Confirm'];

const TravelGuidePage = () => {
    const { id } = useParams();
    const [guide, setGuide] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const response = await fetch(`/api/travel-guides/${id}`);
                if (!response.ok) throw new Error('Failed to fetch guide details');
                const data = await response.json();
                setGuide(data);
            } catch (error) {
                console.error('Error fetching guide:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGuide();
    }, [id]);

    const handleBooking = () => setCheckoutOpen(true);

    const handleConfirmBooking = async () => {
        if (!startDate || !endDate) {
            alert('Please provide both start and end dates.');
            return;
        }
    
        // Calculate total price based on number of days and guide's price per day
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dayDifference = (end - start) / (1000 * 60 * 60 * 24); // Difference in days
    
        if (dayDifference <= 0) {
            alert('End date must be after the start date.');
            return;
        }
    
        const totalPrice = dayDifference * guide.pricePerDay;
    
        try {
            const response = await fetch(`/api/travel-guides/${id}/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ startDate, endDate, totalPrice }),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert('Booking successful');
                setCheckoutOpen(false); // Close the booking dialog after success
                console.log("Booking data:", result); // Logging for debugging
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to book guide');
            }
        } catch (error) {
            console.error('Booking error:', error);
        }
    };
    
    

    const handleAddReview = async () => {
        try {
            const response = await fetch(`/api/travel-guides/${id}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ review: reviewText, rating: reviewRating }),
            });

            if (response.ok) {
                alert('Review added successfully!');
                setReviewText('');
                setReviewRating(0);
                const updatedGuide = await response.json();
                setGuide(updatedGuide);
            } else {
                const data = await response.json();
                alert(data.error);
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            alert('Booking confirmed!');
            setCheckoutOpen(false);
            setActiveStep(0);
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

    if (!guide) {
        return (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 5 }}>
                Failed to load guide details.
            </Typography>
        );
    }

    return (
        <Container sx={{ mt: 8, mb: 8 }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 5, md: 8 },
                    borderRadius: '24px',
                    backgroundColor: '#fafafa',
                    border: '1px solid #e0e0e0',
                }}
            >
                {/* Guide Information Section */}
                <Box textAlign="center" mb={4}>
                    <Avatar
                        src={guide.profilePic || 'default-profile.jpg'}
                        alt={guide.name || 'Guide'}
                        sx={{
                            width: 140,
                            height: 140,
                            mx: 'auto',
                            mb: 2,
                            border: '2px solid #1976d2',
                        }}
                    />
                    <Typography variant="h3" fontWeight="bold" sx={{ color: '#1976d2' }}>
                        {guide.name}
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <PlaceIcon color="primary" />
                                <Typography variant="subtitle1" color="textSecondary">
                                    Location: {guide.location?.name || 'Unknown'}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <WorkIcon color="primary" />
                                <Typography variant="subtitle1" color="textSecondary">
                                    Experience: {guide.experienceYears || 0} years
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <LanguageIcon color="primary" />
                                <Typography variant="subtitle1" color="textSecondary">
                                    Languages: {guide.languages?.join(', ') || 'N/A'}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Box display="flex" justifyContent="center" my={2}>
                        <Rating value={guide.rating || 0} readOnly />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            ({guide.rating || 0})
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ lineHeight: 1.6, mt: 2 }}>
                        {guide.bio || 'No bio available.'}
                    </Typography>
                    <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mt: 2 }}>
                        <AttachMoneyIcon sx={{ verticalAlign: 'middle' }} />{guide.pricePerDay || 0} per day
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBooking}
                        sx={{
                            mt: 3,
                            px: 4,
                            py: 1,
                            borderRadius: '50px',
                            fontWeight: 'bold',
                        }}
                    >
                        Book Now
                    </Button>
                </Box>

                {/* Booking Dialog */}
                <Dialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ fontWeight: 'bold' }}>Complete Your Booking</DialogTitle>
                    <DialogContent>
                        <Stepper activeStep={activeStep} sx={{ py: 3 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === 0 && (
                            <Box sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom>Booking Details</Typography>
                                <TextField
                                    label="Start Date"
                                    type="date"
                                    fullWidth
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                        )}
                        {activeStep === 1 && <PaymentForm guide={guide} bookingDates={{ startDate, endDate }} />}
                        {activeStep === 2 && <Review guide={guide} bookingDates={{ startDate, endDate }} />}
                    </DialogContent>

                    <DialogActions>
                        {activeStep > 0 && (
                            <Button onClick={handleBack} variant="outlined" color="secondary">
                                Back
                            </Button>
                        )}
                        <Button onClick={handleNext} variant="contained" color="primary">
                            {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Reviews Section */}
                <Typography variant="h5" mt={6} fontWeight="bold">Reviews</Typography>
                <List sx={{ maxHeight: 400, overflowY: 'auto', padding: 0 }}>
                    {guide.reviews?.length > 0 ? (
                        guide.reviews.map((review, index) => (
                            <Paper
                                key={index}
                                elevation={0}
                                sx={{
                                    padding: 2,
                                    mb: 2,
                                    borderRadius: 2,
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                }}
                            >
                                <Typography variant="body1" gutterBottom>
                                    {review.review}
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    <Rating value={review.rating} readOnly size="small" />
                                    <Typography variant="body2" ml={1}>
                                        by {review.user ? `${review.user.firstName} ${review.user.lastName}` : 'Anonymous'}
                                    </Typography>
                                </Box>
                            </Paper>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">No reviews yet. Be the first to add one!</Typography>
                    )}
                </List>

                {/* Add a Review Section */}
                <Typography variant="h5" mt={4} fontWeight="bold">Add a Review</Typography>
                <Paper elevation={0} sx={{ padding: 3, mt: 2, borderRadius: 2, backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0' }}>
                    <TextField
                        label="Your Review"
                        fullWidth
                        multiline
                        rows={4}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Rating
                            value={reviewRating}
                            onChange={(e, newValue) => setReviewRating(newValue)}
                            precision={0.5}
                            sx={{ mr: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddReview}
                            sx={{
                                px: 3,
                                borderRadius: 3,
                                fontWeight: 'bold',
                            }}
                        >
                            Submit Review
                        </Button>
                    </Box>
                </Paper>
            </Paper>
        </Container>
    );
};

export default TravelGuidePage;
