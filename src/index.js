import { stdin, stdout, argv } from 'process';
import { homedir } from 'os';
import { createInterface } from "readline";
import * as path from "path";

import osUtil from './utils/os.js'
import ls from "./utils/ls.js";
import cd from "./utils/cd.js";
import calcHash from "./utils/hash.js";

const args = argv[2];
let __dirname = homedir();

function run(args) {
    if (!args) {
        stdout.write('Please enter user name (--username=your_name)');
        return;
    }
    const param = args.slice(2).split('=');
    const [key, username] = param;
    if (key === 'username') {
        stdout.write(`Welcome to the File Manager, ${username}!\n`);
        stdout.write(`You are currently in ${__dirname}\n`);
    } else {
        stdout.write('Please enter user name (--username=your_name)');
    }
    const rl = createInterface({input: stdin, output: stdout});
    rl.on("line", async (line) => {
        const [command, ...params] = line.split(' ');
        switch (command) {
            case '.exit': {
                rl.close();
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
                await calcHash(params[0]);
                break;
            }
            default: {
                console.log('Invalid input')
            }
        }
        stdout.write(`You are currently in ${__dirname}\n`);
    })
    rl.on('close', () => stdout.write(`Thank you for using File Manager, ${username}!`))
}

run(args)