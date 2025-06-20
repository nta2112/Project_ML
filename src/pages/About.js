import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <LocalPharmacyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Về Chúng Tôi
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Chúng tôi tự hào là đơn vị cung cấp các loại dược liệu chất lượng cao,
          được thu hái và chế biến theo quy trình nghiêm ngặt, đảm bảo an toàn
          và hiệu quả cho người sử dụng.
        </Typography>
      </Box>

      {/* Mission and Vision */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Sứ Mệnh
            </Typography>
            <Typography paragraph>
              Chúng tôi cam kết cung cấp các sản phẩm dược liệu chất lượng cao,
              an toàn và hiệu quả, góp phần nâng cao sức khỏe cộng đồng thông qua
              việc kết hợp tinh hoa y học cổ truyền với công nghệ hiện đại.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Tầm Nhìn
            </Typography>
            <Typography paragraph>
              Trở thành đơn vị hàng đầu trong lĩnh vực cung cấp dược liệu chất lượng
              cao, được tin tưởng và lựa chọn bởi người tiêu dùng trong nước và quốc tế.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Core Values */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Giá Trị Cốt Lõi
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <VerifiedUserIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Chất Lượng
              </Typography>
              <Typography>
                Cam kết cung cấp sản phẩm chất lượng cao, đạt chuẩn quốc tế
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Uy Tín
              </Typography>
              <Typography>
                Xây dựng niềm tin với khách hàng thông qua sự minh bạch và trách nhiệm
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <EmojiEventsIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Đổi Mới
              </Typography>
              <Typography>
                Không ngừng cải tiến và phát triển để mang đến giá trị tốt nhất
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Why Choose Us */}
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Tại Sao Chọn Chúng Tôi?
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Nguồn gốc rõ ràng"
              secondary="Sản phẩm được thu hái từ các vùng nguyên liệu đạt chuẩn GACP-WHO"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Quy trình kiểm soát nghiêm ngặt"
              secondary="Đảm bảo chất lượng từ khâu thu hái đến khi đến tay người tiêu dùng"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Đội ngũ chuyên gia"
              secondary="Được tư vấn bởi các chuyên gia có kinh nghiệm trong lĩnh vực dược liệu"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Chính sách bảo hành"
              secondary="Cam kết hoàn tiền nếu sản phẩm không đạt chất lượng"
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default About; 