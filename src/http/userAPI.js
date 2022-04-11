import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (email, password, first_name, last_name) => {
    const {data} = await $host.post('api/user/registration', {email, password, first_name, last_name, role: 'user'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth',)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchOrders = async () => {
    const {data} = await $authHost.get('api/user/orders',)
    return data
}

export const postOrder = async (order) => {
    const {data} = await $authHost.post('api/cartorder', order)
    return data
}

export const updateUser = async (email, last_name, first_name) => {
    const {data} = await $authHost.put('api/user', {email, last_name, first_name})
    return data
}
