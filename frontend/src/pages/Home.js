import React from 'react';
import { Container, Box } from '@mui/material';
import { Parallax } from 'react-parallax';
import { motion } from 'framer-motion';
import Banner from '../components/home/Banner';
import Destinations from '../components/home/ServiceDescription';
import TouristDestinations from '../components/home/TouristDestinations';
import Highlights from '../components/home/Highlights';
import ChatService from '../components/home/ChatService';
import Testimonials from '../components/home/Testimonials';
import getLPTheme from '../theme/getLPTheme';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Home = () => {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <Box>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}>
            <Banner />
          </motion.div>

          <Parallax
              blur={{ min: -15, max: 15 }}
              bgImage="./path-to-your-image.jpg"
              bgImageAlt="highlights"
              strength={200}
          >
            <Container>
              <Highlights />
            </Container>
          </Parallax>

          <Parallax
              blur={{ min: -15, max: 15 }}
              bgImage="./path-to-your-second-image.jpg"
              bgImageAlt="tourist destinations"
              strength={200}
          >
            <Container>
              <TouristDestinations />
            </Container>
          </Parallax>

          <Parallax
              blur={{ min: -15, max: 15 }}
              bgImage="./path-to-your-third-image.jpg"
              bgImageAlt="service description"
              strength={200}
          >
            <Container>
              <Destinations />
            </Container>
          </Parallax>

          <Parallax
              blur={{ min: -15, max: 15 }}
              bgImage="./path-to-your-fourth-image.jpg"
              bgImageAlt="chat service"
              strength={200}
          >
            <Container>
              <ChatService />
            </Container>
          </Parallax>

          <Parallax
              blur={{ min: -15, max: 15 }}
              bgImage="./path-to-your-fifth-image.jpg"
              bgImageAlt="testimonials"
              strength={200}
          >
            <Container>
              <Testimonials />
            </Container>
          </Parallax>
        </Box>
      </ThemeProvider>
  );
};

export default Home;
