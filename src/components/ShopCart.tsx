import React, {  useState } from 'react';
import { useEffect } from 'react';
import { Product } from '../models/productModel';
import './ShopCart.css';
import emptyCartLogo from '../assets/imgs/empty-shop-cart.png';
import { Link } from 'react-router-dom';


export const ShopCart = () => {

    const [ productsToBuy, setProductsToBuy ] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/shopcart')
            .then( response => {
                if( response !== null && response !== undefined) return response.json()
            })
            .then( data => setProductsToBuy( data))
            .catch( error => console.log( error ))
    }, [ ]);

    const handleDeleteProduct = ( id: string, e?: React.MouseEvent<HTMLButtonElement> ) => {
    console.log('Producto eliminado');
        fetch(`/shopcart/${ id }`, {
            method: 'DELETE'
        })

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
                                    
                                   { index + 1 }. { product.image } - { product.name } - {product.price}€ 
                                    
                                   <button onClick={ () => handleDeleteProduct( product._id ) } className='btn btn-danger mx-5'>Eliminar</button>
                                
                                   {/* <button className='btn btn-danger mx-5'>Eliminar</button>  */}
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