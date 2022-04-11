import React, {useContext, useState} from 'react'
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try{
            let userData
            if (isLogin) {
                userData = await login(email, password)
            } else {
                userData = await registration(email, password, first_name, last_name)
            }
            user.setUser(userData)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите ваш email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш пароль'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    <Form.Control
                        style={isLogin ? {display: 'none'} : {display: 'inline'}}
                        className='mt-3'
                        placeholder='Введите ваше имя'
                        value={first_name}
                        onChange={e => setFirst_name(e.target.value)}
                    />
                    <Form.Control
                        style={isLogin ? {display: 'none'} : {display: 'inline'}}
                        className='mt-3'
                        placeholder='Введите вашу фамилию'
                        value={last_name}
                        onChange={e => setLast_name(e.target.value)}
                    />
                    <div className='d-flex justify-content-between mt-2'>
                        {isLogin ?
                            <Button variant='outline-success' onClick={() => navigate(REGISTRATION_ROUTE)}>Зарегистрироваться</Button>
                            :
                            <Button variant='outline-success' onClick={() => navigate(LOGIN_ROUTE)}>Войти</Button>
                        }
                        <Button variant='outline-success' onClick={click}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;
