import { useState, useEffect } from 'react'

const HttpErrorHandler = axios => {
    const [errorMsg, setErrorMsg] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(request => {
        console.log(request)
        setErrorMsg(null)
        return request
    })
    const resInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
            console.log('Response Interceptor, Error:', error)
            setErrorMsg(error)
            return Promise.reject(error);
        }
    )

    useEffect(() => {
        //unmount
        return () => {
            console.log('Unmounting Interceptors !')
            axios.interceptors.request.eject(reqInterceptor)
            axios.interceptors.response.eject(resInterceptor)
        }
    }, [reqInterceptor, resInterceptor])

    return { errorMsg, setErrorMsg }
}

export default HttpErrorHandler