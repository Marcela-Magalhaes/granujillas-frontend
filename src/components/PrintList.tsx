import { Link } from 'react-router-dom';
import { Product } from '../models/productModel';

interface Props{
    productsList: Product[]
}

export const PrintList = ({ productsList}: Props) => {

  return (
    
        <div className="row">
            {
                
                (productsList.length > 0)
                    ? productsList?.map( product => {
                    return (

                        <div className='col col-sm-12 col-md-6 col-lg-3' key={ product._id }>
                            <div className='card' >
                                <Link to={`/product/${product._id}`}><img  className="card-img-top"  src={ product.image } alt={`Imagen de ${product.name}`}/></Link>
                            </div>
                            <div className="card-title">
                                <h4>{ product.name }</h4>
                            </div>
                        </div>
                    )
                    })
                    
                    : <h4>No se han encontrado productos para tu búsqueda</h4>
            }
        </div>
  )
}
