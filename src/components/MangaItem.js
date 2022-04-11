import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {MANGA_ROUTE} from "../utils/consts";
import {apiUrl} from "../http";

const MangaItem = ({manga}) => {
    const navigate = useNavigate()

    return (
        <Col md={3} className='mt-3' onClick={() => navigate(MANGA_ROUTE + '/' + manga.name)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                <Image width={137} height={200} src={apiUrl + manga.img}/>
                <div>{manga.name}</div>
            </Card>
        </Col>
    );
};

export default MangaItem;
