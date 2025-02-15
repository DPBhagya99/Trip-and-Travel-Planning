import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
    {
        icon: <SettingsSuggestRoundedIcon sx={{ fontSize: 60, color: '#4caf50' }} />,
        title: 'Personalized Itineraries',
        description: 'Our app creates personalized trip itineraries based on your preferences and interests.',
    },
    {
        icon: <ConstructionRoundedIcon sx={{ fontSize: 60, color: '#ff9800' }} />,
        title: 'Real-Time Updates',
        description: 'Stay informed with real-time updates on weather, traffic, and more during your travels.',
    },
    {
        icon: <ThumbUpAltRoundedIcon sx={{ fontSize: 60, color: '#2196f3' }} />,
        title: 'Easy Navigation',
        description: 'Navigate effortlessly with detailed maps and directions for every stop on your journey.',
    },
    {
        icon: <AutoFixHighRoundedIcon sx={{ fontSize: 60, color: '#9c27b0' }} />,
        title: 'Recommendations',
        description: 'Receive tailored recommendations for lodging, dining, and activities at every destination.',
    },
    {
        icon: <SupportAgentRoundedIcon sx={{ fontSize: 60, color: '#e91e63' }} />,
        title: '24/7 Support',
        description: 'Access our customer support team anytime, anywhere for help with your travel plans.',
    },
    {
        icon: <QueryStatsRoundedIcon sx={{ fontSize: 60, color: '#00bcd4' }} />,
        title: 'Budget Optimization',
        description: 'Optimize your travel budget with cost-effective suggestions and money-saving tips.',
    },
];

export default function ChatService() {
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
                top: '67%',
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
                        Why Choose Our Trip Planner?
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'grey.400' }}>
                        Discover the unique features that make our trip planning app the perfect companion for your travels in Sri Lanka. Enjoy a seamless experience with personalized itineraries, real-time updates, and expert recommendations.
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ background: '#1c1c1c', color: 'white', minHeight: '210px' }}>
                                <CardActionArea>
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Box sx={{ mb: 2 }}>
                                            {item.icon}
                                        </Box>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="grey.400" textAlign="center">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
