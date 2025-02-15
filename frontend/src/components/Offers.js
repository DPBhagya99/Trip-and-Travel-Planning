import React from 'react';
import { Container, Grid, Typography, Box, Card, CardMedia } from '@mui/material';
import { styled } from '@mui/system';

const destinations = [
    { title: 'Sigiriya', image: 'https://example.com/sigiriya.jpg' },
    { title: 'Ella', image: 'https://example.com/ella.jpg' },
    { title: 'Galle', image: 'https://example.com/galle.jpg' },
    { title: 'Kandy', image: 'https://example.com/kandy.jpg' },
];

const DescriptionContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
    },
}));

const ImageGallery = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    justifyContent: 'center',
}));

const DestinationCard = styled(Card)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('md')]: {
        width: 'calc(25% - 16px)',
    },
}));

const TouristDestinations = () => {
    return (
        <Container maxWidth="lg" sx={{ marginTop: 8 }}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <DescriptionContainer>
                        <Typography variant="h4" gutterBottom>
                            Discover Sri Lanka
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Through this app, you can explore the most popular tourist destinations in Sri Lanka. From the historic rock fortress of Sigiriya to the scenic beauty of Ella, the coastal charm of Galle, and the cultural heart of Kandy, Sri Lanka offers a diverse range of attractions for every traveler.
                        </Typography>
                        <Typography variant="body1">
                            Plan your trip, find the best spots, and make the most of your visit to this beautiful island nation.
                        </Typography>
                    </DescriptionContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ImageGallery container spacing={2}>
                        {destinations.map((destination, index) => (
                            <DestinationCard key={index}>
                                <CardMedia
                                    component="img"
                                    alt={destination.title}
                                    height="140"
                                    image={destination.image}
                                    title={destination.title}
                                />
                            </DestinationCard>
                        ))}
                    </ImageGallery>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TouristDestinations;
