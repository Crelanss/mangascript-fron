import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {toJS} from "mobx";
import {useNavigate, useParams} from "react-router-dom";
import {createManga, editManga, fetchManga} from "../../http/mangaAPI";
import {SHOP_ROUTE} from "../../utils/consts";

const EditManga = observer(({show, onHide, singleManga}) => {
    const navigate = useNavigate()
    const {manga} = useContext(Context)

    useEffect(() => {
        manga.setMangaToEdit('in_stock', singleManga.in_stock)
        manga.setMangaToEdit('description', singleManga.description)
        manga.setMangaToEdit('price', singleManga.price)
    }, [])

    const selectFile = (e) => {
        manga.setMangaToEdit('img', e.target.files[0])
    }

    const getInStock = (in_stock) => {
        if (in_stock) {
            return 'В наличие'
        }
        if (in_stock === false) {
            return 'Не в наличие'
        } else {
            return null
        }
    }

    const sendManga = () => {
        const formData = new FormData()
        formData.append('price', manga.mangaToEdit.price)
        formData.append('img', manga.mangaToEdit.img)
        formData.append('description', manga.mangaToEdit.description)
        formData.append('in_stock', manga.mangaToEdit.in_stock)

        editManga(formData, singleManga.name).then((data) => {
            manga.setMangaToPostToNull()
            onHide()
        })
            .then(() => {
                fetchManga().then(data => manga.setMangas(data.mangas.rows))
                alert('Манга обновлена')
                navigate(SHOP_ROUTE)
            })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить данные
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>
                            {getInStock(toJS(manga.mangaToEdit.in_stock))}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    manga.setMangaToEdit('in_stock', true)
                                }}
                            >
                                В наличие
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    manga.setMangaToEdit('in_stock', false)
                                }}
                            >
                                Не в наличие
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className='mt-3'>Описание</div>
                    <Form.Control
                        className='mt-1'
                        placeholder='Введите описание манги'
                        as="textarea"
                        rows={3}
                        value={manga.mangaToEdit.description}
                        onChange={e => manga.setMangaToEdit('description', e.target.value)}
                    />
                    <div className='mt-3'>Цена</div>
                    <Form.Control
                        className='mt-1'
                        placeholder='Введите цену манги'
                        type='number'
                        value={manga.mangaToEdit.price}
                        onChange={e => manga.setMangaToEdit('price', e.target.value)}
                    />
                    <div className='mt-3'>Фотография</div>
                    <Form.Control
                        className='mt-1'
                        placeholder='Прикрепите картинку манги'
                        type='file'
                        onChange={e => selectFile(e)}
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={sendManga}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default EditManga;
