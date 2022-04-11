import React, {useContext} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {toJS} from "mobx";
import {fetchManga, fetchMangaWithYear, fetchOneManga} from "../http/mangaAPI";

const NameSearch = observer(() => {
    const {manga} = useContext(Context)

    const getMangasWithName = async (name) => {
        if (name) {
            await fetchOneManga(name).then(data => data.manga === null ? manga.setMangas([]) : manga.setMangas([data.manga]))
        } else {
            await fetchManga().then(data => manga.setMangas(data.mangas.rows))
        }
    }

    return (
        <Container className='p-0'>
            <Form className='d-flex align-items-center mt-3'>
                <Form.Control
                    placeholder='Название манги'
                    value={toJS(manga.selectedName)}
                    onChange={(e) => {
                        manga.setSelectedName(e.target.value)
                    }}
                />
                <Button className='p-2'
                        variant='outline-success'
                        onClick={() => getMangasWithName(manga.selectedName).then()}
                >
                    Поиск
                </Button>
            </Form>
        </Container>
    );
})

export default NameSearch;
