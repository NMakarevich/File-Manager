import { stdin, stdout, argv } from 'process';
import { homedir } from 'os';
import { createInterface } from "readline";
import * as path from "path";

import * as fo from './utils/fo.js'
import osUtil from './utils/os.js'
import ls from "./utils/ls.js";
import cd from "./utils/cd.js";
import calcHash from "./utils/hash.js";
import zip from "./utils/zip.js";
import hash from "./utils/hash.js";

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
    }
    const rl = createInterface({input: stdin, output: stdout});
    rl.on("line", async (line) => {
        const [command, ...params] = line.split(' ');
        let promise = null;
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
                fo.add(path.join(__dirname, ...params));
                break;
            }
            case 'rn': {
                fo.rn(params)
                break;
            }
            case 'cp': {
                await fo.cp(params);
                break;
            }
            case 'mv': {
                await fo.mv(params)
                break;
            }
            case 'rm': {
                fo.remove(params);
                break;
            }
            case 'up': {
                if (__dirname === path.parse(__dirname).root) break;
                __dirname = path.join(__dirname, '../');
                break;
            }
            case 'ls': {
                await ls(__dirname);
                break;
            }
            case 'cd': {
                __dirname = await cd(__dirname, params[0])
                break;
            }
            case 'os': {
                osUtil(params[0].slice(2));
                break;
            }
            case 'hash': {
                promise = calcHash(params[0])
                break;
            }
            case 'compress': {
                zip('compress', params);
                break;
            }
            case 'decompress': {
                zip('decompress', params);
                break;
            }
            default: {
                console.log('\x1b[1;31mInvalid input\x1b[0m')
            }
        }
        if (promise) {
            promise.then(result => {
                console.log(result)
                console.log(`\x1b[4mYou are currently in ${__dirname}\x1b[0m`);
            })
        } else {
            console.log(`\x1b[4mYou are currently in ${__dirname}\x1b[0m`);
        }
        promise = null;
    })
    rl.on('close', () => stdout.write(`\x1b[37;42mThank you for using File Manager, ${username}!\x1b[0m`))
}

run(args)