import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const userTestimonials = [
    {
        avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
        name: 'Remy Sharp',
        occupation: 'Travel Enthusiast',
        testimonial: "This app made my trip planning so much easier! I loved the personalized recommendations and the real-time updates on traffic and weather.",
    },
    {
        avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
        name: 'Travis Howard',
        occupation: 'Backpacker',
        testimonial: "The community feature is fantastic! I was able to connect with other travelers and share tips on the best spots to visit in Sri Lanka.",
    },
    {
        avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
        name: 'Cindy Baker',
        occupation: 'Adventurer',
        testimonial: "The app's ease of use and comprehensive recommendations helped me discover hidden gems in Sri Lanka that I would have otherwise missed.",
    },
];

const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Testimonials = () => {
    return (
        <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
            <Container
                id="testimonials"
                sx={{
                    pt: { xs: 6, sm: 14 },
                    pb: { xs: 10, sm: 18 },
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 4, sm: 8 },
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: 'center',
                        mb: 6,
                    }}
                >
                    <Typography component="h2" variant="h4" color="text.primary" fontWeight="bold" gutterBottom>
                        What Our Users Are Saying
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Hear from travelers who have used our app to plan their perfect trip in Sri Lanka. Discover how our app has enhanced their travel experiences.
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {userTestimonials.map((testimonial, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    p: 3,
                                    backgroundColor: 'background.paper',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                    borderRadius: 2,
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        {testimonial.testimonial}
                                    </Typography>
                                </CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mt: 2,
                                    }}
                                >
                                    <Avatar
                                        src={testimonial.avatar.props.src}
                                        alt={testimonial.avatar.props.alt}
                                        sx={{ width: 56, height: 56, mr: 2 }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {testimonial.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {testimonial.occupation}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </motion.div>
    );
};

export default Testimonials;
