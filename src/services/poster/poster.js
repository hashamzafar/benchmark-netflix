import express from 'express';



const Poster = express.Router()

Poster.post("/:imdbID/poster", async (req, res, next) => {
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




export default Poster



