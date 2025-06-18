import { Box, Typography, styled } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
    & > h6 {
        margin-bottom: 20px;
    }
`;

const Price = styled(Box)`
    float: right;
`;

const Discount = styled(Typography)`
    color: green;
    font-weight: 500;
`;

const TotalBalance = ({ cartItems }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const calculateTotalAmount = useCallback(() => {
        if (!cartItems || cartItems.length === 0) {
            setPrice(0);
            setDiscount(0);
            return;
        }

        let totalCost = 0;
        let totalDiscount = 0;

        cartItems.forEach(item => {
            const qty = item.quantity || 1;
            const cost = item.price?.cost || 0;
            const mrp = item.price?.mrp || 0;
            totalCost += cost * qty;
            totalDiscount += (mrp - cost) * qty;
        });

        setPrice(totalCost);
        setDiscount(totalDiscount);
    }, [cartItems]);

    useEffect(() => {
        calculateTotalAmount();
    }, [calculateTotalAmount]);

    const deliveryCharge = 40;
    const totalAmount = price - discount + deliveryCharge;
    const savings = discount;

    return (
        <Box>
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>
                    Price ({cartItems?.length || 0} item{cartItems?.length !== 1 ? 's' : ''})
                    <Price component="span">₹{price.toFixed(2)}</Price>
                </Typography>
                <Typography>
                    Discount ({cartItems?.length || 0} item{cartItems?.length !== 1 ? 's' : ''})
                    <Price component="span">-₹{discount.toFixed(2)}</Price>
                </Typography>
                <Typography>
                    Delivery Charges ({cartItems?.length || 0} item{cartItems?.length !== 1 ? 's' : ''})
                    <Price component="span">₹{deliveryCharge}</Price>
                </Typography>
                <Typography variant="h6">
                    Total Amount ({cartItems?.length || 0} item{cartItems?.length !== 1 ? 's' : ''})
                    <Price component="span">₹{totalAmount.toFixed(2)}</Price>
                </Typography>
                <Discount>You will save ₹{savings.toFixed(2)} on this order</Discount>
            </Container>
        </Box>
    );
};

export default TotalBalance;