import os from 'os';

function osUtil(param) {
    switch (param) {
        case 'architecture': {
            console.log(`${param}: ${os.arch()}`);
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
            console.log(`${param}: ${JSON.stringify(os.EOL)}`);
            break;
        }
        case 'homedir': {
            console.log(`${param}: ${os.homedir()}`);
            break;
        }
        case 'username': {
            console.log(`${param}: ${os.userInfo().username}`);
            break;
        }
        default: {
            console.log('Invalid input');
        }
    }
}

export default osUtil;