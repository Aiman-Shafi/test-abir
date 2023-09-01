import { Document } from 'mongoose';
import { IInvestment } from './investment.interface';
export interface IUser {
    userId: string, // nanoid
    legalName: string,
    bio: string,
    email: string,
    secret: string,
    profilePic: string, // base64 encoded string; TODO: use S3 urls
    banner: string,
    occupation: string,
    education: string,
    location: string,
    countryCode: string, // + followed by 1, 2 or 3 digits
    phoneNumber: number,
    fundsBalance: number,
    companies: [string],
    connections: [string],
    followers: [string],
    pronouns: string,
    investments: [IInvestment],
    visibility: 'public' | 'network' | 'private'
}

export interface IUserDoc extends IUser, Document {}