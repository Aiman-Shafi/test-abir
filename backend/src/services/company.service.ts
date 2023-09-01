import { ICompany } from "../models/company.interface"
import { Company } from "../models/company.schema"
import { User } from "../models/user.schema"
import { generateCompanyId } from "../utils/idUtils"
import { CreateCompanyRequest } from "../utils/routeUtils"
import { getConnectedUsers } from "./user.service"

export const createCompany = async (req: CreateCompanyRequest, userId: string) : Promise<ICompany | null> => {
    const company = new Company({
        companyId: generateCompanyId(),
        name: req.name, 
        logo: req.logo, 
        bio: req.bio, 
        partners: req.partners, 
        industry: req.industry, 
        website: req.website, 
        valuation:req.valuation, 
        minimumInvestment: req.minimumInvestment, 
        sharePrice: req.sharePrice, 
        sharesOutstanding: req.sharesOutstanding, 
        location: req.location
    })

    // add logged-in userId to company partners
    if (!company.partners.includes(userId)) {
        company.partners.push(userId)
    }

    // add company Id to list of companies for the user
    const user = await User.findOne({userId: userId}).exec()
    if (user) {
        user.companies.push(company.companyId)
        await user.save()
    }
    return await company.save()
}

export const getCompanyById = async (companyId : string): Promise<ICompany | null> => {
    return await Company.findOne({companyId: companyId}).exec()
}

export const getConnectedCompanies = async (userId : string): Promise<ICompany[]> => {
    const connectedUsers = await getConnectedUsers(userId)
    const companyIDs : string[] = []
    connectedUsers.forEach( user => {
        user.companies.forEach( companyId => {
            if (!companyIDs.includes(companyId)) {
                companyIDs.push(companyId)
            }
        })
    })
    var connectedCompanies : ICompany[] = []
    for (var i=0; i<companyIDs.length; i++) {
        const company = await Company.findOne({companyId: companyIDs[i]}).exec()
        if (company) {
            connectedCompanies.push(company)
        }
    }
    return connectedCompanies
}

export const listCompanies = async (): Promise<ICompany[]> => {
    const companies = await Company.find({}).exec()
    return companies
}

export const updateCompany = async (company : ICompany): Promise<boolean> => {
    const existing = await Company.findOne({companyId: company.companyId})
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
        existing.location = company.location
        await existing.save()
        return true
    } else {
        return false
    }
}