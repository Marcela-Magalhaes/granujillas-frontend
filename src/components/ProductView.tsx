import React, { useState, useEffect } from 'react';
import { Product } from 'types/types';
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
        fetch(`/products/${ id}`)
            .then( response => {
                if( response !== null && response !== undefined ) return response.json()
            })
            .then( data => setProduct( data ))
            .catch( error => console.log(error));
    }, [ id ]);

    const handleAddShopCart = () => {
        console.log('¡Producto añadido al carrito!');

        fetch('/shopcart', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( product )
        })
    };
    
    return(
        <div>
            <h1 className='text-center mt-4 mb-2'>{ product.name }</h1>
            <br />
            <section className='container text-center mt-3 mb-5'>
                <div className="row mt-4">
                    <div className="col col-lg-9 col-md-6 col-center text-center mb-2">
                        <div className="card">
                            <img className='my-5' src={ product.image } alt={`Imagen de ${ product.name }`} />
                            <h4 className="card-title">{ product.name }</h4>
                            <br />
                            <p><strong>Sobre este producto: </strong>{ product.description}</p>
                            <p><strong>Precio:</strong> { product.price }€</p>
                        
                            <button onClick={ handleAddShopCart} className='btn btn-warning mb-5 mx-auto col-md-6 text-center'>Añadir al carrito</button>
                        
                           
                        </div>
                        <Link to={'/shopCart'}>
                            <button className='btn btn-warning text-center my-3'>Ver carrito</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
};