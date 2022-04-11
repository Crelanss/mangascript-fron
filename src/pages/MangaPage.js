import React, {useContext, useEffect, useState} from 'react'
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {toJS} from "mobx";
import minus from "../imgs/minus.png";
import plus from "../imgs/plus.png";
import EditManga from "../components/modals/EditManga";
import {deleteManga, fetchAuthors, fetchManga, fetchOneManga} from "../http/mangaAPI";
import {useNavigate, useParams} from "react-router-dom";
import {apiUrl} from "../http";
import {SHOP_ROUTE} from "../utils/consts";

const MangaPage = observer(() => {
    const navigate = useNavigate()
    const [singleManga, setManga] = useState({})
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const {cart, user, manga} = useContext(Context)

    useEffect(() => {
        fetchOneManga(params.name)
            .then(data => setManga(data.manga))
            .then(() => setIsLoading(false))

        if (window.localStorage.getItem('mangas') === null) {
            window.localStorage.setItem('mangas', JSON.stringify([]))
        }
        cart.setMangas(JSON.parse(window.localStorage.getItem('mangas')))
    }, [])

    const removeManga = () => {
        if (window.confirm('Вы уверены, что хотите удалить мангу?')) {
            deleteManga(singleManga.name)
                .then(() => {
                    fetchManga().then(data => manga.setMangas(data.mangas.rows))
                    alert('Манга удалена')
                    navigate(SHOP_ROUTE)
                })
        }

    }

    const findManga = (id) => {
        return toJS(cart.mangas).filter(m => m.mangaId === id)[0]
    }

    const addQuantity = (id) => {
        const manga = toJS(cart.mangas).filter(m => m.mangaId === id)[0]
        cart.setNewMangaQuantity(id, manga.quantity + 1)
        window.localStorage.setItem('mangas', JSON.stringify(cart.mangas))
    }

    const lowerQuantity = (id) => {
        const manga = toJS(cart.mangas).filter(m => m.mangaId === id)[0]
        if (manga.quantity - 1 === 0) {
            cart.deleteMangaFromCart(id)
        } else {
            cart.setNewMangaQuantity(id, manga.quantity - 1)
        }
        window.localStorage.setItem('mangas', JSON.stringify(cart.mangas))
    }

    const addToCart = (id) => {
        if (!findManga(id)) {
            cart.setNewManga(id, 1)
        }
        window.localStorage.setItem('mangas', JSON.stringify(cart.mangas))
    }

    const findAuthor = (id) => {
        return toJS(manga.authors).filter(a => a.authorId === id)[0]
    }

    if (!isLoading) {
        return (
            <Container className='mt-3'>
                <Row>
                    <Col md={4}>
                        <Image width={300} height={300} src={apiUrl + singleManga.img}/>
                    </Col>
                    <Col md={4}>
                        <div style={{fontSize: 64, display: 'flex', alignItems: 'flex-start', padding: 0}}>
                            {singleManga.name}
                        </div>
                        <div style={{fontSize: 32}}>
                            {findAuthor(manga.authorId).first_name + ' ' + findAuthor(manga.authorId).last_name}
                        </div>
                        {
                            singleManga.in_stock ?
                                <div>В наличии</div>
                                :
                                <div>Нет в наличии</div>
                        }
                    </Col>
                    <Col md={4}>
                        <Card
                            className='d-flex flex-column align-items-center justify-content-around'
                            style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                        >
                            <h2>{singleManga.price + ' руб'}</h2>
                            {toJS(user.user.role) !== 'administrator' ?
                                <>
                                    {singleManga.in_stock ?
                                        <>
                                            {!findManga(singleManga.id) ?
                                                <Button
                                                    variant='outline-dark'
                                                    onClick={() => {
                                                        addToCart(singleManga.id)
                                                    }}
                                                >
                                                    Добавить в корзину
                                                </Button>
                                                :
                                                <div className={'d-flex align-items-center'}>
                                                    <Image height={12}
                                                           width={12}
                                                           src={minus}
                                                           style={{cursor: 'pointer'}}
                                                           onClick={() => lowerQuantity(singleManga.id)}
                                                    />
                                                    <div
                                                        style={{marginLeft: 10}}>{findManga(singleManga.id).quantity}</div>
                                                    <Image height={12}
                                                           width={12}
                                                           src={plus}
                                                           style={{marginLeft: 10, cursor: 'pointer'}}
                                                           onClick={() => addQuantity(singleManga.id)}
                                                    />
                                                </div>
                                            }
                                        </>
                                        :
                                        <></>
                                    }
                                </>
                                :
                                <></>
                            }
                            {toJS(user.user.role) === 'administrator' ?
                                <Button variant='outline-success' onClick={() => setShow(true)}>Редактировать
                                    мангу</Button>
                                :
                                <></>
                            }
                            {toJS(user.user.role) === 'administrator' ?
                                <Button variant='outline-danger'
                                        onClick={removeManga}
                                >
                                    Удалить мангу
                                </Button>
                                :
                                <></>
                            }
                        </Card>
                    </Col>
                </Row>
                <EditManga show={show} onHide={() => setShow(false)} singleManga={singleManga}/>
                <Row className='mt-5'>
                    <h1>Жанры</h1>
                    <span style={{fontSize: 20}}>
                        {singleManga.genres.map(m =>
                            <span key={m.id}>{m.name}, </span>
                        )}
                </span>
                    <h1>Описание</h1>
                    <span style={{fontSize: 20}}>
                        {singleManga.description}
                </span>
                </Row>
            </Container>
        )
    } else return <></>
})

export default MangaPage;
