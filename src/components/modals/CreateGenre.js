import React, {useContext} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {createGenre,fetchGenres} from "../../http/mangaAPI";

const CreateGenre = observer(({show, onHide}) => {
    const {manga} = useContext(Context)

    const sendGenre = () => {
        createGenre(manga.genreToPost)
            .then(() => {
                manga.setMangaToPost('')
                onHide()
            })
            .then(() => {
                fetchGenres().then(data => manga.setGenres(data))
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
                    Добавить жанр
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder='Введите жанр'
                        value={manga.genreToPost}
                        onChange={e => {manga.setGenreToPost(e.target.value)}}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={sendGenre}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateGenre;
