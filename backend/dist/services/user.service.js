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
exports.updateUser = exports.addFollower = exports.getSuggestedUsers = exports.getConnectedUsers = exports.getUserById = void 0;
const user_schema_1 = require("../models/user.schema");
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_schema_1.User.findOne({ userId: userId }).exec();
});
exports.getUserById = getUserById;
const getConnectedUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // return friends and friends of friends
    const user = yield user_schema_1.User.findOne({ userId: userId }).exec();
    //if there is no user, return null (invalid credentials)
    if (!user) {
        return [];
    }
    var connections = [];
    const directlyConnectedUserIds = user.connections;
    const oneLevelSeparatedUserIds = [];
    var processedUserIds = [user.userId];
    // populate direct connections
    for (var i = 0; i < directlyConnectedUserIds.length; i++) {
        if (!processedUserIds.includes(directlyConnectedUserIds[i])) {
            processedUserIds.push(directlyConnectedUserIds[i]);
            const directlyConnectedUser = (yield user_schema_1.User.findOne({ userId: directlyConnectedUserIds[i] }).exec()) || user;
            if (directlyConnectedUser.userId != user.userId) {
                connections.push(directlyConnectedUser);
                oneLevelSeparatedUserIds.push(...directlyConnectedUser.connections);
            }
        }
    }
    // populate friends of friends
    for (var i = 0; i < oneLevelSeparatedUserIds.length; i++) {
        if (!processedUserIds.includes(oneLevelSeparatedUserIds[i])) {
            processedUserIds.push(oneLevelSeparatedUserIds[i]);
            const connectedUser = (yield user_schema_1.User.findOne({ userId: oneLevelSeparatedUserIds[i] }).exec()) || user;
            if (connectedUser.userId != user.userId) {
                connections.push(connectedUser);
            }
        }
    }
    return connections;
});
exports.getConnectedUsers = getConnectedUsers;
const getSuggestedUsers = (userCount, excludedUserIds) => __awaiter(void 0, void 0, void 0, function* () {
    const users = [];
    const cursor = user_schema_1.User.find().cursor();
    var count = 0;
    for (let userDoc = yield cursor.next(); userDoc != null && count < userCount; userDoc = yield cursor.next()) {
        if (!excludedUserIds || !excludedUserIds.includes(userDoc.userId)) {
            users.push(userDoc);
        }
    }
    return users;
});
exports.getSuggestedUsers = getSuggestedUsers;
// user1 gets added in user2's followers. User 2 gets added in user1's connections
const addFollower = (userId1, userId2) => __awaiter(void 0, void 0, void 0, function* () {
    const user1 = yield user_schema_1.User.findOne({ userId: userId1 }).exec();
    const user2 = yield user_schema_1.User.findOne({ userId: userId2 }).exec();
    if (user1 != null && user2 != null) {
        if (!user1.connections.includes(userId2)) {
            user1.connections.push(userId2);
            yield user1.save();
        }
        if (!user2.followers.includes(userId1)) {
            user2.followers.push(userId1);
            yield user2.save();
        }
        return true;
    }
    else {
        return false;
    }
});
exports.addFollower = addFollower;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield user_schema_1.User.findOne({ userId: user.userId }).exec();
    if (existing != null) {
        existing.legalName = user.legalName;
        existing.bio = user.bio;
        existing.email = user.email;
        existing.profilePic = user.profilePic;
        existing.phoneNumber = user.phoneNumber;
        existing.companies = user.companies;
        existing.connections = user.connections;
        existing.investments = user.investments;
        yield existing.save();
        return true;
    }
    else {
        return false;
    }
});
exports.updateUser = updateUser;
