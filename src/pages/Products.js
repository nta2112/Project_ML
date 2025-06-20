import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const products = [
  {
    id: 1,
    name: 'Nấm Linh Chi',
    category: 'Nấm',
    price: '500.000đ',
    image: 'https://example.com/linh-chi.jpg',
    description: 'Nấm Linh Chi đỏ chất lượng cao',
  },
  {
    id: 2,
    name: 'Đông Trùng Hạ Thảo',
    category: 'Đông Trùng',
    price: '1.500.000đ',
    image: 'https://example.com/dong-trung.jpg',
    description: 'Đông Trùng Hạ Thảo tự nhiên',
  },
  {
    id: 3,
    name: 'Tam Thất',
    category: 'Rễ Củ',
    price: '800.000đ',
    image: 'https://example.com/tam-that.jpg',
    description: 'Tam Thất Bắc chất lượng cao',
  },
  {
    id: 4,
    name: 'Hà Thủ Ô',
    category: 'Rễ Củ',
    price: '300.000đ',
    image: 'https://example.com/ha-thu-o.jpg',
    description: 'Hà Thủ Ô đỏ',
  },
  {
    id: 5,
    name: 'Nấm Vân Chi',
    category: 'Nấm',
    price: '400.000đ',
    image: 'https://example.com/van-chi.jpg',
    description: 'Nấm Vân Chi',
  },
  {
    id: 6,
    name: 'Đông Trùng Hạ Thảo Nhân Tạo',
    category: 'Đông Trùng',
    price: '900.000đ',
    image: 'https://example.com/dong-trung-nhan-tao.jpg',
    description: 'Đông Trùng Hạ Thảo nuôi trồng',
  },
];

const categories = ['Tất cả', 'Nấm', 'Đông Trùng', 'Rễ Củ'];

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Tất cả' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Sản Phẩm Dược Liệu
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Danh Mục</InputLabel>
          <Select
            value={selectedCategory}
            label="Danh Mục"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                },
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
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 1 }}
                >
                  Danh mục: {product.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products; 