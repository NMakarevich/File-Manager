import { readdir } from 'fs/promises';
import * as path from "path";

async function ls(directory) {
    const ls = await readdir(path.join(directory));
    console.log(`\x1b[1;32mFiles in directory ${directory}:\n\x1b[0m`, ls);
}

export default ls;