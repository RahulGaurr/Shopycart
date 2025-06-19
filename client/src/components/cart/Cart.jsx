import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Typography, styled, Button } from '@mui/material';
import CartItem from './CartItem';
import TotalBalance from './TotalBalance';
import EmptyCart from './EmptyCart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartReset } from '../../redux/actions/cartActions';
import axios from 'axios';

const Container = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    [theme.breakpoints.down('md')]: {
        padding: '15px 0',
    },
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const ButtonWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    width: 250px;
    height: 51px;
    border-radius: 2px;
`;

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('md')]: {
        marginBottom: 15,
    },
}));

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart || { cartItems: [] });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const calculateTotalAmount = () => {
        if (!cartItems || cartItems.length === 0) return 0;
        return cartItems.reduce((total, item) => {
            const qty = item.quantity || 1;
            const cost = item.price?.cost || 0;
            const discount = (item.price?.mrp || 0) - cost;
            return total + (cost * qty) - (discount * qty);
        }, 0) + 40;
    };

    const handlePlaceOrder = async () => {
        const totalAmount = calculateTotalAmount();
        if (totalAmount <= 40) {
            setErrorMessage('Cart is empty or invalid. Please add items to your cart.');
            return;
        }

        try {
            await axios.post('https://shopycart.onrender.com/api/order', {
                cartItems,
                totalAmount,
            });
            navigate('/success', {
                state: { message: 'Order placed successfully! Your items will be delivered soon.' },
            });
            dispatch(cartReset());
        } catch (error) {
            setErrorMessage('Failed to process the order. Please try again later.');
            navigate('/failure', {
                state: { message: 'Failed to process the order. Please try again later.' },
            });
        }
    };

    return (
        <>
            {cartItems.length > 0 ? (
                <Container container>
                    <LeftComponent item lg={9} sm={9} xs={12}>
                        <Header>
                            <Typography>My Cart ({cartItems.length})</Typography>
                        </Header>
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                        <ButtonWrapper>
                            <StyledButton onClick={handlePlaceOrder}>Place Order</StyledButton>
                        </ButtonWrapper>
                    </LeftComponent>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <TotalBalance cartItems={cartItems} />
                    </Grid>
                </Container>
            ) : (
                <EmptyCart />
            )}
            {errorMessage && (
                <Box style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
                    {errorMessage}
                </Box>
            )}
        </>
    );
};

export default Cart;