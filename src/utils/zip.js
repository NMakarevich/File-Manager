import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from "fs";
import path from 'path';
import { __dirname } from "../index.js";

function zip(operation, [pathToFile, pathToDestination]) {
    return new Promise((resolve) => {
        pathToFile = path.isAbsolute(pathToFile) ? pathToFile : path.join(__dirname, pathToFile);
        pathToDestination = path.isAbsolute(pathToDestination) ? pathToDestination : path.join(__dirname, pathToDestination);
        const rs = createReadStream(pathToFile, { flags: 'r' });
        rs.on('error', () => resolve('Operation failed\n'))
        const ws = createWriteStream(pathToDestination, { flags: 'wx' });
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