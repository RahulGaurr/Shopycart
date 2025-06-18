import { styled } from "@mui/material";
import { imageURL } from '../../constants/data';

const MidSection = () => {
    const url = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';

    

    const Wrapper = styled('div')(({ theme }) => ({
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px', // Equivalent to spacing={2} in Grid
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    }));

    const ImageContainer = styled('div')(({ theme }) => ({
        flex: '1 1 calc(33.33% - 16px)', // 33.33% width for 3 items, accounting for gap
        [theme.breakpoints.down('sm')]: {
            flex: '1 1 100%', // Stack vertically on small screens
        },
    }));

    const BannerImage = styled('img')(({ theme }) => ({
        marginTop: 10,
        width: '100%',
        [theme.breakpoints.down('md')]: {
            objectFit: 'cover',
            height: 120,
        },
    }));

    return (
        <>
            <Wrapper>
                {imageURL.map((image, index) => (
                    <ImageContainer key={`image-${index}`}>
                        <img src={image} alt={`image-${index}`} style={{ width: '100%' }} />
                    </ImageContainer>
                ))}
            </Wrapper>
            <BannerImage src={url} alt="banner" />
        </>
    );
};

export default MidSection;