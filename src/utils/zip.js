import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from "fs";

function zip(operation, [pathToFile, pathToDestination]) {
    const rs = createReadStream(pathToFile, { flags: 'r' });
    rs.on('error', () => console.log('Operation failed\n'))
    const ws = createWriteStream(pathToDestination, { flags: 'wx' });
    ws.on('error', () => {
        console.log('Operation failed\n')
    })
    const zipOperation = operation === 'compress' ?
        createBrotliCompress() : operation === 'decompress' ?
            createBrotliDecompress() : null;
    if (zipOperation) {
        rs.pipe(zipOperation).pipe(ws)
    } else {
        console.log('Operation failed\n');
    }
}

export default zip;