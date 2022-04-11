import {makeAutoObservable} from 'mobx'

export default class CartStore {
    constructor() {
        this._mangas =[]
        makeAutoObservable(this)
    }

    setNewManga(id, quantity) {
        this._mangas.push({
            mangaId: id,
            quantity: quantity
        })
    }

    setNewMangaQuantity(id, quantity) {
        this._mangas.forEach(m => {
            if(m.mangaId === id) {
                m.quantity = quantity
            }
        })
    }

    deleteMangaFromCart(id) {
        this._mangas = this._mangas.filter(q => q.mangaId !== id)
    }

    setMangas(mangas) {
        this._mangas = mangas
    }

    clearCart() {
        this._mangas = []
    }

    get mangas() {
        return this._mangas
    }
}
