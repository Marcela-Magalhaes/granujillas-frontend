import React, { useEffect, useState } from 'react';
import './ProductForm.css';
import Form from 'react-bootstrap/Form';
import { Alert, Button } from 'react-bootstrap';
import { Category } from 'models/categoryModel';
import { useParams } from 'react-router-dom';

type FormState= {
    _id?: string,
    name: string,
    price: number,
    image: string,
    description: string,
    category: string
};

const initialState = {
    name: '',
    price: 0,
    image: '',
    description: '',
    category: ''
};


export const ProductForm = () => {


    const [ inputValues, setInputValues ] = useState<FormState>(initialState);

    const [ categories, setCategories ] = useState<Category[]>([]);

    const [ checkForm , setCheckForm ] = useState(0);

    const [ checkUpdate, setCheckUpdate ] = useState(0);

    useEffect(() => {
        
        fetch('/categories')
            .then( response => {
                if( response !== null && response !== undefined) return response.json();
            })
            .then( data => {
                setCategories( data )
                // console.log('~ data', data);
            })
            
            .catch( error => console.log(error));
    }, [ ]);

    const { id } = useParams();
    useEffect(() => {
    
        if( id !== undefined){
            setCheckUpdate(1);
            fetch(`/products/${ id }`)
                .then( response => {
                    if( response !== null && response !== undefined ){
                        return response.json()
                    };
                })
                .then( data => {
                    
                    setInputValues({
                        _id: data._id,
                        name: data.name,
                        price: data.price, 
                        image: '',
                        description: data.description,
                        category: data.category
                    });
                })
                .catch( error => console.log(error));
        }
   }, [ id ]);

   
    const handleSubmit = async (product: FormState, e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();  

        if( inputValues._id === undefined || inputValues._id === null){
            // Multer upload
            const data = new FormData();
            data.append('image', product.image);
            await fetch('http://localhost:3000/images', {
                method: 'POST',
                body: data
            });

            // AddProduct
            const { status } = await fetch('/products', {
            
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( product )
            
            });
            console.log('~ status', status);
            if( status === 200 ) setCheckForm(1);
            
             
        } else {
            
            if( id !== undefined){
               // Update product
                await fetch(`/products/${ id }`, {
        
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        description: product.description,
                        category: product.category
                    })
                })
                e.preventDefault();
              
            }

            
        }
        
        e.preventDefault(); 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    
        setInputValues({ 
            ...inputValues,
            [e.target.name]: e.target.value
        });
       
    };

    const handleSelect = (e:  React.ChangeEvent<HTMLSelectElement> ) => {
        
        setInputValues({ 
            ...inputValues,
            [e.target.name]: e.target.value
        });
     
    };

  return (
      
    <div className='container my-2 mx-10'>
        <div className='text-center'>
            {
                (checkUpdate === 0)
                ? <h1>Add a new product</h1>
                : <h1>Update a product</h1>
            }
            
        </div>
        
        <hr />
        <br />

    {
        
        (checkForm === 0) 
        
        ?   <div>
                <p className='required-message'>* Todos los campos son requeridos</p>
                <Form onSubmit={ (e) => handleSubmit( inputValues, e ) }>
                    <Form.Group className='mb-3' >
                        <Form.Label><strong>Name</strong></Form.Label>
                        <Form.Control type="text" name='name' value={ inputValues.name } placeholder='Product name' onChange= { handleChange }/>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label><strong>Price</strong></Form.Label>
                        <Form.Control type="number" name='price' value={ inputValues.price } placeholder='Price' onChange= { handleChange }/>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label><strong>Image</strong></Form.Label>
                        <Form.Control type="file" formAction='/image' formMethod='post' formEncType='multipart/form-data' name='image' value={ inputValues.image } onChange= { handleChange }/>    
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label><strong>Description</strong></Form.Label>
                        <Form.Control as="textarea" style={{ height: '100px' }} name='description' value={ inputValues.description } placeholder='description' onChange= { handleChange }/> 
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicSelect'>
                        <Form.Label><strong>Category</strong></Form.Label>
                        <Form.Select  name='category' value={ inputValues.category } onChange={ handleSelect }>
                            <option>Selecciona una Categoría</option>
                            {
                                categories.map( category => {
                                    return  <option key={ category._id }>{ category.name }</option>
                                })
                            } 
                        </Form.Select>

                    </Form.Group>

                    <div className='text-center'>
                        <Button variant='warning' type='submit' className='col-6'>Submit</Button> 
                    </div>
                    
                </Form>
            </div>
       
        :  <Alert key="success" variant="success">
                <h1 className="message text-center">Tu producto ha sido añadido correctamente. </h1>
           </Alert>  
                    
         
          
    }
    </div>
  )
}
