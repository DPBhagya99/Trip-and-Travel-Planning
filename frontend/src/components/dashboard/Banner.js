import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Paper, Divider } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import { useTripContext } from "../../hooks/useTripContext";
import { getPlaceDetails } from '../../config/GlobalAPI';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1080&maxWidthPx=1920&key=AIzaSyAjiU4RsJfNJoVcll2oEsIaTdzw6p3Srl0';

// Create a theme with Poppins as the default font
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    allVariants: {
      color: '#FFFFFF',
    },
  },
  palette: {
    background: {
      default: '#1e1e1e',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
  },
});

const Banner = () => {
  const { tripData } = useTripContext();
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    GetPlacePhoto();
  }, [tripData]);

  const GetPlacePhoto = async () => {
    try {
      if (!tripData || !tripData.destinations[0]?.name) {
        console.error('Invalid trip data.');
        return;
      }

      const data = { textQuery: tripData.destinations[0]?.name };
      const result = await getPlaceDetails(data);

      const places = result?.places;
      if (!places || places.length === 0) {
        console.error('No places found in the response.');
        return;
      }

      const photos = places[0]?.photos;
      if (!photos || photos.length === 0) {
        console.error('No photos found for the place.');
        return;
      }

      const photoUrl = PHOTO_REF_URL.replace('{NAME}', photos[3].name);
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error('Error fetching place photo:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          backgroundColor: '#1e1e1e',
          borderRadius: 3,
          width: '100%',
          maxWidth: '1200px',
          m: 'auto',
          mt: 4,
        }}
      >
        {tripData ? (
          <>
            <Box
              sx={{
                width: '100%',
                height: '250px',
                borderRadius: 3,
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src={photoUrl || '/default-placeholder.jpg'} // Add a placeholder image if photoUrl is unavailable
                alt="Trip Banner"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {tripData.destinations[0]?.name || "Unnamed Destination"}
            </Typography>
            <Divider sx={{ width: '50%', my: 2, borderColor: '#555' }} />
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
                mt: 2,
              }}
            >
              <Chip
                icon={<CalendarTodayIcon />}
                label={`${tripData.days || 'N/A'} Days`}
                sx={{
                  backgroundColor: '#333',
                  color: '#fff',
                  fontWeight: 'bold',
                  px: 2,
                  py: 1,
                }}
              />
              <Chip
                icon={<AttachMoneyIcon />}
                label={`${tripData.budget?.charAt(0).toUpperCase() + tripData.budget?.slice(1) || 'N/A'} Budget`}
                sx={{
                  backgroundColor: '#333',
                  color: '#fff',
                  fontWeight: 'bold',
                  px: 2,
                  py: 1,
                }}
              />
              <Chip
                icon={<PeopleIcon />}
                label={`Travelers: ${tripData.people || 'N/A'}`}
                sx={{
                  backgroundColor: '#333',
                  color: '#fff',
                  fontWeight: 'bold',
                  px: 2,
                  py: 1,
                }}
              />
            </Box>
          </>
        ) : (
          <Typography variant="body2" sx={{ color: '#bbb' }}>
            No Trip Selected
          </Typography>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default Banner;
