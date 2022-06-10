import { stdin, stdout, argv } from 'process';
import { homedir } from 'os';
import { createInterface } from "readline";

import * as fo from './utils/fo.js'
import osUtil from './utils/os.js'
import ls from "./utils/ls.js";
import cd from "./utils/cd.js";
import calcHash from "./utils/hash.js";
import zip from "./utils/zip.js";
import hash from "./utils/hash.js";
import up from "./utils/up.js";

const args = argv[2];
export let __dirname = homedir();

function run(args) {
    if (!args) {
        console.log('Please enter user name (--username=your_name)');
        return;
    }
    const param = args.slice(2).split('=');
    const [key, username] = param;
    if (key === 'username') {
        console.log(`\x1b[37;42mWelcome to the File Manager, ${username}!\x1b[0m`);
        console.log(`\x1b[4mYou are currently in ${__dirname}\x1b[0m`);
    } else {
        console.log('Please enter user name (--username=your_name)');
        return;
    }
    const rl = createInterface({input: stdin, output: stdout});
    rl.on("line", async (line) => {
        const [command, ...params] = line.split(' ');
        let promise;
        switch (command) {
            case '.exit': {
                rl.close();
                break;
            }
            case 'cat': {
                promise = fo.cat(params)
                break;
            }
            case 'add': {
                promise = fo.add(params);
                break;
            }
            case 'rn': {
                promise = fo.rn(params)
                break;
            }
            case 'cp': {
                promise = fo.cp(params);
                break;
            }
            case 'mv': {
                promise = fo.mv(params)
                break;
            }
            case 'rm': {
                promise = fo.remove(params);
                break;
            }
            case 'up': {
                __dirname = up();
                promise = new Promise((resolve) => resolve());
                break;
            }
            case 'ls': {
                promise = ls(__dirname);
                break;
            }
            case 'cd': {
                __dirname = await cd(params);
                promise = new Promise((resolve) => resolve());
                break;
            }
            case 'os': {
                promise = osUtil(params);
                break;
            }
            case 'hash': {
                promise = calcHash(params)
                break;
            }
            case 'compress': {
                promise = zip('compress', params);
                break;
            }
            case 'decompress': {
                promise = zip('decompress', params);
                break;
            }
            default: {
                console.log('\x1b[1;31mInvalid input\x1b[0m')
            }
        }

        promise.then(result => {
            if (result) {
                if (params[0] === '--cpus') console.table(result);
                else console.log(result);
            }
            console.log(`\x1b[4mYou are currently in ${__dirname}\x1b[0m`);
        })
    })
    rl.on('close', () => console.log(`\x1b[37;42mThank you for using File Manager, ${username}!\x1b[0m`))
}

run(args)