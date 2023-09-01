import { Document } from 'mongoose';
export interface ICompany {
    companyId: string, // nanoid
    name: string,
    logo: string, // base64 encoded string; TODO: use S3 urls
    banner: string,
    bio: string,
    shortBio: string,
    partners: [string], 
    industry: [string],
    website: string, // url
    valuation: number,
    minimumInvestment: number,
    sharePrice: number,
    sharesOutstanding: number,
    location: string,
    fundingRounds: [string] // array of roundIDs
}

export interface ICompanyDoc extends ICompany, Document {}