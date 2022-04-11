import React, {useContext, useEffect} from 'react'
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {toJS} from "mobx";
import plus from '../imgs/plus.png'
import minus from '../imgs/minus.png'
import {apiUrl} from "../http";
import {postOrder} from "../http/userAPI";
import {useNavigate} from "react-router-dom";
import {ORDERS_ROUTE} from "../utils/consts";

const Cart = observer(() => {
    const navigate = useNavigate()

    useEffect(() => {
        if (window.localStorage.getItem('mangas') === null) {
            window.localStorage.setItem('mangas', JSON.stringify([]))
        }
        cart.setMangas(JSON.parse(window.localStorage.getItem('mangas')))
    }, [])

    const sendOrders = () => {
        const formData = new FormData()
        formData.append('mangas', JSON.stringify(cart.mangas))
        formData.append('date_ordered', new Date().toUTCString())

        postOrder(formData)
            .then(() => {
                window.localStorage.setItem('mangas', JSON.stringify([]))
                cart.setMangas(JSON.parse(window.localStorage.getItem('mangas')))
                navigate(ORDERS_ROUTE)
            })
    }

    const {cart, manga} = useContext(Context)

    const findManga = (id) => {
        return toJS(manga.mangas).filter(m => m.id === id)[0]
    }

    const addQuantity = (id) => {
        const manga = toJS(cart.mangas).filter(m => m.mangaId === id)[0]
        cart.setNewMangaQuantity(id, manga.quantity + 1)
        window.localStorage.setItem('mangas', JSON.stringify(cart.mangas))
    }

    const lowerQuantity = (id) => {
        const manga = toJS(cart.mangas).filter(m => m.mangaId === id)[0]
        if (manga.quantity - 1 !== 0) {
            cart.setNewMangaQuantity(id, manga.quantity - 1)
        }
        window.localStorage.setItem('mangas', JSON.stringify(cart.mangas))
    }

    const deleteManga = (id) => {
        cart.deleteMangaFromCart(id)
        window.localStorage.setItem('mangas', JSON.stringify(cart.mangas))
    }

    const countSum = () => {
        let sum = 0
        toJS(cart.mangas).forEach(m => {
            sum += m.quantity * findManga(m.mangaId).price
        })

        return sum
    }
    if (toJS(manga.mangas).length !== 0) {
        return (
            <Container className='mt-5'>
                {toJS(cart.mangas).length > 0 ?
                    toJS(cart.mangas).map(q =>
                        <Card key={q.mangaId} className='d-flex' style={{width: 900}}>
                            <Row>
                                <Col md={3}>
                                    <Image width={200} height={200} src={apiUrl + findManga(q.mangaId).img}/>
                                </Col>
                                <Col md={3}>
                                    <div style={{fontSize: 32}}>{findManga(q.mangaId).name}</div>
                                    <div style={{fontSize: 20}}>{findManga(q.mangaId).price + ' руб'}</div>
                                    <div
                                        style={{fontSize: 20}}>{'Итого: ' + findManga(q.mangaId).price * q.quantity + ' руб'}</div>
                                </Col>
                                <Col md={2} className='d-flex align-items-center' style={{height: 100}}>
                                    <Image height={12}
                                           width={12}
                                           src={minus}
                                           style={{cursor: 'pointer'}}
                                           onClick={() => lowerQuantity(q.mangaId)}
                                    />
                                    <div style={{marginLeft: 10}}>{q.quantity}</div>
                                    <Image height={12}
                                           width={12}
                                           src={plus}
                                           style={{marginLeft: 10, cursor: 'pointer'}}
                                           onClick={() => addQuantity(q.mangaId)}
                                    />
                                </Col>
                                <Col md={2} className='d-flex align-items-center' style={{height: 100}}>
                                    <Button
                                        variant={'outline-danger'}
                                        onClick={() => deleteManga(q.mangaId)}
                                    >
                                        Удалить из корзины
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    )
                    :
                    <div>Пусто</div>
                }
                {
                    toJS(cart.mangas).length > 0 ?
                        <div className={'d-flex flex-column'}>
                            <span>Итого: {countSum()} руб</span>
                            <Button variant='outline-success' onClick={() => sendOrders()}>Оформить заказ</Button>
                        </div>
                        :
                        <></>
                }
            </Container>
        )
    }
    else {
        return (
            <></>
        )
    }

})

export default Cart
