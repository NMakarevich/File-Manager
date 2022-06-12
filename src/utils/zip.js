import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from "fs";
import path from 'path';
import { __dirname } from "../index.js";

function zip(operation, [pathToFile, pathToDestination]) {
    return new Promise((resolve) => {
        pathToFile = path.isAbsolute(pathToFile) ? pathToFile : path.join(__dirname, pathToFile);
        let fileName = pathToFile.split(path.sep).pop();
        fileName = fileName.endsWith('.br') ? fileName.slice(0, -3) : `${fileName}.br`;
        pathToDestination = path.isAbsolute(pathToDestination) ? pathToDestination : path.join(__dirname, pathToDestination);
        const rs = createReadStream(pathToFile, { flags: 'r' });
        rs.on('error', () => resolve('\x1b[1;31mOperation failed\x1b[0m\n'))
        const ws = createWriteStream(path.join(pathToDestination, fileName), { flags: 'wx' });
        ws.on('error', () => {
            resolve('\x1b[1;31mOperation failed\x1b[0m\n')
        })
        const zipOperation = operation === 'compress' ?
            createBrotliCompress() : operation === 'decompress' ?
                createBrotliDecompress() : null;
        if (zipOperation) {
            rs.pipe(zipOperation).pipe(ws);
            ws.on('finish', () => resolve())
        } else {
            resolve(`\x1b[1;31m${operation}: Operation failed\x1b[0m\n`);
        }
    })
}

export default zip;