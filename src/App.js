import {BrowserRouter, useNavigate} from 'react-router-dom'

import AppRouter from './components/AppRouter'
import NavBar from "./components/NavBar";
import {Context} from "./index";
import {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {SHOP_ROUTE} from "./utils/consts";
import {toJS} from "mobx";
import {fetchAuthors, fetchGenres, fetchManga} from "./http/mangaAPI";


const App = observer(() => {
    const {user, manga} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchGenres().then(data => manga.setGenres(data))
        fetchAuthors().then(data => manga.setAuthors(data.authors))
        fetchManga().then(data => manga.setMangas(data.mangas.rows))

        check().then(data => {
                user.setUser(data)
                user.setIsAuth(true)
        }).finally(() => {
            setLoading(false)
            if(toJS(user.isAuth) === false) {
                navigate(SHOP_ROUTE)
            }
        })
    }, [])

    if (loading) {
        return <Spinner animation={'grow'}/>
    }

    return (
       <>
            <NavBar/>
            <AppRouter/>
       </>
    )
})

export default App;
