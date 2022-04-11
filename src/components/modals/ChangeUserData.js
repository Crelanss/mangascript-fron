import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {check, login, updateUser} from "../../http/userAPI";
import {toJS} from "mobx";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";

const ChangeUserData = observer(({show, onHide}) => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const [userToUpdate, setUserToUpdate] = useState({
        email: '',
        first_name: '',
        last_name: ''
    })

    const sendNewUserData = () => {
        updateUser(userToUpdate.email, userToUpdate.last_name, userToUpdate.first_name)
            .then(() => user.setUser({}))
            .then(() => localStorage.setItem('token', []))
            .then(() => navigate(LOGIN_ROUTE))
        onHide()
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
                <Form className='d-flex flex-column align-items-center'>
                    <Form.Control
                        style={{width: 400}}
                        className='mt-2'
                        placeholder={'email'}
                        value={userToUpdate.email}
                        onChange={(e) => setUserToUpdate({...userToUpdate, email: e.target.value})}
                    />
                    <Form.Control
                        style={{width: 400}}
                        className='mt-2'
                        placeholder={'Имя'}
                        value={userToUpdate.first_name}
                        onChange={(e) => setUserToUpdate({...userToUpdate, first_name: e.target.value})}
                    />
                    <Form.Control
                        style={{width: 400}}
                        className='mt-2'
                        placeholder={'Фамилия'}
                        value={userToUpdate.last_name}
                        onChange={(e) => setUserToUpdate({...userToUpdate, last_name: e.target.value})}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={sendNewUserData}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default ChangeUserData;
