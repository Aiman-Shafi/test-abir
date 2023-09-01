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
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUserRoute = exports.updateUserRoute = exports.getSuggestedUsersRoute = exports.getUserConnectionsRoute = exports.getUserRoute = exports.getLoggedInUserRoute = void 0;
const user_schema_1 = require("../models/user.schema");
const user_service_1 = require("../services/user.service");
const routeUtils_1 = require("../utils/routeUtils");
function getLoggedInUserRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield (0, routeUtils_1.authenticatedUserId)(req);
        if (!userId) {
            return res.status(401).send("Unauthorized request");
        }
        const user = yield (0, user_service_1.getUserById)(userId);
        if (!user) {
            return res.status(404).send("User does not exist");
        }
        return res.status(200).send(user);
    });
}
exports.getLoggedInUserRoute = getLoggedInUserRoute;
function getUserRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        const user = yield (0, user_service_1.getUserById)(userId);
        if (!user) {
            return res.status(404).send("User does not exist");
        }
        return res.status(200).send(user);
    });
}
exports.getUserRoute = getUserRoute;
function getUserConnectionsRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield (0, routeUtils_1.authenticatedUserId)(req);
        if (!userId) {
            return res.status(401).send("Unauthorized request");
        }
        const connectedUsers = yield (0, user_service_1.getConnectedUsers)(userId);
        return res.status(200).send(connectedUsers);
    });
}
exports.getUserConnectionsRoute = getUserConnectionsRoute;
function getSuggestedUsersRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const excludedUserIds = [];
        const userId = yield (0, routeUtils_1.authenticatedUserId)(req);
        try {
            if (userId && userId.length > 1) {
                excludedUserIds.push(userId);
                const users = yield (0, user_service_1.getConnectedUsers)(userId);
                users.forEach(user => {
                    excludedUserIds.push(user.userId);
                });
            }
            const suggestedUsers = yield (0, user_service_1.getSuggestedUsers)(10, excludedUserIds);
            return res.status(200).send(suggestedUsers);
        }
        catch (e) {
            return res.status(500).send(`Unable to process getSuggestedUsers request. ${e}`);
        }
    });
}
exports.getSuggestedUsersRoute = getSuggestedUsersRoute;
function updateUserRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield (0, routeUtils_1.authenticatedUserId)(req);
        if (!userId) {
            return res.status(401).send("Unauthorized request");
        }
        const { legalName, bio, email, profilePic, phoneNumber, companies, connections, investments, banner, education, location, occupation, followers } = req.body;
        const existingUser = yield (0, user_service_1.getUserById)(userId);
        const updatedUser = new user_schema_1.User({
            userId: existingUser === null || existingUser === void 0 ? void 0 : existingUser.userId,
            legalName: legalName || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.legalName),
            bio: bio || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.bio),
            email: email || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.email),
            profilePic: profilePic || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.profilePic),
            phoneNumber: phoneNumber || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.phoneNumber),
            companies: companies || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.companies),
            connections: connections || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.connections),
            investments: investments || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.investments),
            banner: banner || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.banner),
            education: education || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.education),
            location: location || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.location),
            occupation: occupation || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.occupation),
            followers: followers || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.followers)
        });
        const success = yield (0, user_service_1.updateUser)(updatedUser);
        if (!success) {
            return res.status(500).send("Error while updating user data");
        }
        else {
            return res.status(200).send(updatedUser);
        }
    });
}
exports.updateUserRoute = updateUserRoute;
function followUserRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const loggedInUserId = yield (0, routeUtils_1.authenticatedUserId)(req);
        if (!loggedInUserId) {
            return res.status(401).send("Unauthorized request");
        }
        if (!req.body.userId) {
            return res.status(404).send("UserId required to follow");
        }
        const userId1 = loggedInUserId;
        const userId2 = req.body.userId;
        if (userId1 == userId2) {
            return res.status(400).send("Users cannot follow themselves");
        }
        try {
            const success = yield (0, user_service_1.addFollower)(userId1, userId2);
            return res.status(200).send({ operation: "add connection", success: success });
        }
        catch (e) {
            return res.status(500).send(`Error following user. ${e}`);
        }
    });
}
exports.followUserRoute = followUserRoute;
