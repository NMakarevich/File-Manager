import os from 'os';

function osUtil(param) {
    switch (param) {
        case 'architecture': {
            console.log(`\x1b[1;32mos ${param}: ${os.arch()}\x1b[0m`);
            break;
        }
        case 'cpus': {
            const cpus = os.cpus();
            console.table(cpus.map(({ speed, model }) => {
                const speedGHz = (speed / 1000).toFixed(2);
                return { model, speed: `${speedGHz}GHz`}
            }))
            break;
        }
        case 'EOL': {
            console.log(`\x1b[1;32mos ${param}: ${JSON.stringify(os.EOL)}\x1b[0m`);
            break;
        }
        case 'homedir': {
            console.log(`\x1b[1;32mos ${param}: ${os.homedir()}\x1b[0m`);
            break;
        }
        case 'username': {
            console.log(`\x1b[1;32mos ${param}: ${os.userInfo().username}\x1b[0m`);
            break;
        }
        default: {
            console.log(`\x1b[1;31mos ${param}: Operation failed\x1b[0m`);
        }
    }
}

export default osUtil;