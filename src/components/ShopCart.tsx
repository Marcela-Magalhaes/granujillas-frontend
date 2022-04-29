import React, {  useState } from 'react';
import { useEffect } from 'react';
import { Product } from '../models/productModel';
import './ShopCart.css';
import emptyCartLogo from '../assets/imgs/empty-shop-cart.png';

export const ShopCart = () => {

    const [ productsToBuy, setProductsToBuy ] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/shopcart')
            .then( response => {
                if( response !== null && response !== undefined) return response.json()
            })
            .then( data => setProductsToBuy( data))
            .catch( error => console.log( error ))
    }, []);

    const handleDeleteProduct = ( e: React.MouseEventHandler<HTMLButtonElement | undefined> , id: string ) => {
    //    e.preventDefault();
        fetch(`/shopcart/${ id }`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
    return(
        <div>
            <h1 className='text-center my-3'>Tu Carrito de Compras</h1>
            <hr />
            <section className="container ">
                <ol className="list-group list-group-flush">
                    {
                        productsToBuy.map( (product, index: number) => {
                            return(
                                <li key={ product._id } className="list-group-item">
                                    
                                   { index +1 }. { product.image } - { product.name } - {product.price}€ 
                                    
                                   {/* <button onClick={handleDeleteProduct( product._id)} className='btn btn-danger mx-5'>Eliminar</button> */}
                                
                                   <button className='btn btn-danger mx-5'>Eliminar</button> 
                                </li>
                            )
                        })
                    }
                    
                </ol>
                {
                    productsToBuy.length > 0 ? <button className='btn btn-warning col-3 mx-auto my-5 '>Tramitar Compra</button> : <div className='text-center mx-auto'>
                        <h3 className='message'>Tu carrito está vacío</h3>
                        <img src={ emptyCartLogo }  alt= { emptyCartLogo } />
                    
                    </div>
                }
                
            </section>
            
        </div>
    );
};