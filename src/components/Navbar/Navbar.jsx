import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Management
          </Typography>
          <Button color="inherit" component={Link} to="/">
            User List
          </Button>
          <Button color="inherit" component={Link} to="/add">
            Add User
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
