// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Stack, Box, Grid, Card, CardMedia, Container, Typography, useMediaQuery } from '@material-ui/core';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    image: '1.jpg',
    title: 'Like'
  },
  {
    image: '1.jpg',
    title: 'NFL'
  },
  {
    image: '1.jpg',
    title: 'MLB'
  },
  {
    image: '1.jpg',
    title: 'NHL'
  },
  {
    image: '1.jpg',
    title: 'NBA'
  },
  {
    image: '1.jpg',
    title: 'College'
  },
  {
    image: '1.jpg',
    title: 'Celebrities'
  },
  {
    image: '1.jpg',
    title: 'Artist'
  },
  {
    image: '1.jpg',
    title: 'Music'
  }
];

const FEATURED = [
  {
    image: '1.jpg',
    title: 'Like'
  },
  {
    image: '1.jpg',
    title: 'NFL'
  },
  {
    image: '1.jpg',
    title: 'MLB'
  },
  {
    image: '1.jpg',
    title: 'NHL'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 380,
    minHeight: 340,
    margin: 'auto',
    textAlign: 'center',
    boxShadow: `-3px 3px 6px 0px ${shadowCard(0.48)}`
    // [theme.breakpoints.up('md')]: {
    //   boxShadow: 'none',
    //   backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    // },
  };
});

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 15 } }}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ textAlign: 'center' }}>
              Browse by category
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={isDesktop ? 8 : 5}>
          {CARDS.map((card, index) => (
            <Grid key={card.title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle variant="outlined">
                  <CardMedia component="img" height="240" image={`/sample_nfts/${index + 1}.jpg`} alt="green iguana" />
                  <Typography variant="h5" paragraph sx={{ mt: 4 }}>
                    {card.title}
                  </Typography>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: 3, md: 3 }, mt: 10 }}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h4">FEATURED EDITIONS</Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h5">Browse Marketplace</Typography>
          </MotionInView>
        </Stack>

        <Grid container spacing={isDesktop ? 3 : 3}>
          {FEATURED.map((card, index) => (
            <Grid key={card.title} item xs={12} md={3}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle variant="outlined">
                  <CardMedia
                    component="img"
                    height="340"
                    image={`/static/mock-images/covers/cover_${index + 1}.jpg`}
                    alt="green iguana"
                  />
                  {/* <Typography variant="h5" paragraph sx={{ mt: 4 }}>
                    {card.title}
                  </Typography> */}
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
