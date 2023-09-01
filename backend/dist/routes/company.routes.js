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
exports.createCompanyRoute = exports.updateCompanyRoute = exports.getConnectedCompaniesRoute = exports.getAllCompaniesRoute = exports.getCompanyRoute = void 0;
const company_schema_1 = require("../models/company.schema");
const company_service_1 = require("../services/company.service");
const user_service_1 = require("../services/user.service");
const routeUtils_1 = require("../utils/routeUtils");
function getCompanyRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { companyId } = req.params;
        const company = yield (0, company_service_1.getCompanyById)(companyId);
        if (!company) {
            return res.status(404).send("Company does not exist");
        }
        return res.status(200).send(company);
    });
}
exports.getCompanyRoute = getCompanyRoute;
function getAllCompaniesRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const companies = yield (0, company_service_1.listCompanies)();
            return res.status(200).send(companies);
        }
        catch (e) {
            return res.status(500).send(`Error processing getAllCompanies request ${e}`);
        }
    });
}
exports.getAllCompaniesRoute = getAllCompaniesRoute;
function getConnectedCompaniesRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // return connected companies for logged-in users
        const userId = yield (0, routeUtils_1.authenticatedUserId)(req);
        if (!userId) {
            return res.status(401).send("Unauthorized request");
        }
        const connectedCompanies = yield (0, company_service_1.getConnectedCompanies)(userId);
        return res.status(200).send(connectedCompanies);
    });
}
exports.getConnectedCompaniesRoute = getConnectedCompaniesRoute;
function updateCompanyRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield (0, routeUtils_1.authenticatedUserId)(req);
        if (!userId) {
            return res.status(401).send("Unauthorized request");
        }
        const { companyId } = req.params;
        const { name, logo, bio, partners, industry, website, valuation, minimumInvestment, sharePrice, sharesOutstanding, location, banner, shortBio } = req.body;
        const existingUser = yield (0, user_service_1.getUserById)(userId);
        if (!(existingUser === null || existingUser === void 0 ? void 0 : existingUser.companies.includes(companyId))) {
            return res.status(401).send("User doesn't have permission to edit this company");
        }
        const existingCompany = yield (0, company_service_1.getCompanyById)(companyId);
        const updatedCompany = new company_schema_1.Company({
            companyId: existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.companyId,
            name: name || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.name),
            bio: bio || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.bio),
            logo: logo || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.logo),
            partners: partners || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.partners),
            industry: industry || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.industry),
            website: website || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.website),
            valuation: valuation || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.valuation),
            minimumInvestment: minimumInvestment || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.minimumInvestment),
            sharePrice: sharePrice || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.sharePrice),
            sharesOutstanding: sharesOutstanding || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.sharesOutstanding),
            location: location || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.location),
            banner: banner || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.banner),
            shortBio: shortBio || (existingCompany === null || existingCompany === void 0 ? void 0 : existingCompany.shortBio)
        });
        const success = yield (0, company_service_1.updateCompany)(updatedCompany);
        if (!success) {
            return res.status(500).send("Error while updating company data");
        }
        else {
            return res.status(200).send(updatedCompany);
        }
    });
}
exports.updateCompanyRoute = updateCompanyRoute;
function createCompanyRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield (0, routeUtils_1.authenticatedUserId)(req);
        if (!userId) {
            return res.status(401).send("Unauthorized request");
        }
        const createCompanyRequest = req.body;
        if (!createCompanyRequest) {
            return res.status(500).send("Invalid format for creating company");
        }
        const loggedInUserId = userId;
        const company = yield (0, company_service_1.createCompany)(createCompanyRequest, loggedInUserId);
        if (!company) {
            return res.status(500).send("Error while creating company");
        }
        else {
            return res.status(200).send(company);
        }
    });
}
exports.createCompanyRoute = createCompanyRoute;
