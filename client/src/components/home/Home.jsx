import Navbar from './NavBar';
import Banner from './Banner';
import { Box, styled } from '@mui/material';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Slide from './Slide';
import MidSlide from './MidSlide';
import MidSection from './MidSection';

const Component = styled(Box)`
    padding: 10px;
    background-color: #f2f2f2;
`;

const Home = () => {
    const { products, error } = useSelector((state) => state.getProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <Component>
                <Banner />
                <MidSlide products={products} title="Deal of the Day" timer={true} />
                <MidSection />
                <Slide products={products} title="Discount for You" timer={false} />
                <Slide products={products} title="Suggesting Items" timer={false} />
                <Slide products={products} title="Top Selection" timer={false} />
                <Slide products={products} title="Recommended Items" timer={false} />
                <Slide products={products} title="Top Deals on Accessories" timer={false} />
                {error && (
                    <Box style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
                        Error loading products: {error}
                    </Box>
                )}
            </Component>
        </>
    );
};

export default Home;