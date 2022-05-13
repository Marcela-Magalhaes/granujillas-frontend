import React, { useState, useEffect } from 'react';
import { Product } from '../models/productModel';
import { Link, useParams } from 'react-router-dom';

const initialState: Product = {
    _id:  '',
    name:  '',
    price:  0,
    image:  '',
    description:  ''
};

export const ProductView = () => {

    const [ product, setProduct ] = useState<Product>( initialState );
    const { id } = useParams();
    

    useEffect(() => {
        fetch(`https://api.granujillas.teamcamp.ovh/products/${id}`)
            .then( response => {
                if( response !== null && response !== undefined ) return response.json()
            })
            .then( data => setProduct( data ))
            .catch( error => console.log(error));
    }, [ id ]);

    const handleAddShopCart = () => {

        fetch('https://api.granujillas.teamcamp.ovh/shopcart', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( product )
        })
    };
    
    return(
        
        <section className='container text-center mt-3 mb-5'>
            <div className="row mt-2">
                <div className="col col-lg-6 col-md-4 col-center text-center mb-2">
                    <div className="card">
                        <img className='product-img img-fluid m-2' src={`https://api.granujillas.teamcamp.ovh/statics/${product.image}` } alt={`Imagen de ${ product.name }`} />
                        <h4 className="card-title">{ product.name }</h4>
                        <p><small><Link to={`/updateProduct/${product._id}`} className="nav-link"><strong>Update Product</strong></Link></small></p>
                        <br />
                        <p className='px-2'><strong>Sobre este producto: </strong>{ product.description}</p>
                        <p><strong>Precio:</strong> { product.price }€</p>
                    
                        <button onClick={ handleAddShopCart } className='btn btn-warning mb-5 mx-auto col-md-6 text-center'>Añadir al carrito</button>
                    
                        
                    </div>
                    <Link to={'/shopCart'}>
                        <button className='btn btn-warning text-center my-3'>Ver carrito</button>
                    </Link>
                </div>
            </div>
        </section>
        
    )
};