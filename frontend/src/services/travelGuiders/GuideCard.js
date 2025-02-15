import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography, Rating, Box } from '@mui/material';

const GuideCard = ({ guide, onViewDetails }) => {
    return (
        <Card
            sx={{
                maxWidth: 345,
                margin: 'auto',
                boxShadow: 3,
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                ':hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
            }}
        >
            <CardMedia
                component="img"
                height="180"
                image={guide.profilePic}
                alt={guide.name}
                sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    ':hover': { transform: 'scale(1.05)' },
                }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                    {guide.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                    📍 Location: {guide.location.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                    👔 Experience: {guide.experienceYears} years
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                    🌐 Languages: {guide.languages.join(', ')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating value={guide.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
                        ({guide.rating})
                    </Typography>
                </Box>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${guide.pricePerDay} / day
                </Typography>
            </CardContent>
            <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{
                    width: '100%',
                    borderRadius: 0,
                    py: 1.5,
                    fontWeight: 'bold',
                    ':hover': { backgroundColor: 'primary.dark' },
                }}
                onClick={() => onViewDetails(guide._id)}
            >
                View Details
            </Button>
        </Card>
    );
};

export default GuideCard;
