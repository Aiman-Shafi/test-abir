"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvestmentRoundId = exports.generateInvestmentId = exports.generateCompanyId = exports.generateUserId = exports.generateId = void 0;
const nanoid_1 = require("nanoid");
const generateId = (size, prefix) => {
    return prefix + (0, nanoid_1.nanoid)(size);
};
exports.generateId = generateId;
const generateUserId = () => {
    return (0, exports.generateId)(16, "AU_");
};
exports.generateUserId = generateUserId;
const generateCompanyId = () => {
    return (0, exports.generateId)(16, "CO_");
};
exports.generateCompanyId = generateCompanyId;
const generateInvestmentId = () => {
    return (0, exports.generateId)(16, "IN_");
};
exports.generateInvestmentId = generateInvestmentId;
const generateInvestmentRoundId = () => {
    return (0, exports.generateId)(16, "IR_");
};
exports.generateInvestmentRoundId = generateInvestmentRoundId;
