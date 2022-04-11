import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {toJS} from 'mobx'

import {Context} from "../index";
import {fetchManga, fetchMangaWithGenres} from "../http/mangaAPI";


const GenreBar = observer(() => {
    const {manga} = useContext(Context)
    const genres = toJS(manga.genres)

    const getMangasWithGenre = async (genre) => {
        if(genre !== '') {
            await manga.setSelectedGenre(genre)
            await fetchMangaWithGenres(manga.selectedGenre.name).then(data => manga.setMangas(data.mangas.rows))
        } else {
            await manga.setSelectedGenre('')
            await fetchManga().then(data => manga.setMangas(data.mangas.rows))
        }
    }
    return (
        <ListGroup>
            <ListGroup.Item
                style={{cursor: 'pointer'}}
                onClick={() => {
                    getMangasWithGenre('').then(() => {})
                }}
            >
                Все
            </ListGroup.Item>
            {genres.map(g =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={g.id === manga.selectedGenre.id}
                    key={g.id}
                    onClick={() => {
                        getMangasWithGenre(g).then(() => {})
                    }}
                >
                    {g.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default GenreBar;
