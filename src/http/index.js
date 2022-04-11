import axios from 'axios'

export const apiUrl = 'https://mangascript.herokuapp.com/'

const $host = axios.create({
    baseURL: apiUrl
})

const $authHost = axios.create({
    baseURL: apiUrl
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
