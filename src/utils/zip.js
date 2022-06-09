import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from "fs";

function zip(operation, [pathToFile, pathToDestination]) {
    const rs = createReadStream(pathToFile, { flags: 'r' });
    rs.on('error', () => console.log('Operation failed\n'))
    const ws = createWriteStream(pathToDestination, { flags: 'wx' });
    ws.on('error', () => {
        console.log('\x1b[1;31mOperation failed\x1b[0m\n')
    })
    const zipOperation = operation === 'compress' ?
        createBrotliCompress() : operation === 'decompress' ?
            createBrotliDecompress() : null;
    if (zipOperation) {
        rs.pipe(zipOperation).pipe(ws)
    } else {
        console.log(`\x1b[1;31m${operation}: Operation failed\x1b[0m\n`);
    }
}

export default zip;