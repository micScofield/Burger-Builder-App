import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://react-my-burger-61bad.firebaseio.com/'
})

export default instance