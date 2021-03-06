import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './App';
import { CategoriesList } from 'components/CategoriesList';
import { ProductsList } from 'components/ProductsList';
import { ProductView } from 'components/ProductView';
import { ShopCart } from 'components/ShopCart';
import { PasarelaPago } from 'components/PasarelaPago';
import { ProductForm } from 'components/ProductForm';
import { SignUp } from 'components/SignUp';
import { Login } from 'components/Login';
import { NotFound } from 'components/NotFound';
import { CategoryForm } from 'components/CategoryForm';




ReactDOM.render(
    <React.StrictMode>
       <BrowserRouter>
            <Routes>
                <Route path='/home' element={[ <App key={"1"}/>, < CategoriesList key={"2"}/>] }/>
                <Route path='/' element={<Navigate replace to='/home' />}  />
                <Route path='/products/:category' element={ [<App />,  <ProductsList />]}/> 
                <Route path='/search/:searchedProduct' element={ [<App />,  <ProductsList />] }/>
                <Route path='/product/:id' element={[ <App />, <ProductView />]} />
                <Route path='/shopcart'  element={ [ <App />, <ShopCart />]}/>
                <Route path='/payment'  element={ [ <App />, <PasarelaPago />]}/>
                <Route path='/productForm' element={[ <App />, <ProductForm /> ]} />
                <Route path='/updateProduct/:id' element={[ <App />, <ProductForm /> ]} />
                <Route path='/categoryForm' element={[ <App />, <CategoryForm />]}/>
                <Route path='/signup' element={[ <App />, <SignUp /> ]} />
                <Route path='/login' element={[ <App />, <Login /> ]} />
                <Route path='*' element={ [<App />, <NotFound />]} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);