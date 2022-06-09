import * as path from "path";
import { access } from 'fs/promises';

async function cd(currentDirectory, pathToDirectory) {
    const root = path.parse(currentDirectory).root.toLowerCase();
    try {
        if (pathToDirectory.startsWith(root)) {
            await access(pathToDirectory);
            return pathToDirectory;
        } else {
            const fullPath = path.join(currentDirectory, pathToDirectory.slice(1));
            await access(path.join(fullPath));
            return path.join(fullPath);
        }
    } catch (err) {
        console.log('\x1b[1;31mOperation failed\x1b[0m');
        return currentDirectory;
    }
}

export default cd;