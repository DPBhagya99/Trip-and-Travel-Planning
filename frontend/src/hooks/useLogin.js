import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from '../axios';

export const useLogin = () => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);
    const { dispatch } = useAuthContext();
    const [ status, setStatus ] = useState(false);

    const login = async (email, password) => {
        setIsLoading(true)

        const response = await axios.post('/users/login',
            { email, password }, 
            { headers : {"Content-Type": 'application/json' }})

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            setStatus(true)
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type : 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { login, isLoading, error, status }
}