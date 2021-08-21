import express from 'express';
import { publicFolderPath } from "./lib/fs-tool.js"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import {
    notFoundErrorHandler,
    badRequestErrorHandler,
    forbiddenErrorHandler,
    genericServerErrorHandler,
} from "./errorHandlers.js";
import Media from "./services/movies/index.js"
import Poster from "./services/poster/poster.js"



const server = express();
const whiteList = [process.env.DEV, process.env.PRO]
const corsOpts = {
    origin: function (origin, next) {
        console.log('ORIGIN --> ', origin)
        if (!origin || whiteList.indexOf(origin) !== -1) {
            next(null, true)
        } else {
            next(new Error(`Origin ${origin} not allowed!`))
        }

    }
}
server.use(express.static(publicFolderPath))
server.use(cors(corsOpts))
// server.use(cors())
server.use(express.json());
server.use("/media", Media);
server.use("/poster", Poster)
server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)

// const port = process.env.PORT
const port = 3005

server.listen(port, () => {
    console.log('server is running on port 3005');
})
console.table(listEndpoints(server))
server.on("error", (error) => { console.log(error) })