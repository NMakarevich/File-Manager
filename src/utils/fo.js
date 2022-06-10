import { createReadStream, createWriteStream, rename, rm } from "fs";
import path from "path";
import { __dirname } from "../index.js";

export function cat([pathToFile]) {
    return new Promise((resolve) => {
        pathToFile = path.isAbsolute(pathToFile) ? pathToFile : path.join(__dirname, pathToFile)
        const rs = createReadStream(pathToFile, { flags: 'r' });
        rs.on("data", data => {
            resolve(`\x1b[1;32m${data.toString()}\x1b[0m`);
        })
        rs.on('error', () => {
            resolve('\x1b[1;31m cat: Operation failed\x1b[0m');
        })
    })
}

export function add([pathToFile]) {
    return new Promise((resolve) => {
        pathToFile = path.isAbsolute(pathToFile) ? pathToFile : path.join(__dirname, pathToFile);
        const ws = createWriteStream(pathToFile, { flags: 'wx'});
        ws.on('error', () => resolve('\x1b[1;31madd: Operation failed\x1b[0m'));
        ws.on('close', () => resolve())
        ws.close();
    })
}

export function rn([pathToFile, newFileName]) {
    return new Promise((resolve) => {
        pathToFile = path.isAbsolute(pathToFile) ? pathToFile : path.join(__dirname, pathToFile);
        const pathToDirectory = pathToFile.slice(0, pathToFile.lastIndexOf(path.sep));
        rename(pathToFile, path.join(pathToDirectory, newFileName), (err) => {
            if (err) {
                resolve('\x1b[1;31mrn: Operation failed\x1b[0m')
            } else resolve();
        })
    })
}

export function cp([pathToFile, pathToNewDirectory]) {
    return new Promise((resolve) => {
        pathToFile = path.isAbsolute(pathToFile) ? pathToFile : path.join(__dirname, pathToFile);
        pathToNewDirectory = path.isAbsolute(pathToNewDirectory) ? pathToNewDirectory : path.join(__dirname, pathToNewDirectory);
        const rs = createReadStream(pathToFile);
        rs.on("error", () => resolve('\x1b[1;31mcp: Operation failed\x1b[0m'));
        const fileName = pathToFile.slice(pathToFile.lastIndexOf(path.sep) + 1);
        const ws = createWriteStream(path.join(pathToNewDirectory, fileName));
        ws.on("error", () => resolve('\x1b[1;31mcp: Operation failed\x1b[0m'));
        rs.pipe(ws);
        rs.on('end', () => {
            ws.close();
            resolve();
        });
    })
}

export function remove([pathToFile]) {
    return new Promise((resolve) => {
        pathToFile = path.isAbsolute(pathToFile) ? pathToFile : path.join(__dirname, pathToFile);
        rm(pathToFile, (err) => {
            if (err) {
                resolve('\x1b[1;31mremove: Operation failed\x1b[0m')
            } else resolve();
        });
    })
}

export function mv([pathToFile, pathToNewDirectory]) {
    return new Promise((resolve) => {
        cp([pathToFile, pathToNewDirectory]).then((result) => {
            if (result) resolve(result);
            else resolve(remove([pathToFile]))
        })
    })
}