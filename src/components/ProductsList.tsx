
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../models/productModel';
import { PrintList } from './PrintList';

const initialState ={
    _id: '',
    name: '',
    price: 0,
    image: '',
    description: ''
};

export const ProductsList = () => {

    const [ productsList, setProductsList ] = useState<Product[]>([ initialState ]);

    const { searchedProduct, category } = useParams();
    
    useEffect(() => {
        
        if(category !== null && category !== undefined){
    
            fetch(`/products/category/${ category }`)
                .then( response => {
                    if( response !== null && response !== undefined ) return response.json()
                })
                .then( data => {
                    //  console.log('data category', data);
                    return setProductsList( data )
                })
                .catch( error => console.log( error ))
        }
       

        if( searchedProduct !== undefined && searchedProduct !== null ){
            
            fetch(`/products/search/${ searchedProduct }`)
                .then( response => {
                    if( response !== null && response !== undefined ) return response.json()
                })
                .then( data => {
                    //   console.log('data searchedProduct', data);
                    return setProductsList( data )
                })
                .catch( error => console.log( error ));
        } 
        
    }, [ category, searchedProduct ]);
    

    return(
        <div>
            <h1 className='text-center my-4'>Lista de Productos</h1>
            <hr />
            <section className='container text-center my-2'>

                <PrintList productsList={ productsList }/>

            </section>
        </div>
    );
}