import { AppBar, Box, ButtonBase, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

function Navbar() {
  return (
    <AppBar position="static" >
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box>
            <ButtonBase href="/">
              <Typography variant="h6" color="inherit" component="div">
                BC WebApp Tracker
              </Typography>
            </ButtonBase>
          </Box>
          <Box>
            <ButtonBase href="/" sx={{marginX: '1rem'}}>
              <Typography variant="body2" color="inherit" component="div" sx={{fontSize: '1.1rem'}}>
                Page 1
              </Typography>
            </ButtonBase>
            <ButtonBase href="/" sx={{marginX: '1rem'}}>
              <Typography variant="body2" color="inherit" component="div" sx={{fontSize: '1.1rem'}}>
                Page 2
              </Typography>
            </ButtonBase>
          </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar