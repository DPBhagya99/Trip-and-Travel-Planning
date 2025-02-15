import React from 'react';
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
    Container,
    Link,
    IconButton
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log("Form submitted");
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Paper
                elevation={4}
                sx={{
                    p: 5,
                    borderRadius: '24px',
                    boxShadow: 0,
                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 30%, rgba(240, 240, 240, 1) 100%)`,
                    mb: 5
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
                    Contact Us
                </Typography>
                <Divider sx={{ my: 3, backgroundColor: 'primary.main' }} />
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
                            Get in Touch
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                            We would love to hear from you! Whether you have a question about features, trials, pricing,
                            need a demo, or anything else, our team is ready to answer all your questions.
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Link href="mailto:info@company.com" underline="none" color="text.primary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                    info@company.com
                                </Link>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>(123) 456-7890</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>123 Main St, Anytown, USA</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
                            Send Us a Message
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Your Name"
                                        variant="outlined"
                                        name="name"
                                        sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Your Email"
                                        variant="outlined"
                                        name="email"
                                        type="email"
                                        sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Subject"
                                        variant="outlined"
                                        name="subject"
                                        sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Message"
                                        variant="outlined"
                                        name="message"
                                        sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        endIcon={<SendIcon />}
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: '50px',
                                            textTransform: 'none',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            transition: 'transform 0.2s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            },
                                        }}
                                    >
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 4, backgroundColor: 'primary.main' }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
                    Our Location
                </Typography>
                <Box
                    sx={{
                        mt: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                        height: '300px',
                        width: '100%',
                    }}
                >
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.6693705729714!2d-122.08385128469089!3d37.38605197983195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7332bcf2c2b%3A0x907b1f39c4842531!2sGoogleplex!5e0!3m2!1sen!2sus!4v1631927491191!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    />
                </Box>
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: '50px',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                        onClick={() => navigate('/about')}
                    >
                        Learn More About Us
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ContactPage;
