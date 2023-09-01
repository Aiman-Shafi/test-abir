"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoOptions = {
    authSource: 'admin',
};
const MongoConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongo = yield mongoose_1.default.connect(config_1.Config.MONGODB_URI, mongoOptions);
        console.log(`mongodb connected successfully: ${mongo.connection.host}`);
        return mongo;
    }
    catch (e) {
        console.log(`mongodb unable to connect\n${e}`);
    }
});
exports.default = MongoConnection;
