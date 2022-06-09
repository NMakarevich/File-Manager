import * as path from "path";
import { access } from 'fs/promises';
import {__dirname} from "../index.js";

async function cd([pathToDirectory]) {
    try {
        if (path.isAbsolute(pathToDirectory)) {
            await access(pathToDirectory);
            return pathToDirectory;
        } else {
            const fullPath = path.join(__dirname, pathToDirectory);
            await access(fullPath);
            return fullPath;
        }
    } catch (err) {
        console.log('\x1b[1;31mOperation failed\x1b[0m');
        return __dirname;
    }
}

export default cd;