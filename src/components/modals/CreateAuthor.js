import React, {useContext} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {createAuthor, fetchAuthors} from "../../http/mangaAPI";

const CreateAuthor = observer(({show, onHide}) => {
    const {manga} = useContext(Context)

    const sendAuthor = () => {
        createAuthor(manga.authorToPost.first_name, manga.authorToPost.last_name)
            .then(() => {
                manga.setAuthorToPost('first_name', '')
                manga.setAuthorToPost('last_name', '')
                onHide()
            })
            .then(() => {
                fetchAuthors().then(data => manga.setAuthors(data.authors))
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
                    Добавить автора
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder='Введите имя автора'
                        className='mb-4'
                        value={manga.authorToPost.first_name}
                        onChange={e => {manga.setAuthorToPost('first_name', e.target.value)}}
                    />
                    <Form.Control
                        placeholder='Введите фамилию автора'
                        value={manga.authorToPost.last_name}
                        onChange={e => {manga.setAuthorToPost('last_name', e.target.value)}}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={sendAuthor}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateAuthor;
