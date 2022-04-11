import React, {useContext, useState} from 'react'
import {Button, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ChangeUserData from "../components/modals/ChangeUserData";

const MyAccount = observer(() => {
    const [show, setShow] = useState(false)
    const {user} = useContext(Context)

    // if ()
    return (
        <Container>
            <div className='d-flex flex-column  mt-5'>
                    <div className='d-flex align-items-center mt-2'>
                        <span style={{fontWeight: 'bold'}}>Почта:</span>
                        {`${user.user.email}`}
                    </div>
                <div className='d-flex align-items-center mt-2'>
                    <span style={{fontWeight: 'bold'}}>Имя:</span>
                    {`${user.user.first_name}`}
                </div>
                <div className='d-flex align-items-center mt-2'>
                    <span style={{fontWeight: 'bold'}}>Фамилия:</span>
                    {`${user.user.last_name}`}
                </div>
                    <Button variant='outline-success'
                            className='mt-5'
                            style={{width: '100%'}}
                            onClick={() => setShow(true)}
                    >
                        Изменить
                    </Button>
                <ChangeUserData onHide={() => setShow(false)} show={show}/>
            </div>
        </Container>
    )
})

export default MyAccount;
