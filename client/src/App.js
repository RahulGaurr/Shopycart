import Header from './components/header/Header';
import Home from './components/home/Home';
import {Box} from '@mui/material'
import DataProvider from './contex/DataProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DetailView from './components/deatils/DetailView';
import Cart from './components/cart/Cart';
import Success from './components/cart/Success';
import Failure from './components/cart/Failure';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Box style={{marginTop:54}}>
          <Routes>
            <Route path='/' element= {<Home />} />
           <Route path='/product/:id' element= {<DetailView />} />
           <Route path='/cart' element={<Cart />} />
           <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          </Routes>
        </Box>
     </BrowserRouter>
    </DataProvider>
  );
}

export default App;
