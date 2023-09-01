import { nanoid } from "nanoid"
export const generateId = (size: number, prefix: string) : string => {
    return prefix + nanoid(size)
}

export const generateUserId = () : string => {
    return generateId(16, "AU_")
}

export const generateCompanyId = () : string => {
    return generateId(16, "CO_")
}

export const generateInvestmentId = () : string => {
    return generateId(16, "IN_")
}

export const generateInvestmentRoundId = () : string => {
    return generateId(16, "IR_")
}