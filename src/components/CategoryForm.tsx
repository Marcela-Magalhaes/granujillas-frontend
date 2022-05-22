import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


type FormState = {
    name: string,
    image: string
};

const initialState = {
    name: '',
    image: ''
};


export const CategoryForm = () => {

    const [ inputValues, setInputValues ] = useState(initialState);
    const [ file, setFile ] = useState();

    const navigate = useNavigate();

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> & EventTarget ) => {
        const newFile: any = e.target.files![0];
        setFile( newFile )
    };

    const handleNameChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        
        setInputValues({ 
            ...inputValues,  
            [ e.target.name ]: e.target.value
        });
    }

   const handleSubmit = async ( category: FormState, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        // Multer
        const data = new FormData();
        data.append('image', file as any);

        await fetch('https://api.granujillas.teamcamp.ovh/images', {
            method: 'POST',
            body: data
        });

        category.image = String((file as any).name);
    
        // Post to /categories
        await fetch('https://api.granujillas.teamcamp.ovh/categories', {
            method: 'POST', 
            body: JSON.stringify(category)
        });

        setTimeout(() => {
            navigate('/home');
        }, 1000);
   };

  return (
    <div className='container my-5 px-5'>
        <div className="text-center">
            <h1>Add a new category</h1>
        </div>
        
        <Form onSubmit={ (e) => handleSubmit( inputValues, e ) }>
            <Form.Group className='my-3'>
                <Form.Label><strong>Name</strong></Form.Label>
                <Form.Control type="text" name="name" placeholder="Category name" onChange={ handleNameChange } value={ inputValues.name }/>
            </Form.Group>

            <Form.Group>
                <Form.Label><strong>Image</strong></Form.Label>
                <Form.Control type='file' formEncType='multipart/form-data' name="image" onChange={ handleChange }/>
            </Form.Group>

            <div className='text-center my-4'>
                <Button variant='warning' type='submit' className='col-6'>Submit</Button>
            </div>
        </Form>

    </div>
  )
}
