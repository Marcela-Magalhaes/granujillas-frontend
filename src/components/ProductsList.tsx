
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from '../models/productModel';

const initialState ={
    _id: '',
    name: '',
    price: 0,
    image: '',
    description: ''
};

export const ProductsList = () => {

    const [ productsList, setProductsList ] = useState<Product[]>([ initialState ]);
    console.log('~ productsList_1', productsList);

    const { category } = useParams();
    console.log('~ category', category); // Por qué imprime 3 veces??

    useEffect(() => {
        if(category !== null && category !== undefined){

            fetch(`/products/category/${ category }`)
                .then( response => {
                    if( response !== null && response !== undefined ) return response.json()
                })
                .then( data => {
                    console.log('data', data);
                    return setProductsList( data )
                })
                .catch( error => console.log( error ))
        }
    }, [category]);
    

    console.log('~ productsList_2', productsList);
    return(
        <div>
            <h1 className='text-center my-4'>Lista de Productos</h1>
            <hr />
            <section className='container text-center my-2'>
                <div className="row">{
                    
                    (productsList.length > 0)
                     ? productsList?.map( product => {
                        return (

                            <div className='col col-sm-12 col-md-6 col-lg-3'>
                                <div className='card'>
                                    <Link to={`/product/${product._id}`}><img  className="card-img-top"  src={ product.image } alt={`Imagen de ${product.name}`}/></Link>
                                </div>
                                <div className="card-title">
                                    <h4>{ product.name }</h4>
                                </div>
                            </div>
                        )
                    })
                    : <h4>No hay productos en esta categoría</h4>
                }
                </div>
            </section>
        </div>
    );
}