import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import bannerVideo from '../video/banner.mp4';
import {useAuthContext} from "../../authentication/hooks/useAuthContext";

const BannerBox = styled(Box)({
  position: 'relative',
  height: '500px',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden', // Ensures the video fits within the container
});

const Video = styled('video')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100vw',
  height: '100vh',
  objectFit: 'cover',
  transform: 'translate(-50%, -50%)',
  zIndex: -1,
});

const BannerTitle = styled(Typography)({
  fontSize: '3rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
});

const BannerSubtitle = styled(Typography)({
  fontSize: '1.5rem',
  textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
});

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext()

  const startTrip = () => {
    if (user) {
      navigate('/trip-planner');
    } else {
      navigate('/login');
    }
  };

  return (
      <BannerBox>
        <Video autoPlay loop muted playsInline>
          <source src={bannerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </Video>

        <Button variant="contained" onClick={startTrip} sx={{ mt: 40 }}>
          Start Trip
        </Button>
      </BannerBox>
  );
};

export default Banner;
