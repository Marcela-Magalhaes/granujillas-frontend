import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './assets/imgs/logoGranujillas.jpg';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { CategoriesList } from 'components/CategoriesList';
// import { ProductsList } from 'components/ProductsList';
// import { ProductView } from 'components/ProductView';
// import { ShopCart } from 'components/ShopCart';

 const App = () =>{

    return (
        <div className="App">
            <div>
                
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link className='navbar-brand img-home' to={'/'}>
                            <img className="logo" src={ logo } alt={ logo }/>
                        </Link>
                
                        <Link className="navbar-brand" to={'/'}><h1>Granujillas</h1></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                                    <li className="nav-item">
                                        <Link className="nav-link disabled" to={''}>About us</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={''} className="nav-link disabled">Shipping/Return</Link>
                                    </li>
                            </ul>
                            <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to={''}><strong>Sign up / Log in</strong></Link>
                                    </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-warning" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            
                {/* <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={ < CategoriesList/> }/>
                        <Route  path='/products/:category' element={ <ProductsList />}/>
                        <Route path='/product/:id' element={ <ProductView />} />
                        <Route  path='/shopcart'  element={ <ShopCart />}/>
                    </Routes>
                </BrowserRouter> */}
            
            <div className="text-dark text-center fixed-bottom">
                <p className='text-center mt-2'>Copyright&copy; MMM 2022</p>
            </div>

        </div>
    );
};

export default App;