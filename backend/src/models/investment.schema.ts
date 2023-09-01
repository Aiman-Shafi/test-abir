import { Schema, model } from "mongoose";
import { IInvestment } from "./investment.interface";

export const InvestmentSchema = new Schema<IInvestment>({
    investmentId: { type : String, required : true },
    userId: { type : String, required : true },
    companyId: { type : String, required : true },
    amount: { type : Number, required : true },
    shareCount: { type : Number, required : true }
}, {timestamps: true, _id: true})

export const Investment = model<IInvestment>('investments', InvestmentSchema)