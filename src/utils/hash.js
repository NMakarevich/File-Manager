import { createHash } from "crypto";
import { createReadStream } from "fs";
import { access } from "fs/promises"

async function calcHash(pathToFile) {
    try {
        await access(pathToFile);
        return new Promise((resolve) => {
            const hash = createHash("sha256");
            const rs = createReadStream(pathToFile);
            rs.on("data", (data) => hash.update(data));
            rs.on("end", () => resolve(hash.digest("hex")));
        });
    } catch {
        console.log('\x1b[1;31mOperation failed\x1b[0m');
    }
}

export default calcHash;