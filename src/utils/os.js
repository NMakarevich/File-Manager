import os from 'os';
import { stdout } from 'process';

function osUtil(param) {
    switch (param) {
        case 'architecture': {
            stdout.write(`${param}: ${os.arch()}\n`);
            break;
        }
        case 'cpus': {
            const cpus = os.cpus();
            console.table(cpus.map(({ speed, model }) => {
                const speedGHz = (speed / 1000).toFixed(2);
                return { model, speed: speedGHz}
            }))
            break;
        }
        case 'EOL': {
            stdout.write(`${param}: ${JSON.stringify(os.EOL)}\n`);
            break;
        }
        case 'homedir': {
            stdout.write(`${param}: ${os.homedir()}\n`);
            break;
        }
        case 'username': {
            stdout.write(`${param}: ${os.userInfo().username}\n`);
            break;
        }
        default: {
            stdout.write('Invalid input\n');
        }
    }
}

export default osUtil;