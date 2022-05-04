
import { Link } from 'react-router-dom';
import { Category } from '../models/categoryModel';

import './PrintCategories.css';

interface Props {
    categories: Category[]
}

export const PrintCategories = ( { categories }: Props ) => {

  return ( 
        <div className='row'>
            {
                categories.map( (category) => {
                    return(
                        <div className='col-sm-12 col-md-6 col-lg-4' key={ category._id}>
                            <div className='card my-2'>
                                <Link to={`/products/${category.name}`}>
                                    <img  src={ category.image } alt={`Foto de la categoría ${category.name}`} className='card-img-top'/>
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

  )
}
