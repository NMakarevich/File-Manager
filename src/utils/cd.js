import * as path from "path";
import { access } from 'fs/promises';
import {__dirname} from "../index.js";

async function cd([pathToDirectory]) {
    try {
        pathToDirectory = path.isAbsolute(pathToDirectory) ? pathToDirectory : path.join(__dirname, pathToDirectory);
        await access(pathToDirectory);
        return pathToDirectory;
    } catch (err) {
        console.log('\x1b[1;31mOperation failed\x1b[0m');
        return __dirname;
    }
}

export default cd;