
import notfound from '../assets/imgs/not-found.jpg';

export const NotFound = () => {
  return (
    <div className='container text-center my-5'>
        <h3>Página no encontrada.</h3>
        <br />
        <img src={ notfound } alt="not found" />
        <br />
    
    </div>
  )
}
