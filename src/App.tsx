
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './assets/imgs/logoGranujillas.jpg';


 const App = () =>{

    const initialState = '';
    const [ inputValue, setInputValue ] = useState(initialState);


    const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setInputValue(e.target.value);
       
    };
    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        console.log('Dentro del handleSubmit')
        
    };

    return (
        <div className="App">
            <div>
                
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link className='navbar-brand img-home' to={'/'}>
                            <img className="logo" src={ logo } alt={ logo }/>
                        </Link>
                
                        <Link className="navbar-brand" to={'/'}><h1>Granujillas</h1></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                                    <li className="nav-item">
                                        <Link className="nav-link disabled" to={'/'}>About us</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link disabled">Shipping/Return policy</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/productForm'} className="nav-link"><strong>Add Product</strong></Link>
                                    </li>
                            </ul>
                            <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to={'/signup'}><strong>Sign up / Log in</strong></Link>
                                    </li>
                            </ul>
                            {/* Aquí componente SearchForm */}
                            <form className="d-flex" onSubmit={ handleSubmit }>
                                <input className="form-control me-2" placeholder="¿Qué buscas hoy?" type="search" value={ inputValue } onChange={ handleInputChange }aria-label="Search"/>

                                <Link to={`/search/${inputValue}`}><button className="btn btn-warning" type="submit"  >Search</button></Link>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            
            {/* <div className="text-dark text-center fixed-bottom">
                <p className='text-center mt-2'>Copyright&copy; MMM 2022</p>
            </div> */}

        </div>
    );
};

export default App;