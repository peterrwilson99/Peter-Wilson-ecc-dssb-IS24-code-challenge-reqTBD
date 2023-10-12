import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'

function FourOhFour() {
  return (
    <Container maxWidth="sm" sx={
        {height: '50vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        marginBottom: '3rem',
        textAlign: 'center'
        }}
    >
        <Typography variant="h2" gutterBottom>
            Uh oh 😔
        </Typography>
        <Typography variant="h5" gutterBottom>
            404 - Page not found
        </Typography>
        <Typography variant="body1" gutterBottom>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Box>
            <Button href="/" variant="outlined" color="primary" sx={{marginTop: '2rem'}}>
                Go to Home
            </Button>
        </Box>
    </Container>
  )
}

export default FourOhFour