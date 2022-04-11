import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import {createManga, fetchGenres, fetchManga} from "../../http/mangaAPI";

const CreateManga = observer(({show, onHide}) => {
    const {manga} = useContext(Context)
    const [file, setFile] = useState(null)

    const selectFile = (e) => {
        setFile( e.target.files[0])
    }

    const findAuthor = (id) => {
        let author = ''
        const aut = toJS(manga.authors).filter(a => a.id === id)[0]
        if (!aut) {
            return null
        } else {
            author = aut.last_name + ' ' + aut.first_name

            return author
        }
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
        formData.append('name', manga.mangaToPost.name)
        formData.append('price', manga.mangaToPost.price)
        formData.append('release_year', manga.mangaToPost.release_year)
        formData.append('authorId', manga.mangaToPost.authorId)
        formData.append('genres', JSON.stringify(manga.mangaToPost.genres))
        formData.append('img', file)
        formData.append('description', manga.mangaToPost.description)
        formData.append('in_stock', manga.mangaToPost.in_stock)

        createManga(formData).then((data) => {
            manga.setMangaToPostToNull()
            onHide()
        })
            .then(() => {
                fetchManga().then(data => manga.setMangas(data.mangas.rows))
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
                    Добавить мангу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>
                            Выберите жанр
                        </Dropdown.Toggle>
                            <Form.Control as="select" multiple value={manga.mangaToPost.genres} onChange={e => manga.setMangaToPost('genres', [].slice.call(e.target.selectedOptions).map(item => item.value))}>
                                {toJS(manga.genres).map((g) =>
                                    <option key={g.id} value={g.name}>
                                        {g.name}
                                    </option>
                                )}
                            </Form.Control>
                    </Dropdown>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>
                            {findAuthor(toJS(manga.mangaToPost.authorId)) || 'Выберите автора'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {toJS(manga.authors).map((a) =>
                                <Dropdown.Item
                                    key={a.id}
                                    onClick={() => {
                                        manga.setMangaToPost('authorId', a.id)
                                    }}
                                >
                                    {a.first_name + ' ' + a.last_name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>
                            {getInStock(toJS(manga.mangaToPost.in_stock)) || 'Укажите наличие'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    manga.setMangaToPost('in_stock', true)
                                }}
                            >
                                В наличие
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    manga.setMangaToPost('in_stock', false)
                                }}
                            >
                                Не в наличие
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите название манги'
                        value={manga.mangaToPost.name}
                        onChange={e => manga.setMangaToPost('name', e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите описание манги'
                        as="textarea"
                        rows={3}
                        value={manga.mangaToPost.description}
                        onChange={e => manga.setMangaToPost('description', e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите цену манги'
                        type='number'
                        value={manga.mangaToPost.price}
                        onChange={e => manga.setMangaToPost('price', e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите год выпуска'
                        type='number'
                        value={manga.mangaToPost.release_year}
                        onChange={e => manga.setMangaToPost('release_year', e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Прикрепите картинку манги'
                        type='file'
                        onChange={e => selectFile(e)}
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={sendManga}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateManga;
