import React, {  useState, useEffect } from 'react';
import { Product } from '../models/productModel';
import { Link } from 'react-router-dom';

import emptyCartLogo from '../assets/imgs/empty-shop-cart.png';
import './ShopCart.css';

export const ShopCart = () => {

    const [ productsToBuy, setProductsToBuy ] = useState<Product[]>([]);
    const [ toggle, setToggle ] = useState(false);

    useEffect(() => {
        fetch('https://api.granujillas.teamcamp.ovh/shopcart')
            .then( response => {
                if( response !== null && response !== undefined) return response.json()
            })
            .then( data => setProductsToBuy( data))
            .catch( error => console.log( error ));
    }, [ toggle ]);

    const handleDeleteProduct = ( id: string, e?: React.MouseEvent<HTMLButtonElement> ) => {
      if( window.confirm('Are you sure you want to delete it?')){
          fetch(`https://api.granujillas.teamcamp.ovh/shopcart/${ id }`, {
            method: 'DELETE'
        })
        setToggle(!toggle)
    
      }
        
    }
    return(
        <div className='container text-center'>
            <h1 className='text-center my-3'>Tu Carrito de Compras</h1>
            <hr />
            <section className="container ">
                <ol className="list-group list-group-flush">
                    {
                        
                        productsToBuy.map( (product, index: number) => {
                            return(
                                <li key={ product._id } className="list-group-item">
                                    
                                   <strong>{ index + 1 }. <img src={product.image} className="shopcart-img" alt='shopcart-product'/>  { product.name } - {product.price}€ </strong>
                                    
                                   <button onClick={ () => handleDeleteProduct( product._id ) } className='btn btn-danger mx-5'>Eliminar</button>
                                
                                </li>
                            )
                        })
                      
                    }
                    
                </ol>
                {
                    (productsToBuy.length > 0 )

                    ? 
                    <Link to={'/payment'}><button className='btn btn-warning col-3 mx-auto my-5 '>Tramitar Compra</button></Link> 
                
                    : 
                    <div className='text-center mx-auto'>
                        <h3 className='message'>Tu carrito está vacío</h3>
                        <img src={ emptyCartLogo }  alt= { emptyCartLogo } />
                    
                    </div>
                }
                
            </section>
            
            
        </div>
    );
};