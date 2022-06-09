import path from "path";
import { __dirname } from "../index.js";

function up() {
    return __dirname === path.parse(__dirname).root ? __dirname : path.join(__dirname, '../');
}

export default up;