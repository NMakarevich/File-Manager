import { readdir } from 'fs/promises';
import * as path from "path";

async function ls(directory) {
    const ls = await readdir(path.join(directory));
    console.log(ls);
}

export default ls;