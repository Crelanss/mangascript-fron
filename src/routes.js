import Admin from './pages/Admin'
import MyAccount from './pages/MyAccount'
import Orders from './pages/Orders'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import MangaPage from './pages/MangaPage'
import Auth from './pages/Auth'
import {
    ADMIN_ROUTE,
    CART_ROUTE, LOGIN_ROUTE,
    MANGA_ROUTE,
    MY_ACCOUNT_ROUTE, NOT_FOUND_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from './utils/consts'

export const userRoutes = [
    {
        path: MY_ACCOUNT_ROUTE,
        Component: <MyAccount/>
    },
    {
        path: ORDERS_ROUTE,
        Component: <Orders/>
    },
    // {
    //     path: NOT_FOUND_ROUTE,
    //     Component: <Shop/>
    // }

]
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },

    // {
    //     path: NOT_FOUND_ROUTE,
    //     Component: <Shop/>
    // }

]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <Shop/>
    },
    {
        path: CART_ROUTE,
        Component: <Cart/>
    },
    {
        path: MANGA_ROUTE + '/:name',
        Component: <MangaPage/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth/>
    },
    // {
    //     path: NOT_FOUND_ROUTE,
    //     Component: <Shop/>
    // }
]
