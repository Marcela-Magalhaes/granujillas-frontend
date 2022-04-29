
import { useEffect, useState } from 'react';

import './CategoriesList.css';
import { Link } from 'react-router-dom';
import { Category } from '../models/categoryModel';
// const categoryService = handleCategoryService();


export const CategoriesList = () => {

     const [ categories, setCategories ] = useState<Category[]>([]);

    useEffect(() => {
        
        fetch('/categories')
            .then( response => {
                if( response !== null && response !== undefined) return response.json();
            })
            .then( data => setCategories( data ))
            .catch( error => console.log(error));
    }, [ ]);
    

    return(
        <div className='container text-center my-2'>
            <h1>Busca por Categoría</h1>
            <br/>
            <div className='row'>
                {
                    categories.map( category => {
                        return(
                            <div className='col col-sm-12 col-md-6 col-lg-3'>
                                <div className='card'>
                                    <Link to={`/products/${category.name}`}>
                                        <img src={ category.image } alt={`Foto de la categoría ${category.name}`} className='card-img-top'/>
                                    </Link>
                                    
                                    <div className='card-body'>
                                        <h4 className='card-title text-center'>{ category.name }</h4>
                                    </div>
                                </div>                   
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};