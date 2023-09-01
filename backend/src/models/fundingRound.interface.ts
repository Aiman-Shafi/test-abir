import { Document } from 'mongoose';
import { IInvestment } from './investment.interface';
export interface IFundingRound {
    roundId: string,
    displayName: string, // Series A, Seed, etc
    companyId: string,
    amountRaised: number,
    fundingGoal: number,
    minimumInvestmentAmount: number,
    maximumInvestmentAmount: number,
    investments: [IInvestment],
    deadline: Date,
    discountPercentage: number,
}
export interface IFundingRoundDoc extends IFundingRound, Document {}