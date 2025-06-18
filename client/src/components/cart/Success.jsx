import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const message = location.state?.message || 'Order placed successfully!';

    return (
        <Box style={{ padding: '50px', textAlign: 'center' }}>
            <Typography variant="h4" style={{ color: 'green', marginBottom: '20px' }}>
                Success!
            </Typography>
            <Typography variant="h6">{message}</Typography>
            <Button
                variant="contained"
                style={{ marginTop: '20px', background: '#2874f0', color: '#fff' }}
                onClick={() => navigate('/')}
            >
                Continue Shopping
            </Button>
        </Box>
    );
};

export default Success;