import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

import Logo from '../assets/Logo.png';

const logoStyle = {
    width: '140px',
    height: 'auto',
};

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" mt={1}>
            {'Copyright © '}
            <Link href="#">Travel Planner&nbsp;</Link>
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 4, sm: 8 },
                py: { xs: 8, sm: 10 },
                textAlign: { sm: 'center', md: 'left' },
                bgcolor: '#033363',
                padding: 10,
                color: '#CEE5FD'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        minWidth: { xs: '100%', sm: '60%' },
                    }}
                >
                    <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
                        <Box
                            component="img"
                            src={Logo}
                            alt="Logo"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                mr: 1,
                                padding: 1.5,
                                width: '40%',
                                height: 'auto',
                                borderRadius: 2,
                            }}
                        />
                        <Typography variant="body2" fontWeight={600} gutterBottom>
                            Newsletter
                        </Typography>
                        <Typography variant="body2" color="#CEE5FD" mb={2}>
                            Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive offers.
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap color="#CEE5FD">
                            <TextField
                                id="outlined-basic"
                                hiddenLabel
                                size="small"
                                variant="outlined"
                                fullWidth
                                aria-label="Enter your email address"
                                placeholder="Your email address"
                                inputProps={{
                                    autoComplete: 'off',
                                    'aria-label': 'Enter your email address',
                                }}
                            />
                            <Button variant="contained" color="primary" sx={{ flexShrink: 0 }}>
                                Subscribe
                            </Button>
                        </Stack>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        Explore
                    </Typography>
                    <Link color="#CEE5FD" href="#">
                        Destinations
                    </Link>
                    <Link color="#CEE5FD" href="#">
                        Trip Planner
                    </Link>
                    <Link color="#CEE5FD" href="#">
                        Travel Tips
                    </Link>
                    <Link color="#CEE5FD" href="#">
                        Community
                    </Link>
                    <Link color="#CEE5FD" href="#">
                        Blog
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        About Us
                    </Typography>
                    <Link color="#CEE5FD" href="#">
                        Our Story
                    </Link>
                    <Link color="#CEE5FD" href="#">
                        Careers
                    </Link>
                    <Link color="#CEE5FD" href="#">
                        Press
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        Support
                    </Typography>
                    <Link color="#CEE5FD" href="#">
                        Help Center
                    </Link>
                    <Link color="#CEE5FD" href="#">
                        Contact Us
                    </Link>
                    <Link color="#CEE5FD" href="#">
                        Terms of Service
                    </Link>
                    <Link color="#CEE5FD" href="#">
                        Privacy Policy
                    </Link>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: { xs: 4, sm: 8 },
                    width: '100%',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <div>
                    <Link color="#CEE5FD" href="#">
                        Privacy Policy
                    </Link>
                    <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
                        &nbsp;•&nbsp;
                    </Typography>
                    <Link color="#CEE5FD" href="#">
                        Terms of Service
                    </Link>
                    <Copyright />
                </div>
                <Stack
                    direction="row"
                    justifyContent="left"
                    spacing={1}
                    useFlexGap
                    sx={{
                        color: 'text.secondary',
                    }}
                >
                    <IconButton
                        color="white"
                        href="https://facebook.com/yourpage"
                        aria-label="Facebook"
                        sx={{ alignSelf: 'center',
                            borderRadius: 10,
                            borderWidth: 2
                    }}
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        href="https://twitter.com/yourhandle"
                        aria-label="Twitter"
                        sx={{ alignSelf: 'center' }}
                    >
                        <TwitterIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        href="https://www.linkedin.com/company/yourcompany"
                        aria-label="LinkedIn"
                        sx={{ alignSelf: 'center' }}
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );
}
