import { useState, useEffect } from 'react';
import { Box, Button, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px',
    },
}));

const Image = styled('img')({
    padding: '15px',
    width: '95%',
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '48%',
    height: 50,
    borderRadius: 2,
    [theme.breakpoints.down('lg')]: {
        width: '46%',
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%',
    },
}));

const ActionItem = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => state.cart || { error: null });
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddToCart = () => {
        if (!product || !product.id || !product.price) {
            setErrorMessage('Product data is invalid.');
            return;
        }
        dispatch(addToCart(product.id, product));
        setErrorMessage('');
    };

    const handleBuyNow = () => {
        try {
            if (!product || !product.id) {
                throw new Error('Product data is invalid.');
            }
            navigate('/success', {
                state: { message: 'Order placed successfully! Your item will be delivered soon.' },
            });
        } catch (error) {
            setErrorMessage(error.message || 'Failed to process the order. Please try again later.');
            navigate('/failure', {
                state: { message: error.message || 'Failed to process the order. Please try again later.' },
            });
        }
    };

    useEffect(() => {
        if (error) {
            setErrorMessage(error);
        }
    }, [error]);

    return (
        <LeftContainer>
            <Box style={{ padding: '15px 20px', border: '1px solid #f0f0f0', width: '90%' }}>
                <Image src={product?.detailUrl} alt="product" />
            </Box>
            <StyledButton
                variant="contained"
                style={{ marginRight: 10, background: '#ff9f00' }}
                startIcon={<Cart />}
                onClick={handleAddToCart}
                disabled={!product || !product.id}
            >
                Add to Cart
            </StyledButton>
            <StyledButton
                variant="contained"
                style={{ background: '#fb641b' }}
                startIcon={<Flash />}
                onClick={handleBuyNow}
            >
                Buy Now
            </StyledButton>
            {errorMessage && (
                <Box style={{ color: 'red', marginTop: 10 }}>
                    {errorMessage}
                </Box>
            )}
        </LeftContainer>
    );
};

export default ActionItem;