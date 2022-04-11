import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import {toJS} from "mobx";
import MangaItem from "./MangaItem";

const MangaList = observer(() => {
    const {manga} = useContext(Context)

    return (
        <Row className='d-flex'>
            {toJS(manga.mangas).map(m =>
                <MangaItem key={m.id} manga={m}/>
            )}
        </Row>
    )
})

export default MangaList;
