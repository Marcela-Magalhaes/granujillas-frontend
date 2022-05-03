import React, { useEffect, useState } from 'react';
import './ProductForm.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import { SelectCategoriesList } from './SelectCategoriesList';
import { Category } from 'models/categoryModel';

type FormState= {
  
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

    useEffect(() => {
        
        fetch('/categories')
            .then( response => {
                if( response !== null && response !== undefined) return response.json();
            })
            .then( data => setCategories( data ))
            .catch( error => console.log(error));
    }, [ ]);

    let checkForm = 0;

    const handleSubmit = async (product: FormState, e?: React.FormEvent<HTMLFormElement> & EventTarget ) => {

        if( e !== undefined){
           e.preventDefault(); 
        }

        const { status } = await fetch('/products', {
        
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( product )
        })


        if( status === 200 ){
            checkForm = 1;
            console.log('checkForm', checkForm);
        }
        
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    
        setInputValues({ 
            ...inputValues,
            [e.target.name]: e.target.value
        });
        console.log('~ ...inputValues,', inputValues);
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement> ) => {

        setInputValues({ 
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

  return (
      
    <div className='container my-2 mx-10'>
        <h1>Add a new product</h1>
        <hr />
        <br />
        <p className='required-message'>* Todos los campos son requeridos</p>
    {
        (checkForm === 0) 
        ?
        
        <Form onSubmit={ () => handleSubmit( inputValues ) }>
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
                <Form.Control type="file" name='image' value={ inputValues.image } placeholder='image' onChange= { handleChange }/>
                
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label><strong>Description</strong></Form.Label>
                <Form.Control as="textarea" style={{ height: '100px' }} name='description' value={ inputValues.description } placeholder='description' onChange= { handleChange }/>
                
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label><strong>Category</strong></Form.Label>
                <Form.Select  name='category' onChange={ () => { return handleSelect } }>
                    <option>Selecciona una Categoría</option>
                    {
                        categories.map( category => {
                            return  <option value={ category.name }> { category.name } </option>
                        })
                    }

                </Form.Select>
                
            </Form.Group>
            <div className='text-center'>
            <Button variant='warning' type='submit' className='col-6 '>Submit</Button> 
            </div>
            
            
        </Form>
        
        :

        <h1 className="message">Tu producto ha sido añadido correctamente </h1>
          
    }
    </div>
  )
}
