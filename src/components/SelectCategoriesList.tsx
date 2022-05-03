import { Category } from 'models/categoryModel';
import React, { useEffect, useState } from 'react';

export const SelectCategoriesList = () => {

    const [ categories, setCategories ] = useState<Category[]>([]);

    useEffect(() => {
        
        fetch('/categories')
            .then( response => {
                if( response !== null && response !== undefined) return response.json();
            })
            .then( data => setCategories( data ))
            .catch( error => console.log(error));
    }, [ ]);
 return (
    <div>
        
               
    </div>
  )
}
