import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Button, Box, Link, Container, Typography, Stack } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '70vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const HeroImgStyle1 = styled(motion.img)(({ theme }) => ({
  top: 10,
  bottom: 0,
  zIndex: 8,
  width: 'auto',
  margin: 'auto',
  position: 'absolute',
  right: '30%',
  height: '46vh',
  transform: 'rotate(0deg) !important'
}));
const HeroImgStyle2 = styled(motion.img)(({ theme }) => ({
  top: 40,
  bottom: 0,
  zIndex: 8,
  width: 'auto',
  margin: 'auto',
  position: 'absolute',
  right: '25%',
  height: '46vh',
  transform: 'rotate(30deg) !important'
}));
const HeroImgStyle3 = styled(motion.img)(({ theme }) => ({
  top: 80,
  bottom: 0,
  zIndex: 8,
  width: 'auto',
  margin: 'auto',
  position: 'absolute',
  right: '20%',
  height: '46vh',
  transform: 'rotate(60deg) !important'
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeIn} />

        <HeroImgStyle1 alt="hero" src="/sample_nfts/1.jpg" variants={varFadeInUp} />
        <HeroImgStyle2 alt="hero" src="/sample_nfts/4.jpg" variants={varFadeInUp} />
        <HeroImgStyle3 alt="hero" src="/sample_nfts/7.jpg" variants={varFadeInUp} />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                MetaMVP
              </Typography>
              <Typography variant="h2" sx={{ color: 'common.white' }}>
                Professional Athelets Collectibles!
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: 'common.white' }}>
                MetaMVP brings together the most iconic brands and legendary names in sports, entertainment and culture
                to create unique digital collections and experiences.
              </Typography>
            </motion.div>

            <Stack direction="row" spacing={3}>
              <motion.div variants={varFadeInRight}>
                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to="/"
                  startIcon={<Icon icon={flashFill} width={20} height={20} />}
                  sx={{ width: 160 }}
                >
                  Join Now
                </Button>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Button
                  size="large"
                  variant="outlined"
                  component={RouterLink}
                  to="/"
                  sx={{ width: 160 }}
                  // startIcon={<Icon icon={flashFill} width={20} height={20} />}
                >
                  Log In
                </Button>
              </motion.div>
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
