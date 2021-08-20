import express from 'express';
import { getMovies, writeMovies } from '../../lib/fs-tool.js';
import uniqid from 'uniqid';
const Media = express.Router()


Media.get("/", async (req, res, next) => {
    try {
        const movies = await getMovies()
        if (req.query && req.query.titles) {
            const filteredMovies = movies.filter(m => m.title === req.query.title)
            res.send(filteredMovies)
        } else {
            res.send(movies)
        }


    } catch (error) {
        next(error);
    }
})

Media.get("/:imdbID", async (req, res, next) => {
    try {
        const movies = await getMovies()
        console.log(movies)
        const movie = movies.find(m => m.imdbID === req.params.imdbID)
        if (movie) {
            res.send(movie)
        } else {
            next(createHttpError(404, `movie with id ${req.params.imdbID} not found`))
        }
        res.send()
    } catch (error) {
        next(error);
    }
})
Media.post("/", async (req, res, next) => {
    try {
        const movies = await getMovies()
        const newMovie = { ...req.body, imdbID: uniqid(), createdAt: new Date() }
        movies.push(newMovie)
        await writeMovies(movies)
        res.status(201).send({ imdbID: newMovie.imdbID })
    } catch (error) {
        next(error);
    }
})

Media.put("/:imdbID", async (req, res, next) => {
    try {
        const movies = await getMovies()
        const remainingMovies = movies.filter(m => m.imdbID !== req.params.imdbID)
        const modifiedMovies = { ...req.body, imdbID: req.params.imdbID }
        remainingMovies.push(modifiedMovies)
        await writeMovies(remainingMovies)
        res.status(201).send({ imdbID: modifiedMovies.imdbID })
    } catch (error) {
        next(error);
    }
})
Media.delete("/:imdbID", async (req, res, next) => {
    try {
        const movies = await getMovies()
        const remainingMovies = movies.filter(m => m.imdbID !== req.params.imdbID)
        await writeMovies(remainingMovies)
        res.status(204).send({ imdbID: req.params.imdbID })
        res.send()
    } catch (error) {
        next(error);
    }
})



export default Media

