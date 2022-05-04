import { useEffect, useState } from "react"


export const useFetch = ( url: RequestInfo, method: string, body?: {} ) => {
     
    const [state, setState] = useState ({ 
        data: null, 
        loading: true, 
        error: null
    });

    useEffect( () => {
        switch(method){
            case 'GET':
              fetch( url )
                .then( response => {
                    if( response !== null && response !== undefined )
                    return response.json()
                })
                .then( data => {
                    if( data !== null && data !== undefined ){
                        setState({
                            data, 
                            loading: false, 
                            error: null
                        })
                    }    
                });
                break; 
            case 'POST':
                fetch( url, {
        
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( body )
                })
                .then( response => {
                    if( response !== null && response !== undefined )
                    return response.json()
                })
                .then( data => {
                    if( data !== null && data !== undefined ){
                        setState({
                            data, 
                            loading: false, 
                            error: null
                        })
                    }    
                });
                break; 
            case 'PUT':
                fetch( url, {
        
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( body )
                })
                .then( response => {
                    if( response !== null && response !== undefined )
                    return response.json()
                })
                .then( data => {
                    if( data !== null && data !== undefined ){
                        setState({
                            data, 
                            loading: false, 
                            error: null
                        })
                    }    
                });
                break; 
                case 'DELETE':
                    fetch( url, {
                        method: 'DELETE',
                    })
                    .then( response => {
                        if( response !== null && response !== undefined )
                        return response.json()
                    })
                    .then( data => {
                        if( data !== null && data !== undefined ){
                            setState({
                                data, 
                                loading: false, 
                                error: null
                            })
                        }    
                    });
                    break; 
        }
        
    },  [ url, method, body ]);

    
    return state;
}


