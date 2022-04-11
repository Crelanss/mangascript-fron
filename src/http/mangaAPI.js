import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'

export const createGenre = async (name) => {
    const {data} = await $authHost.post('api/genre', {name})
    return data
}

export const fetchGenres = async () => {
    const {data} = await $host.get('api/genre')
    return data
}

export const createAuthor = async (first_name, last_name) => {
    const {data} = await $authHost.post('api/author', {first_name, last_name})
    return data
}

export const fetchAuthors = async () => {
    const {data} = await $host.get('api/author')
    return data
}

export const createManga = async (manga) => {
    const {data} = await $authHost.post('api/manga', manga)
    return data
}

export const editManga = async (manga, name) => {
    const {data} = await $authHost.put('api/manga/' + name, manga)
    return data
}

export const deleteManga = async (name) => {
    const {data} = await $authHost.delete('api/manga/' + name)
    return data
}

export const fetchManga = async () => {
    const {data} = await $host.get('api/manga')
    return data
}

export const fetchMangaWithGenres = async (genre) => {
    const {data} = await $host.get('api/manga' + '?' + 'genre=' + genre)
    return data
}

export const fetchMangaWithYear = async (release_year) => {
    const {data} = await $host.get('api/manga' + '?' + 'release_year=' + release_year * 1)
    return data
}

export const fetchOneManga = async (name) => {
    const {data} = await $host.get('api/manga/' + name)
    return data
}
