import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  IconButton,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Mock cart data (in a real app, this would come from a state management system)
const initialCartItems = [
  {
    id: 1,
    name: 'Nấm Linh Chi',
    price: 500000,
    quantity: 2,
    image: 'https://example.com/linh-chi.jpg',
  },
  {
    id: 2,
    name: 'Đông Trùng Hạ Thảo',
    price: 1500000,
    quantity: 1,
    image: 'https://example.com/dong-trung.jpg',
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    // In a real app, this would process the order
    alert('Đặt hàng thành công!');
    setOpenCheckout(false);
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Giỏ hàng trống
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Tiếp tục mua sắm
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Giỏ hàng
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            {cartItems.map((item) => (
              <Box key={item.id}>
                <Grid container spacing={2} alignItems="center" sx={{ py: 2 }}>
                  <Grid item xs={12} sm={3}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        maxHeight: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.price.toLocaleString('vi-VN')}đ
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton
                        color="error"
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tổng đơn hàng
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>Tạm tính:</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {calculateTotal().toLocaleString('vi-VN')}đ
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">Tổng cộng:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" color="primary">
                    {calculateTotal().toLocaleString('vi-VN')}đ
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => setOpenCheckout(true)}
            >
              Thanh toán
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Checkout Dialog */}
      <Dialog open={openCheckout} onClose={() => setOpenCheckout(false)}>
        <DialogTitle>Thông tin thanh toán</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Họ và tên"
              value={customerInfo.name}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={customerInfo.email}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, email: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              value={customerInfo.phone}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, phone: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Địa chỉ"
              multiline
              rows={3}
              value={customerInfo.address}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, address: e.target.value })
              }
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckout(false)}>Hủy</Button>
          <Button onClick={handleCheckout} variant="contained" color="primary">
            Xác nhận đặt hàng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart; 