import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <LocalPharmacyIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          Dược Liệu Việt Nam
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Trang Chủ
          </Button>
          <Button color="inherit" component={RouterLink} to="/products">
            Sản Phẩm
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            Giới Thiệu
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact">
            Liên Hệ
          </Button>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            size="large"
          >
            <Badge badgeContent={0} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 