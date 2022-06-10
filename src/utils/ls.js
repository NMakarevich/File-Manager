import { readdir } from 'fs/promises';
import * as path from "path";

function ls(directory) {
    return new Promise(async (resolve) => {
        const ls = await readdir(path.join(directory));
        console.log(`\x1b[1;32mFiles in directory ${directory}:\x1b[0m`);
        resolve(ls);
    })
}

export default ls;