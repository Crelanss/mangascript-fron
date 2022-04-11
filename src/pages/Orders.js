import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Card, Container, Image, Row} from "react-bootstrap";
import {toJS} from "mobx";
import {fetchOrders, postOrder} from "../http/userAPI";
import {SHOP_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "../http";

const Orders = observer(() => {
    const {manga} = useContext(Context)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        try {
            fetchOrders().then(data => setOrders(data.userOrders[0].orders))
        } catch (e)  {
            alert(e.message)
        }
    }, [])

    const sortOrders = (orders) => {
        if (orders !== []) {
            const userOrdersSorted = []
            const singIds = []

            orders.forEach(o => {
                let isRepeated = false
                singIds.forEach(s => {
                    if (o.orderId === s) {
                        isRepeated = true
                    }
                })
                !isRepeated && singIds.push(o.orderId)
            })

            singIds.forEach(s => {
                userOrdersSorted.push({
                    orderId: s,
                    mangas: [],
                    dateOrdered: ''
                })
            })

            orders.forEach(o => {
                userOrdersSorted.forEach(u => {
                    if (o.orderId === u.orderId) {
                        u.dateOrdered = o.createdAt
                        u.mangas.push({
                            manga: o.mangaId,
                            quantity: o.quantity
                        })
                    }
                })
            })

            return userOrdersSorted
        }
    }

    const findManga = (id) => {
        return toJS(manga.mangas).filter(m => m.mangaId === id)[0]
    }
    return (
        <Container>
            {
                sortOrders(orders).map(u =>
                    <Card className='d-flex flex-column mt-4' style={{width: 600}}>
                        <h4>{'Дата заказа: ' + new Date(Date.parse(u.dateOrdered)).toISOString().substr(0, 10)}</h4>
                        {
                            u.mangas.map(m =>
                                <div className='d-flex mt-2'>
                                    <Image src={apiUrl + findManga(m.mangaId).img} height={150} width={150}/>
                                    <div>{findManga(m.mangaId).name + ': '}</div>
                                    <div>{m.quantity}</div>
                                </div>
                            )
                        }
                    </Card>
                )
            }
        </Container>
    )
})

export default Orders;
