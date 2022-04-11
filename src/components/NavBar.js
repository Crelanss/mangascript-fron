import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

import {Context} from "../index";
import {ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, MY_ACCOUNT_ROUTE, ORDERS_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {toJS} from "mobx";
import {check} from "../http/userAPI";


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token', '')
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => {
            if(toJS(user.isAuth) === false) {
                navigate(SHOP_ROUTE)
            }
        })
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}>MangaScript</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        {toJS(user.user.role) === 'administrator' ?
                            <Button variant={'outline-light'}
                                    onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </Button>
                            :
                            <></>
                        }
                        {toJS(user.user.role) !== 'administrator' ?
                            <Button variant={'outline-light'}
                                    style={{marginLeft: '20px'}}
                                    onClick={() => navigate(CART_ROUTE)}
                            >
                                Корзина
                            </Button>
                            :
                            <></>
                        }
                        {toJS(user.user.role) === 'user' ?
                            <Button variant={'outline-light'}
                                    style={{marginLeft: '20px'}}
                                    onClick={() => navigate(ORDERS_ROUTE)}
                            >
                                Заказы
                            </Button>
                            :
                            <></>
                        }
                        {toJS(user.user.role) === 'user' ?
                            <Button variant={'outline-light'}
                                    style={{marginLeft: '20px'}}
                                    onClick={() => navigate(MY_ACCOUNT_ROUTE)}
                            >
                                Мой аккаунт
                            </Button>
                            :
                            <></>
                        }
                        <Button variant={'outline-light'}
                                style={{marginLeft: '20px'}}
                                onClick={() => logOut()}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
})

export default NavBar;
