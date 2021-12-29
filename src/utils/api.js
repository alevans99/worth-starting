import axios from "axios";

const tvMazeApi = axios.create({
    baseURL: ' https://api.tvmaze.com'
})


export const searchForShow = async (showName) => {
    let queries = {}
    queries['q'] = showName
    const searchResult = await tvMazeApi.get("/search/shows", {params: queries})
    return searchResult
}