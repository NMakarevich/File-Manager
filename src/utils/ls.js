import { readdir } from 'fs/promises';
import * as path from "path";

async function ls(directory) {
    const ls = await readdir(path.join(directory));
    console.log(`Files in directory ${directory}:\n`, ls);
}

export default ls;