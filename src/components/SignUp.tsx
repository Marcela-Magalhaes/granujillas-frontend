
import { Link } from 'react-router-dom';
import imgWorking from '../assets/imgs/Work_In_Progress.png';
import './SignUp.css';

export const SignUp = () => {
  return (
    <div className='container text-center my-2'>
        <h1>Regístrate</h1>
        <hr />
        <img className="signup-image" src={ imgWorking } alt="imagen persona trabajando" />
        <br />
        <p>¿Ya estás registrado? <Link to={'/login'}><span>Inicia Sesión</span></Link></p>
    </div>

  )
}
