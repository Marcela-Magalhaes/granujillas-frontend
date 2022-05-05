import pasarelasPago from '../assets/imgs/pasarelas-de-pago.jpg'

export const PasarelaPago = () => {
  return (
    <div className='container text-center my-4'>
        <h1>Por favor, espere. </h1>
        <hr />
        <br />
        <h5>Le estamos redireccionando a una pasarela de pago...</h5>
        <br />
        <img src={ pasarelasPago } alt="Imagen de pasarela de pago" />
    </div>
  )
}
