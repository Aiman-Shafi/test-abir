"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const mongodb_provider_1 = __importDefault(require("./database/mongodb.provider"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// validate env config
for (const [key, value] of Object.entries(config_1.Config)) {
    if (!value) {
        console.error(`Missing environment variable for "${key}".`);
        process.exit(1);
    }
}
(0, mongodb_provider_1.default)()
    .then(db => {
    if (!db) {
        process.exit(1);
    }
    const app = (0, express_1.default)();
    const port = config_1.Config.PORT;
    app.use((0, morgan_1.default)('dev'));
    // Allow any method from any host and log requests
    app.use((0, cors_1.default)());
    // Handle POST requests that come in formatted as JSON
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // use routes defined in routes/index.ts
    app.use('/', routes_1.default);
    // start our server on specified port default: 24100
    app.listen(port, function () {
        console.log("Server now listening on " + port);
    });
})
    .catch(e => {
    console.error(e);
});
