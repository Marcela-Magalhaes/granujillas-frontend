
import notfound from '../assets/imgs/notFound.png';

export const NotFound = () => {
  return (
    <div className='container text-center my-5'>
        <h3>Lo sentimos mucho...</h3>
        <br />
        <img src={ notfound } alt="not found" />
        <br />
    
    </div>
  )
}
