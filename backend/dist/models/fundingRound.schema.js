"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundingRound = void 0;
const mongoose_1 = require("mongoose");
const investment_schema_1 = require("./investment.schema");
const fundingRoundSchema = new mongoose_1.Schema({
    roundId: { type: String, unique: true, required: true },
    displayName: { type: String, default: 'seed' },
    companyId: { type: String, required: true },
    amountRaised: { type: Number, default: 0 },
    minimumInvestmentAmount: { type: Number, default: 100 },
    maximumInvestmentAmount: { type: Number, default: 25000 },
    fundingGoal: { type: Number, required: true },
    investments: { type: [investment_schema_1.InvestmentSchema], default: [] },
    deadline: { type: Date, required: true },
    discountPercentage: { type: Number, default: 5 }
});
exports.FundingRound = (0, mongoose_1.model)('funding_rounds', fundingRoundSchema);
