import { createReadStream, createWriteStream, rename, rm } from "fs";
import { copyFile } from 'fs/promises'
import * as path from "path";
import * as constants from "constants";

export function cat([pathToFile]) {
    const rs = createReadStream(pathToFile, { flags: 'r' });
    rs.on("data", data => {
        console.log(data.toString());
    })
    rs.on('error', () => {
        console.log('Operation failed');
    })
}

export function add(pathToFile) {
    const ws = createWriteStream(pathToFile, { flags: 'wx'});
    ws.on('error', () => console.log('\x1b[1;31madd: Operation failed\x1b[0m'));
    ws.close();
}

export function rn([pathToFile, newFileName]) {
    const pathToDirectory = pathToFile.slice(0, pathToFile.lastIndexOf('\\'));
    rename(pathToFile, path.join(pathToDirectory, newFileName), (err) => {
        if (err) {
            console.log('\x1b[1;31mrn: Operation failed\x1b[0m')
        }
    })
}

export async function cp([pathToFile, pathToNewDirectory]) {
    try {
        const fileName = pathToFile.slice(pathToFile.lastIndexOf('\\') + 1);
        await copyFile(pathToFile, path.join(pathToNewDirectory, fileName), constants.COPYFILE_EXCL);
    } catch {
        console.log('\x1b[1;31mcp: Operation failed\x1b[0m')
    }
}

export function remove([pathToFile]) {
    rm(pathToFile, (err) => {
        if (err) {
            console.log('\x1b[1;31mremove: Operation failed\x1b[0m')
        }
    });
}

export async function mv([pathToFile, pathToNewDirectory]) {
    cp([pathToFile, pathToNewDirectory]).then(() => {
        remove([pathToFile]);
    })
}