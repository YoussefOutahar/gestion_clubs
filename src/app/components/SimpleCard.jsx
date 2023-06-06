import { Card, Icon } from '@mui/material';
import { Box, styled } from '@mui/system';

const CardRoot = styled(Card)(() => ({
  height: '100%',
  padding: '20px 24px',
}));

const CardTitle = styled('div')(({ subtitle }) => ({
  fontSize: '25px',
  fontWeight: '700',
  textTransform: 'capitalize',
  marginBottom: !subtitle && '16px',
  color: '#1976d2'
}));
const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex', 
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const SimpleCard = ({ children, title, subtitle, icon }) => {
  return (
    <CardRoot elevation={6}>
      <ContentBox>
      <Icon className="icon">{icon}</Icon>
      <Box ml="12px">
      <CardTitle subtitle={subtitle}>{title}</CardTitle>
      {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
      {children}
      </Box>
      </ContentBox>
    </CardRoot>
  );
};

export default SimpleCard;
