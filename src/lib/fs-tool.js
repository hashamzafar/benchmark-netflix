import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs

const moviesJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/movies.json")


export const getMovies = () => readJSON(moviesJSONPath)
export const writeMovies = content => writeJSON(moviesJSONPath, content)

export const publicFolderPath = join(process.cwd(), "public")
console.log(publicFolderPath)
export const saveBlogsPicture = (filename, contentAsBuffer) => writeFile(join(publicFolderPath, filename), contentAsBuffer)