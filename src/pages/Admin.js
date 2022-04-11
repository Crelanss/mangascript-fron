import React, {useContext, useEffect, useState} from 'react'
import {Button, Container} from "react-bootstrap";
import CreateGenre from "../components/modals/CreateGenre";
import CreateAuthor from "../components/modals/CreateAuthor";
import CreateManga from "../components/modals/CreateManga";
import {fetchManga} from "../http/mangaAPI";
import {Context} from "../index";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";

const Admin = observer(() => {
    const [genreVisible, setGenreVisible] = useState(false)
    const [authorVisible, setAuthorVisible] = useState(false)
    const [mangaVisible, setMangaVisible] = useState(false)

        return (
            <Container className='d-flex flex-column'>
                <Button variant='outline-dark'
                        className='mt-4 p-2'
                        onClick={() => setGenreVisible(true)}
                >
                    Добавить жанр
                </Button>
                <Button variant='outline-dark'
                        className='mt-4 p-2'
                        onClick={() => setAuthorVisible(true)}
                >
                    Добавить автора
                </Button>
                <Button variant='outline-dark'
                        className='mt-4 p-2'
                        onClick={() => setMangaVisible(true)}
                >
                    Добавить мангу
                </Button>
                <CreateGenre show={genreVisible} onHide={() => setGenreVisible(false)}/>
                <CreateAuthor show={authorVisible} onHide={() => setAuthorVisible(false)}/>
                <CreateManga show={mangaVisible} onHide={() => setMangaVisible(false)}/>
            </Container>
        )
})

export default Admin
