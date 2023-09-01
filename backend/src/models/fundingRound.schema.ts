import { Schema, model } from "mongoose";
import { InvestmentSchema } from "./investment.schema";
import { IFundingRound } from "./fundingRound.interface";

const fundingRoundSchema = new Schema<IFundingRound>({
    roundId: { type : String, unique : true, required: true },
    displayName: {type : String, default : 'seed' },
    companyId: { type : String, required: true },
    amountRaised: {type : Number, default: 0 },
    minimumInvestmentAmount: {type : Number, default: 100 },
    maximumInvestmentAmount: {type : Number, default: 25000 },
    fundingGoal: { type : Number, required: true },
    investments: {type : [InvestmentSchema], default : [] },
    deadline: {type : Date, required: true },
    discountPercentage: {type: Number, default: 5}
})
export const FundingRound = model<IFundingRound>('funding_rounds', fundingRoundSchema)