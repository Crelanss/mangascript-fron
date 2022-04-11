import {makeAutoObservable} from 'mobx'

export default class MangaStore {
    constructor() {
        this._mangas = []
        this._genres = []
        this._authors = []

        this._selectedGenre = {}
        this._selectedYear = ''
        this._selectedName = ''

        this._genreToPost = ''
        this._authorToPost = {
            last_name: '',
            first_name: ''
        }
        this._mangaToPost = {
            authorId: '',
            name: '',
            price: '',
            release_year: '',
            genres: [],
            img: null,
            description: '',
            in_stock: null,
        }

        this._mangaToEdit = {
            price: '',
            img: null,
            description: '',
            in_stock: false,
        }
        makeAutoObservable(this)
    }

    setGenres(genres) {
        this._genres = genres
    }

    setAuthors(authors) {
        this._authors = authors
    }

    setSelectedGenre(genre) {
        this._selectedGenre = genre
    }

    setSelectedYear(year) {
        this._selectedYear = year
    }

    setSelectedName(name) {
        this._selectedName = name
    }

    setMangas(mangas) {
        this._mangas = mangas
    }

    setMangaToPost(field, value) {
        this._mangaToPost[field] = value
    }

    setMangaToPostToNull () {
        this._mangaToPost = {
            authorId: '',
            name: '',
            price: '',
            release_year: '',
            genres: [],
            img: null,
            description: '',
            in_stock: false,}
    }

    setMangaToEdit(field, value) {
        this._mangaToEdit[field] = value
    }

    setGenreToPost(genre) {
        this._genreToPost = genre
    }

    setAuthorToPost(field, value) {
        this._authorToPost[field] = value
    }

    get mangas() {
        return this._mangas
    }

    get genres() {
        return this._genres
    }

    get authors() {
        return this._authors
    }

    get selectedGenre() {
        return this._selectedGenre
    }

    get selectedYear() {
        return this._selectedYear
    }

    get selectedName() {
        return this._selectedName
    }

    get genreToPost() {
        return this._genreToPost
    }

    get authorToPost() {
        return this._authorToPost
    }

    get mangaToPost() {
        return this._mangaToPost
    }

    get mangaToEdit() {
        return this._mangaToEdit
    }

}

