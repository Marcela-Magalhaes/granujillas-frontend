import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import { CategoriesList } from 'components/CategoriesList';
import { ProductsList } from 'components/ProductsList';
import { ProductView } from 'components/ProductView';
import { ShopCart } from 'components/ShopCart';


ReactDOM.render(
    <React.StrictMode>
       <BrowserRouter>
            <Routes>
                <Route path='/' element={[ <App />, < CategoriesList/>] }/>
                <Route  path='/products/:category' element={ [<App />,  <ProductsList />]}/>
                <Route path='/product/:id' element={[ <App />, <ProductView />]} />
                <Route  path='/shopcart'  element={ [ <App />, <ShopCart />]}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);