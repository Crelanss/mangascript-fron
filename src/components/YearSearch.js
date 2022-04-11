import React, {useContext} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {toJS} from "mobx";
import {fetchManga, fetchMangaWithYear} from "../http/mangaAPI";

const YearSearch = observer(() => {
    const {manga} = useContext(Context)

    const getMangasWithYear = async (year) => {
        if (year) {
            await fetchMangaWithYear(year).then(data => manga.setMangas(data.mangas.rows))
        } else {
            fetchManga().then(data => manga.setMangas(data.mangas.rows))
        }
    }

    return (
        <Container className='p-0'>
            <Form className='d-flex align-items-center mt-3'>
                <Form.Control
                    placeholder='Год выпуска манги'
                    value={toJS(manga.selectedYear)}
                    onChange={(e) => {
                        manga.setSelectedYear(e.target.value)
                    }}
                />
                <Button className='p-2'
                        variant='outline-success'
                        onClick={() => {
                            getMangasWithYear(manga.selectedYear).then()
                        }}
                >
                    Поиск
                </Button>
            </Form>
        </Container>
    );
})

export default YearSearch;
