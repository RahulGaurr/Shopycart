import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const Failure = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const message = location.state?.message || 'Order failed. Please try again.';

    return (
        <Box style={{ padding: '50px', textAlign: 'center' }}>
            <Typography variant="h4" style={{ color: 'red', marginBottom: '20px' }}>
                Failed!
            </Typography>
            <Typography variant="h6">{message}</Typography>
            <Button
                variant="contained"
                style={{ marginTop: '20px', background: '#2874f0', color: '#fff' }}
                onClick={() => navigate('/cart')}
            >
                Back to Cart
            </Button>
        </Box>
    );
};

export default Failure;