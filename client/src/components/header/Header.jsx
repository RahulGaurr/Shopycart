import {AppBar, Toolbar,  Box, Typography, IconButton, Drawer, List, ListItem, styled,} from '@mui/material'
import {Menu} from '@mui/icons-material'
import Search from './search';
import CustomButtons from './CustomButtons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { typography } from '@mui/system';

const StyledHeader = styled(AppBar) `
 background: #2874f0;
 height: 55px;
`;

const Component = styled(Link) `
margin-left:12%;
line-height: 0%;
text-decoration: none;
color: inherit;
`;

const LogoText = styled(Typography)`
    font-size: 15px;
    font-style: italic;
    font-weight:bold;
`;

const SubHeading= styled(Typography)`
    font-size: 10px;
    font-style: italic;
`;

const PlusImage= styled('img') ({     //to use html tags in mui styled we write like this.
    width: 10,
    height: 10,
    marginLeft: 4
});

const CustomButtonWrapper = styled(Box) (({theme}) => ({
    margin: '0 5% 0 auto',
    [theme.breakpoints.down('md')] : {
        display:  'none'
    }
}));

const MenuButton = styled(IconButton) (({theme}) => ({
    display: 'none',
    [theme.breakpoints.down('md')] : {
        display: 'block'
    }
}))
   

   



const Header= () => {
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const [open, setOpen] = useState(false);

const handleOpen = () => {
    setOpen(true)
}

const handleClose = () => {
    setOpen(false)
}

const list = () => (
    <Box style={{width: 200}} onClick= {handleClose}  >
        
        <List>
            <ListItem button>
                <CustomButtons />
            </ListItem>
        </List>
    </Box>

)
    return (
       <StyledHeader>
       <Toolbar style={{minHeight: 55}}>

        < MenuButton color='inherit' onClick={handleOpen}>
            <Menu />
        </ MenuButton>

        <Drawer open={open} onClose={handleClose}>{list()} </Drawer>

            <Component to='/'>
                <LogoText>Shopycart</LogoText>
                <Box style={{display: 'flex'}}>
                    <SubHeading>Explore&nbsp;
                        <Box component="span" style={{color:`#FFE500`}}>Plus</Box>
                         </SubHeading>
                         <PlusImage src={subURL} alt="sublogo" />
                </Box>
            </Component>
           <Search />
           <CustomButtonWrapper>
            <CustomButtons />
           </CustomButtonWrapper>
       </Toolbar>
       </StyledHeader>
    )
}

export default Header

// (({theme}) => ({
    
 // }))
// [theme.breakpoints.down('md')] : {
        
// }