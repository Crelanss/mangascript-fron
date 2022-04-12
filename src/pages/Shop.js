import React, {useContext, useEffect} from 'react'
import {Col, Container, Row} from "react-bootstrap";

import GenreBar from "../components/GenreBar";
import YearSearch from "../components/YearSearch";
import NameSearch from "../components/NameSearch";
import MangaList from "../components/MangaList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Shop = observer(() => {

    useEffect(() => {

    }, [])

    return (
        <Container>
            <Row className='mt-3'>
                <Col md={3}>
                    <GenreBar/>
                    <YearSearch/>
                </Col>
                <Col md={9}>
                    <NameSearch/>
                    <MangaList/>
                </Col>
            </Row>
        </Container>
    )
})

export default Shop
