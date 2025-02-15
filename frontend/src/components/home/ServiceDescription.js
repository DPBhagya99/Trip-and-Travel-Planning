import React from 'react';
import { Container, Grid, Typography, Box, Paper, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const img = [
    { title: 'Chat', image: './landing_page/chat.png' },
];

const ImageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
    },
}));

const DescriptionContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
    },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServiceDescription = () => {
    return (
        <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
            <Box maxWidth="lg">
                <Paper elevation={0} sx={{
                    pt: { xs: 4, sm: 12 },
                    pb: { xs: 4, sm: 16 },
                    bgcolor: '#033363',
                    width: '100vw',
                    overflowX: 'hidden',
                    position: 'relative',
                    left: '49.35%',
                    transform: 'translateX(-50%)',
                    borderRadius: 0
                }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <ImageContainer>
                                <Box position="relative" sx={{ width: '80%' }}>
                                    <StyledCardMedia
                                        component="img"
                                        alt={img[0].title}
                                        height="100%"
                                        image={img[0].image}
                                    />
                                </Box>
                            </ImageContainer>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DescriptionContainer>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    Connect with Fellow Travelers
                                </Typography>
                                <Typography variant="body1" paragraph sx={{ color: '#fff' }}>
                                    Our app allows you to connect with other travelers visiting similar destinations. Share tips, get real-time updates, and enhance your travel experience by staying connected with the community.
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#fff' }}>
                                    Whether you’re visiting the scenic landscapes of Ella or the vibrant streets of Colombo, our chat feature helps you stay informed and engaged with fellow explorers.
                                </Typography>
                            </DescriptionContainer>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </motion.div>
    );
};

export default ServiceDescription;
