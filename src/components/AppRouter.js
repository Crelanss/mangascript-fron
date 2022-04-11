import React, {useContext} from 'react'
import {useRoutes} from 'react-router-dom'

import {adminRoutes, authRoutes, publicRoutes, userRoutes} from '../routes'
import {Context} from "../index";
import {toJS} from "mobx";

const AppRouter = () => {
    const {user} = useContext(Context)

    const userAuthRoutes = useRoutes(userRoutes.map(({path, Component}) => {
        return {
            path: path,
            element: Component,
        }
    }))

    const adminAuthRoutes = useRoutes(adminRoutes.map(({path, Component}) => {
        return {
            path: path,
            element: Component,
        }
    }))

    const unAuthedRoutes = useRoutes(publicRoutes.map(({path, Component}) => {
        return {
            path: path,
            element: Component,
        }
    }))
    return (
        <>
            {user.isAuth && toJS(user.user.role) === 'administrator' && adminAuthRoutes}
            {user.isAuth && toJS(user.user.role) === 'user' && userAuthRoutes}
            {unAuthedRoutes}
        </>
    );
};

export default AppRouter;
