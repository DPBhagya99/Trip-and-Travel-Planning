import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const destinations = [
    { title: 'Sigiriya', image: './landing_page/sigiriya.jpg', description: 'An ancient rock fortress and one of Sri Lanka’s most iconic landmarks.' },
    { title: 'Ella', image: './landing_page/ella.jpg', description: 'A small town in the central highlands, known for its breathtaking views.' },
    { title: 'Galle', image: './landing_page/galle.jpg', description: 'A historic city with colonial architecture and beautiful beaches.' },
    { title: 'Kandy', image: './landing_page/kandy.jpeg', description: 'The cultural capital, home to the Temple of the Tooth Relic.' },
];

const DescriptionContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
    },
    color: 'white'
}));

const ImageGallery = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: theme.spacing(2),
    justifyContent: 'center',
}));

const DestinationCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[10],
    },
    borderRadius: theme.spacing(2),
}));

const Overlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: theme.spacing(2),
}));

const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TouristDestinations = () => {
    return (
        <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
            <Box
                sx={{
                    padding: 2,
                    marginTop: 0,
                    bgcolor: 'black',
                    pt: { xs: 4, sm: 12 },
                    pb: { xs: 4, sm: 16 },
                    width: '100vw',
                    overflowX: 'hidden',
                    position: 'relative',
                    left: '49.35%',
                    transform: 'translateX(-50%)',
                    boxSizing: 'border-box'
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <DescriptionContainer>
                            <Typography variant="h3" gutterBottom>
                                Discover Sri Lanka
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Explore the most iconic tourist destinations in Sri Lanka. From the historic Sigiriya Rock Fortress to the scenic beauty of Ella, Sri Lanka offers a rich tapestry of cultural and natural wonders.
                            </Typography>
                            <Typography variant="body1">
                                Plan your journey with confidence, knowing you are visiting the most renowned and cherished locations on the island.
                            </Typography>
                        </DescriptionContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ImageGallery>
                            {destinations.map((destination, index) => (
                                <DestinationCard key={index}>
                                    <Box position="relative">
                                        <CardMedia
                                            component="img"
                                            alt={destination.title}
                                            height="200"
                                            image={destination.image}
                                            title={destination.title}
                                            sx={{ borderRadius: 2 }}
                                        />
                                        <Overlay />
                                    </Box>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {destination.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {destination.description}
                                        </Typography>
                                    </CardContent>
                                </DestinationCard>
                            ))}
                        </ImageGallery>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    );
};

export default TouristDestinations;
