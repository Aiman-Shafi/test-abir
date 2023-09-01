export interface IInvestment {
    investmentId: string,
    userId: string, // nanoid
    companyId: string, // nanoid
    amount: number,
    shareCount: number
}