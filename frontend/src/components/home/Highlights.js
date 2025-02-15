import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MapIcon from '@mui/icons-material/Map';
import ChatIcon from '@mui/icons-material/Chat';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsIcon from '@mui/icons-material/Directions';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const items = [
    {
        icon: <MapIcon />,
        title: 'Comprehensive Maps',
        description:
            'Navigate Sri Lanka’s top tourist destinations with our detailed and interactive maps.',
    },
    {
        icon: <HotelIcon />,
        title: 'Best Accommodation Options',
        description:
            'Discover and book the best hotels, guesthouses, and stays during your travels.',
    },
    {
        icon: <RestaurantIcon />,
        title: 'Top Dining Recommendations',
        description:
            'Explore and enjoy the finest dining experiences at local and international restaurants.',
    },
    {
        icon: <ChatIcon />,
        title: 'Traveler Community',
        description:
            'Connect with fellow travelers, share experiences, and get real-time travel tips.',
    },
    {
        icon: <DirectionsIcon />,
        title: 'Optimized Route Planning',
        description:
            'Plan your trip with our smart route suggestions, ensuring you see all the best spots efficiently.',
    },
    {
        icon: <SupportAgentIcon />,
        title: '24/7 Travel Assistance',
        description:
            'Get round-the-clock support for any issues or queries during your journey.',
    },
];

export default function Highlights() {
    return (
        <Box
            id="highlights"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 4, sm: 16 },
                color: 'white',
                bgcolor: '#033363',
                width: '100vw',
                position: 'relative',
                left: '49.35%',
                transform: 'translateX(-50%)',
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 4, sm: 6 },
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: { sm: 'left', md: 'center' },
                        margin: 2
                    }}
                >
                    <Typography component="h2" variant="h4">
                        Highlights
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'grey.400' }}>
                        Explore the features that make our travel planning app the perfect companion for your journey. From detailed maps to real-time community support, our app has everything you need to ensure a smooth and enjoyable travel experience.
                    </Typography>
                </Box>
                <Grid container spacing={1.5}>
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} spacing={2} sx={{ marginBottom: 7 }}>
                            <Stack
                                direction="column"
                                color="inherit"
                                component={Card}
                                spacing={1}
                                useFlexGap
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'grey.800',
                                    background: 'transparent',
                                    backgroundColor: 'grey.900',
                                }}
                            >
                                <Box sx={{ opacity: '50%', margin: 2 }}>{item.icon}</Box>
                                <div>
                                    <Typography fontWeight="medium" gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                        {item.description}</Typography>
                                </div>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
