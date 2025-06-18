import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import { InputBase, Box, styled, List, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
    background-color: #fff;
    width: 38%;
    border-radius: 2px;
    margin-left: 10px;
    display: flex;
`;

const InputSearchBase = styled(InputBase)`
    padding-left: 20px;
    width: 100%;
    font-size: unset;
`;

const SearchIconWrapper = styled(Box)`
    color: blue;
    padding: 5px;
    display: flex;
`;

const ListWrapper = styled(List)`
    position: absolute;
    background: #FFFFFF;
    color: #000;
    margin-top: 40px;
`;

const Search = () => {
    const [text, setText] = useState('');
    const { products, error } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const getText = (text) => {
        setText(text);
    };

    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands and more"
                onChange={(e) => getText(e.target.value)}
                value={text}
            />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            {text && !error && (
                <ListWrapper>
                    {products
                        .filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase()))
                        .map(product => (
                            <ListItem key={product.id}>
                                <Link
                                    to={`/product/${product.id}`}
                                    onClick={() => setText('')}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {product.title.longTitle}
                                </Link>
                            </ListItem>
                        ))}
                </ListWrapper>
            )}
            {error && (
                <Box style={{ color: 'red', marginTop: 10 }}>
                    Error loading products: {error}
                </Box>
            )}
        </SearchContainer>
    );
};

export default Search;