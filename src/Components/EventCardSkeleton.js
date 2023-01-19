import * as React from 'react';
import { CardActionArea, Card, CardContent, Skeleton, Typography, Box } from '@mui/material';

function EventCardSkeleton() {
  return (
    <Card sx={{
      height: 250,
      width: 300,
      margin: '20px',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Skeleton animation="wave" variant="rectangular" height={150} width="100%" />
      <Skeleton animation="wave" sx={{ mt: 1 }} height={50} width="75%" margin />
      <Skeleton animation="wave" width="40%" />
      <Box  sx={{mb: 1}} width="100%">
        <Skeleton animation="wave" width="90%" />
        <Skeleton animation="wave" width="80%" />
      </Box>
    </Card>
  )
}

export default EventCardSkeleton;