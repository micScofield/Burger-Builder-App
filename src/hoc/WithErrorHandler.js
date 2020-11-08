//functional approach...
// import React, { useState, useEffect } from 'react'
// import Modal from '../Components/UI/Modal/Modal'
// import Aux from './Auxilliary'

// const WithErrorHandler = (WrappedComponent, axios) => {
//     const ErrorWrapper = props => {

//         const [errorMsg, setErrorMsg] = useState(null);

//         //will mount
//         const reqInterceptor = axios.interceptors.request.use(request => {
//             console.log(request)
//             setErrorMsg(null)
//             return request
//         })
//         const resInterceptor = axios.interceptors.response.use(
//             response => response,
//             error => {
//                 console.log('Response Interceptor, Error:', error)
//                 setErrorMsg(error)
//                 return Promise.reject(error);
//             }
//         )

//         useEffect(() => {
//             //unmount
//             return () => {
//                 console.log('Unmounting Interceptors !')
//                 axios.interceptors.request.eject(reqInterceptor)
//                 axios.interceptors.response.eject(resInterceptor)
//             }
//         }, [reqInterceptor, resInterceptor])

//         const modalCloseHandler = () => {
//             setErrorMsg(null)
//         }

//         //console.log('Inside render')
//         return (
//             <Aux>
//                 {console.log('before modal call', errorMsg)}
//                 <Modal show={errorMsg} backdropClicked={modalCloseHandler}  >
//                     {console.log('Inside Modal', errorMsg)}
//                     {errorMsg ? errorMsg.message : null}
//                 </Modal>

//                 <WrappedComponent {...props} />
//             </Aux>
//         )
//     }
//     return ErrorWrapper
// }
// export default WithErrorHandler

//class based approach
// import React, { Component } from 'react'
// import Modal from '../Components/UI/Modal/Modal'
// import Aux from './Auxilliary'

// const withErrorHandler = (WrappedComponent, axios) => {
//     return class extends Component {
//         state = {
//             errorMsg: null
//         }

//         // constructor(props) {
//         //     super(props);
//         //     console.log('Inside constructor')
//         //     axios.interceptors.request.use(request => {
//         //         this.state = { errorMsg: null }
//         //         return request
//         //     })
//         //     axios.interceptors.response.use( response => response , error => {
//         //         this.state = { errorMsg: error }
//         //         console.log('Interceptor' + this.state.errorMsg)
//         //     }) 
//         // }

//         componentWillMount() {
//             //console.log('Inside WillMount Hook')
//             this.reqInterceptor = axios.interceptors.request.use(request => {
//                 this.setState({ errorMsg: null })
//                 return request
//             })
//             this.resInterceptor = axios.interceptors.response.use( response => response , error => {
//                 this.setState({ errorMsg: error })
//                 console.log('Interceptor', this.state.errorMsg)
//             })  
//         }

//         componentDidMount() {
//             this._isMounted = true;
//             console.log('Error handling mounted!!!', this._isMounted)
//         }

//         componentWillUnmount() {
//             console.log('WillUnmount' + this.reqInterceptor + this.resInterceptor)
//             this._isMounted = false;
//             axios.interceptors.request.eject(this.reqInterceptor)
//             axios.interceptors.response.eject(this.resInterceptor)
//         }

//         modalCloseHandler = () => {
//             this.setState({ errorMsg: null })
//         }

//         render() {
//             //console.log('Inside render')
//             return (
//                 <Aux>
//                     {/* {console.log('before modal call'+this.state.errorMsg)}  */}
//                     <Modal show={this.state.errorMsg} backdropClicked={this.modalCloseHandler}  >
//                         {/* {console.log('Inside Modal' + this.state.errorMsg)} */}
//                         {this.state.errorMsg ? this.state.errorMsg.message : null}
//                     </Modal>

//                     <WrappedComponent {...this.props} />
//                 </Aux>

//             )
//         }
//     }
// }
// export default withErrorHandler


//functional approach with custom httperrorhandler hook...
import React from 'react'
import Modal from '../Components/UI/Modal/Modal'
import Aux from './Auxilliary'
import useHttpErrorHandler from '../hooks/httpErrorHandler'

const WithErrorHandler = (WrappedComponent, axios) => {
    const InnerWrapper = props => {
        const { errorMsg, setErrorMsg } = useHttpErrorHandler(axios)

        const modalCloseHandler = () => {
            setErrorMsg(null)
        }

        return (
            <Aux>
                {console.log('before modal call', errorMsg)}
                <Modal show={errorMsg} backdropClicked={modalCloseHandler}  >
                    {console.log('Inside Modal', errorMsg)}
                    {errorMsg ? errorMsg.message : null}
                </Modal>

                <WrappedComponent {...props} />
            </Aux>
        )
    }
    return InnerWrapper
}
export default WithErrorHandler  // new react update expects a capital letter start for both class based and funtional components