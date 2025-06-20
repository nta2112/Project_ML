import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const featuredProducts = [
  {
    id: 1,
    name: 'Nấm Linh Chi',
    image: 'https://example.com/linh-chi.jpg',
    price: '500.000đ',
    description: 'Nấm Linh Chi đỏ chất lượng cao',
  },
  {
    id: 2,
    name: 'Đông Trùng Hạ Thảo',
    image: 'https://example.com/dong-trung.jpg',
    price: '1.500.000đ',
    description: 'Đông Trùng Hạ Thảo tự nhiên',
  },
  {
    id: 3,
    name: 'Tam Thất',
    image: 'https://example.com/tam-that.jpg',
    price: '800.000đ',
    description: 'Tam Thất Bắc chất lượng cao',
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Dược Liệu Việt Nam
          </Typography>
          <Typography variant="h5" paragraph>
            Cung cấp các loại dược liệu chất lượng cao, an toàn và hiệu quả
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Xem Sản Phẩm
          </Button>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Sản Phẩm Nổi Bật
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Về Chúng Tôi
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Chúng tôi tự hào là đơn vị cung cấp các loại dược liệu chất lượng cao,
            được thu hái và chế biến theo quy trình nghiêm ngặt, đảm bảo an toàn
            và hiệu quả cho người sử dụng.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/about')}
            >
              Tìm Hiểu Thêm
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 