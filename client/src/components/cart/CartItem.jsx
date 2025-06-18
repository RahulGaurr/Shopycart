import { Box, Typography, Button, styled, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../redux/actions/cartActions';

const Component = styled(Box)(({ theme }) => ({
    borderTop: '1px solid #f0f0f0',
    display: 'flex',
    padding: '10px 0',
}));

const LeftComponent = styled(Box)({
    margin: '0 10px',
    display: 'flex',
    flexDirection: 'column',
});

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
    color: #000;
    font-weight: 600;
`;

const QuantityBox = styled(Box)`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(item.id));
    };

    const handleIncrement = () => {
        dispatch(incrementQuantity(item.id));
    };

    const handleDecrement = () => {
        dispatch(decrementQuantity(item.id));
    };

    return (
        <Component>
            <LeftComponent>
                <img src={item.url} alt={item.title.shortTitle} style={{ height: 110, width: 110 }} />
                <QuantityBox>
                    <IconButton size="small" onClick={handleDecrement} disabled={item.quantity <= 1}>
                        <RemoveIcon />
                    </IconButton>
                    <Typography style={{ margin: '0 10px' }}>{item.quantity}</Typography>
                    <IconButton size="small" onClick={handleIncrement}>
                        <AddIcon />
                    </IconButton>
                </QuantityBox>
                <Remove onClick={handleRemoveFromCart}>
                    <DeleteIcon /> Remove
                </Remove>
            </LeftComponent>
            <Box style={{ margin: '20px 0' }}>
                <Typography>{item.title.shortTitle}</Typography>
                <SmallText>Seller: RetailNet</SmallText>
                <Typography style={{ marginTop: 10 }}>
                    ₹{item.price.cost}
                    <Box component="span" style={{ color: 'green', fontSize: 14 }}>
                        {`  ${item.price.discount} off`}
                    </Box>
                </Typography>
                <SmallText>Delivery by Wed Jun 25 | ₹40</SmallText>
            </Box>
        </Component>
    );
};

export default CartItem;