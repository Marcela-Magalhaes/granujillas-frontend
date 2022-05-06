import { Link } from 'react-router-dom';
import { Product } from '../models/productModel';
import './PrintList.css';
interface Props{
    productsList: Product[]
}

export const PrintList = ({ productsList }: Props) => {

  return (
    
        <div className="row">
            {
                
                (productsList.length > 0)
                    ? productsList?.map( product => {
                    return (

                        <div className='col-sm-12 col-md-6 col-lg-3' key={ product._id }>
                            <div className='printlist-card card my-2' >
                                <Link to={`/product/${product._id}`}>
                                    <img className="productlist-image card-img-top img-fluid p-1" src={ `http://localhost:3000/${product.image}`} alt={`Imagen de ${product.name}`}/>
                                </Link>
                                <div className="card-body printlist-card-body" >
                                    <h4 className="card-title">
                                        { product.name }
                                    </h4>
                                    <p>{ product.price} €</p>
                                </div>
                            </div>    
                        </div>
                    )
                    })
                    
                    : <h4>No se han encontrado productos para tu búsqueda</h4>
            }
        </div>
  )
}
