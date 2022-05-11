
import { useEffect, useState } from 'react';
import { Category } from '../models/categoryModel';
import { PrintCategories } from './PrintCategories';

export const CategoriesList = () => {

     const [ categories, setCategories ] = useState<Category[]>([]);

    useEffect(() => {
        
        fetch(`https://api.granujillas.teamcamp.ovh/categories`)
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
                <PrintCategories categories={ categories } />
        </div>
    );
};