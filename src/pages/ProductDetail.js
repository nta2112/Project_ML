import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Mock product data (in a real app, this would come from an API)
const products = [
  {
    id: 1,
    name: 'Nấm Linh Chi',
    category: 'Nấm',
    price: '500.000đ',
    image: 'https://example.com/linh-chi.jpg',
    description: 'Nấm Linh Chi đỏ chất lượng cao',
    longDescription: `Nấm Linh Chi đỏ là một loại dược liệu quý hiếm, được sử dụng trong y học cổ truyền từ hàng ngàn năm nay. Sản phẩm của chúng tôi được thu hái từ những cây nấm tự nhiên, đảm bảo chất lượng và độ tinh khiết cao nhất.`,
    benefits: [
      'Tăng cường hệ miễn dịch',
      'Hỗ trợ điều hòa huyết áp',
      'Chống oxy hóa',
      'Tăng cường sức khỏe tim mạch',
    ],
    usage: 'Ngâm 5-7g nấm trong 1 lít nước sôi, để 15-20 phút và uống trong ngày.',
    storage: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.',
  },
  // Add more products here...
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          Không tìm thấy sản phẩm
        </Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
              }}
            />
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.longDescription}
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Công dụng:
            </Typography>
            <List>
              {product.benefits.map((benefit, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cách sử dụng:
            </Typography>
            <Typography variant="body1">{product.usage}</Typography>
          </Box>

          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Bảo quản:
            </Typography>
            <Typography variant="body1">{product.storage}</Typography>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              type="number"
              label="Số lượng"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              inputProps={{ min: 1 }}
              sx={{ width: '100px' }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{ flexGrow: 1 }}
            >
              Thêm vào giỏ hàng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 