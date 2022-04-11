import {makeAutoObservable} from 'mobx'

export default class OrdersStore {
    constructor() {
        this._userOrders = []
        makeAutoObservable(this)
    }

    get orders() {
        return this._userOrders
    }
}
