import express from 'express';
import multer from 'multer';
import { extname } from "path";
import { getMovies, writeMovies, saveBlogsPicture } from '../../lib/fs-tool.js';

const Poster = express.Router()

Poster.post("/:imdbID/poster", multer().single("posterPic"), async (req, res, next) => {
    try {
        console.log(req.file)
        const extension = extname(req.file.originalname)
        const fileName = `${req.params.imdbID}${extension}`
        const url = `http://localhost:3005/${fileName}`

        const movies = await getMovies()
        const findMovie = movies.find(m => m.imdbID === req.params.imdbID)
        findMovie.Poster = url
        const renamingMovie = movies.filter(m => m.imdbID !== req.params.imdbID)
        renamingMovie.push(findMovie)
        await writeMovies(renamingMovie)
        saveBlogsPicture(fileName, req.file.buffer)
        // const newMovie = { ...req.body, imdbID: uniqid(), createdAt: new Date() }
        // movies.push(newMovie)
        // await writeMovies(movies)
        res.status(201).send({ imdbID: findMovie })
    } catch (error) {
        next(error);
    }
})




export default Poster



