import { createHash } from "crypto";
import { createReadStream } from "fs";
import { access } from "fs/promises"

async function calcHash(pathToFile) {
    try {
        await access(pathToFile);
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
    } catch {
        console.log('\x1b[1;31mOperation failed\x1b[0m');
    }
}

export default calcHash;