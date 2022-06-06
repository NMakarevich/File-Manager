import { createHash } from "crypto";
import { createReadStream, access } from "fs";

function calcHash(pathToFile) {
    let accessOk = false;
    access(pathToFile, (err) => {
        if (err) {
            console.log('Operation failed');
        } else accessOk = true;
    });
    if (!accessOk) return;
    const rs = createReadStream(pathToFile);
    const hash = createHash('sha256');
    rs.on('readable', () => {
        const data = rs.read();
        if (data) {
            hash.update(data);
        } else {
            console.log(hash.digest('hex'));
        }
    })
}

export default calcHash;