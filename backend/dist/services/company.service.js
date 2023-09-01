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
exports.updateCompany = exports.listCompanies = exports.getConnectedCompanies = exports.getCompanyById = exports.createCompany = void 0;
const company_schema_1 = require("../models/company.schema");
const user_schema_1 = require("../models/user.schema");
const idUtils_1 = require("../utils/idUtils");
const user_service_1 = require("./user.service");
const createCompany = (req, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const company = new company_schema_1.Company({
        companyId: (0, idUtils_1.generateCompanyId)(),
        name: req.name,
        logo: req.logo,
        bio: req.bio,
        partners: req.partners,
        industry: req.industry,
        website: req.website,
        valuation: req.valuation,
        minimumInvestment: req.minimumInvestment,
        sharePrice: req.sharePrice,
        sharesOutstanding: req.sharesOutstanding,
        location: req.location
    });
    // add logged-in userId to company partners
    if (!company.partners.includes(userId)) {
        company.partners.push(userId);
    }
    // add company Id to list of companies for the user
    const user = yield user_schema_1.User.findOne({ userId: userId }).exec();
    if (user) {
        user.companies.push(company.companyId);
        yield user.save();
    }
    return yield company.save();
});
exports.createCompany = createCompany;
const getCompanyById = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield company_schema_1.Company.findOne({ companyId: companyId }).exec();
});
exports.getCompanyById = getCompanyById;
const getConnectedCompanies = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const connectedUsers = yield (0, user_service_1.getConnectedUsers)(userId);
    const companyIDs = [];
    connectedUsers.forEach(user => {
        user.companies.forEach(companyId => {
            if (!companyIDs.includes(companyId)) {
                companyIDs.push(companyId);
            }
        });
    });
    var connectedCompanies = [];
    for (var i = 0; i < companyIDs.length; i++) {
        const company = yield company_schema_1.Company.findOne({ companyId: companyIDs[i] }).exec();
        if (company) {
            connectedCompanies.push(company);
        }
    }
    return connectedCompanies;
});
exports.getConnectedCompanies = getConnectedCompanies;
const listCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    const companies = yield company_schema_1.Company.find({}).exec();
    return companies;
});
exports.listCompanies = listCompanies;
const updateCompany = (company) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield company_schema_1.Company.findOne({ companyId: company.companyId });
    if (existing) {
        existing.name = company.name,
            existing.bio = company.bio,
            existing.logo = company.logo,
            existing.partners = company.partners,
            existing.industry = company.industry,
            existing.website = company.website,
            existing.valuation = company.valuation,
            existing.minimumInvestment = company.minimumInvestment,
            existing.sharePrice = company.sharePrice,
            existing.sharesOutstanding = company.sharesOutstanding,
            existing.location = company.location;
        yield existing.save();
        return true;
    }
    else {
        return false;
    }
});
exports.updateCompany = updateCompany;
