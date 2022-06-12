import os from 'os';

function osUtil([param]) {
    return new Promise((resolve) => {
        switch (param.slice(2)) {
            case 'architecture': {
                resolve(`\x1b[1;32mos ${param.slice(2)}: ${os.arch()}\x1b[0m`);
                break;
            }
            case 'cpus': {
                const cpus = os.cpus();
                resolve([`\x1b[1;32mos cpus total count: ${cpus.length}\x1b[0m`, cpus.map(({ speed, model }) => {
                    const speedGHz = (speed / 1000).toFixed(2);
                    return { model, speed: `${speedGHz}GHz`}
                })])
                break;
            }
            case 'EOL': {
                resolve(`\x1b[1;32mos ${param.slice(2)}: ${JSON.stringify(os.EOL)}\x1b[0m`);
                break;
            }
            case 'homedir': {
                resolve(`\x1b[1;32mos ${param.slice(2)}: ${os.homedir()}\x1b[0m`);
                break;
            }
            case 'username': {
                resolve(`\x1b[1;32mos ${param.slice(2)}: ${os.userInfo().username}\x1b[0m`);
                break;
            }
            default: {
                resolve(`\x1b[1;31mos ${param.slice(2)}: Operation failed\x1b[0m`);
            }
        }
    })
}

export default osUtil;