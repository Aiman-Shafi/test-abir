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
exports.provisionUserIfNotExists = exports.authenticatedUserId = exports.getAuth0UserId = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const user_schema_1 = require("../models/user.schema");
const getAuth0UserId = (req) => {
    const auth0Sub = req.headers['x-auth0-sub'];
    if (auth0Sub) {
        return auth0Sub;
    }
    return null;
};
exports.getAuth0UserId = getAuth0UserId;
const authenticatedUserId = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const auth0Sub = (0, exports.getAuth0UserId)(req);
    if (auth0Sub && auth0Sub.length > 0) {
        const url = `https://${config_1.Config.AUTH0_DOMAIN}/api/v2/users/${decodeURI(auth0Sub)}`;
        console.log(url);
        try {
            const response = yield axios_1.default.get(url, { headers: { authorization: req.headers.authorization } });
            if (response && response.status > 199 && response.status < 300 && response.data) {
                const auth0User = response.data;
                const userId = yield (0, exports.provisionUserIfNotExists)(auth0User);
                return userId;
            }
            else {
                return null;
            }
        }
        catch (e) {
            console.log(`Error in auth0Authenticate`);
            return null;
        }
    }
    else {
        return null;
    }
});
exports.authenticatedUserId = authenticatedUserId;
const provisionUserIfNotExists = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user || !user.user_id || !user.email) {
        return null;
    }
    const { email, name, nickname, picture, user_id } = user;
    const userId = encodeURIComponent(user_id);
    const existing = yield user_schema_1.User.findOne({ email: email }).exec();
    try {
        if (!existing) {
            const user = new user_schema_1.User({
                userId,
                email,
                legalName: name,
                bio: nickname,
                profilePic: picture,
                countryCode: '+1',
                fundsBalance: 0
            });
            yield user.save();
            return user.userId;
        }
        else {
            return existing.userId;
        }
    }
    catch (e) {
        console.log(`error provisioning user: ${e}`);
        return null;
    }
});
exports.provisionUserIfNotExists = provisionUserIfNotExists;
