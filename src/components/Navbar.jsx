import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Loan Calculator
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }} >
          <Button color="inherit" component={Link} to="/">
            HOME
          </Button>
          <Button color="inherit" component={Link} to="/exchange-rates">
            EXCHANGE RATES (LIVE)
          </Button>
          <Button color="inherit" component={Link} to="/about">
            ABOUT
          </Button>
          <Button color="inherit" component={Link} to="/error">
            ERROR PAGE
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;