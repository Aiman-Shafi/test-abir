import { Request } from 'express';
import axios from 'axios';
import { Config } from "../config"
import { User } from '../models/user.schema';

export const getAuth0UserId = (req: Request): string | null=> {
    const auth0Sub = req.headers['x-auth0-sub'] as string
    if (auth0Sub) {
        return auth0Sub
    }
    return null
}

export const authenticatedUserId = async (req : Request) : Promise<string | null> => {
    const auth0Sub = getAuth0UserId(req)
    if (auth0Sub && auth0Sub.length > 0) {
        const url = `https://${Config.AUTH0_DOMAIN}/api/v2/users/${decodeURI(auth0Sub)}`
        console.log(url)
        try {
            const response = await axios.get(url, {headers: {authorization: req.headers.authorization}})
            if (response && response.status > 199 && response.status < 300 && response.data) {
                const auth0User = response.data as Auth0User
                const userId = await provisionUserIfNotExists(auth0User)
                return userId
            } else {
                return null
            }
        } catch (e) {
            console.log(`Error in auth0Authenticate`)
            return null
        }
    } else {
        return null
    }
}

export const provisionUserIfNotExists = async (user: Auth0User) : Promise<string | null> => {
    if (!user || !user.user_id || !user.email) {
        return null
    }
    const {email, name, nickname, picture, user_id} = user
    const userId = encodeURIComponent(user_id)
    const existing = await User.findOne({ email: email }).exec()
    try {
        if (!existing) {
            const user = new User({
                userId,
                email,
                legalName: name,
                bio: nickname,
                profilePic: picture,
                countryCode: '+1',
                fundsBalance: 0
            })
            await user.save()
            return user.userId;
        } else {
            return existing.userId
        }
    } catch (e) {
        console.log(`error provisioning user: ${e}`)
        return null
    }
}

export type CreateCompanyRequest = {
    name: string, 
    logo: string, 
    bio: string, 
    partners: string[], 
    industry: string[], 
    website: string, 
    valuation: number, 
    minimumInvestment: number, 
    sharePrice: number, 
    sharesOutstanding: number, 
    location: string
}

export type Auth0User = {
    email: string,
    name: string,
    nickname: string,
    picture: string,
    user_id: string
}