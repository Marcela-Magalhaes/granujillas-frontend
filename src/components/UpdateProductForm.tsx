import React, { useEffect, useState } from 'react';
import './ProductForm.css';
import Form from 'react-bootstrap/Form';
import { Alert, Button } from 'react-bootstrap';
import { Category } from 'models/categoryModel';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';
import { Product } from 'models/productModel';


type FormState= {
  
    name: string,
    price: number,
    image: string,
    description: string,
    category: string
};

let initialState = {
    name: '',
    price: 0,
    image: '',
    description: '',
    category: ''
};

let checkForm = 0;

export const UpdateProductForm = () => {
    const { id } = useParams();
    
    const [ inputValues, setInputValues ] = useState<FormState>(initialState);

    const [ categories, setCategories ] = useState<Category[]>([]);

    const { data } = useFetch('/categories', 'GET');
        if( data !== null ){
            setCategories(data);
        }
        

    useEffect(() => {

        fetch(`/products/${ id }`)
            .then( response => {
                if( response !== null && response !== undefined) return response.json();
            })
            .then( data => {
                const product: FormState = data;
                setInputValues(product);
            })
            
            .catch( error => console.log(error));
    }, [ id ]);

       

    const handleSubmit = async (product: FormState, e: React.FormEvent<HTMLFormElement & EventTarget>  ) => {

        e.preventDefault(); 
        
        const { status } = await fetch(`/products/${ id }`, {
        
            method: 'put',
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
         console.log('~ ...inputValues handleChange', inputValues);
    };

    const handleSelect = (e:  React.ChangeEvent<HTMLSelectElement> ) => {
        // console.log('######### e.target.name', e.target.name);
        // console.log('######### e.target.value', e.target.value);
        setInputValues({ 
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

  return (
      
    <div className='container my-2 mx-10'>
        <div className="text-center">
            <h1>Edit a product</h1>
        </div>
       
        <hr />
        <br />

    {
        
        (checkForm === 0) 
        
        ?
        <div>
            <p className='required-message'>* Todos los campos son requeridos</p>
            <Form onSubmit={ (e) => handleSubmit( inputValues, e ) }>
                <Form.Group className='mb-3' >
                    <Form.Label><strong>Name</strong></Form.Label>
                    <Form.Control type="text" name='name' value={ inputValues.name } onChange= { handleChange }/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label><strong>Price</strong></Form.Label>
                    <Form.Control type="text" name='price' value={ inputValues.price }  onChange= { handleChange }/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label><strong>Image</strong></Form.Label>
                    <Form.Control type="file" name='image' value={ inputValues.image } onChange= { handleChange } />    
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label><strong>Description</strong></Form.Label>
                    <Form.Control as="textarea" style={{ height: '100px' }} name='description' value={ inputValues.description }  onChange= { handleChange }/> 
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicSelect'>
                    <Form.Label><strong>Category</strong></Form.Label>
                    <Form.Select  name='category' value={ inputValues.category } onChange={ handleSelect }>
                        <option>{inputValues.category}</option>
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
       
        :
        <Alert key="success" variant="success">
             <h1 className="message">Tu producto ha sido añadido correctamente. </h1>
             <Link to="/updateProduct">Editar producto</Link>
        </Alert>               
         
          
    }
    </div>
  )
}
