import { Request, Response } from 'express';
import { FundingRound } from '../models/fundingRound.schema';
import { addInvestment, createFundingRound, getFundingRound, updateFundingRound } from '../services/investment.service';
import { getUserById } from '../services/user.service';
import { authenticatedUserId } from '../utils/routeUtils';

export async function createFundingRoundRoute(req: Request, res: Response): Promise<void|Response> {
    try {
        const userId = await authenticatedUserId(req)
        if (!userId) {
            return res.status(401).send("Unauthorized request")
        }
        if (!req.body || !req.body.companyId || !req.body.displayName || !req.body.fundingGoal || !req.body.deadline) {
            return res.status(400).send("Expected: { companyId: string, displayName: string, fundingGoal: number, deadline: Date(epoch) }");
        }
        const {companyId, displayName, fundingGoal, deadline, minimumInvestmentAmount, maximumInvestmentAmount, discountPercentage} = req.body
        const user = await getUserById(userId)
        if (!user?.companies.includes(companyId)) {
            return res.status(401).send("Only company partners and founders can create a funding round")
        }
        const round = await createFundingRound(companyId, displayName, fundingGoal, deadline, minimumInvestmentAmount, maximumInvestmentAmount, discountPercentage)
        return res.status(200).send(round)

    } catch (e) {
        console.error(`Unable to complete createFundingRound request.\n ${e}`);
    }
}

export async function getFundingRoundRoute(req: Request, res: Response): Promise<void|Response> {
    try {
        const roundId = req.params.roundId
        const round = await getFundingRound(roundId)
        return res.status(200).send(round)
    } catch (e) {
        console.error(`Unable to complete getFundingRound request.\n ${e}`);
    }
}

export async function updateFundingRoundRoute(req: Request, res: Response): Promise<void|Response> {
    try {
        const userId = await authenticatedUserId(req)
        if (!userId) {
            return res.status(401).send("Unauthorized request")
        }
        if (!req.body || !req.body.roundId) {
            return res.status(400).send("Expected: { roundId: string }")
        }
        const user = await getUserById(userId)
        const roundId = req.params.roundId
        const round = await getFundingRound(roundId)
        if (!round) {
            return res.status(404).send("Funding round does not exist")
        }
        if (!user?.companies.includes(round.companyId)) {
            return res.status(401).send("Only company partners and founders can update a funding round")
        }
        const {displayName, fundingGoal, deadline, minimumInvestmentAmount, maximumInvestmentAmount, discountPercentage } = req.body
        const updatedRound = await updateFundingRound(roundId, displayName, fundingGoal, deadline, minimumInvestmentAmount, maximumInvestmentAmount, discountPercentage)
        return res.status(200).send(updatedRound)
    } catch (e) {
        console.error(`Unable to complete updateFundingRound request.\n ${e}`);
    }
}

export async function addInvestmentRoute(req: Request, res: Response): Promise<void|Response> {
    try {
        const userId = await authenticatedUserId(req)
        if (!userId) {
            return res.status(401).send("Unauthorized request")
        }
        if (!req.body || !req.body.roundId || !req.body.amount || !req.body.shareCount) {
            return res.status(400).send("Expected: { roundId: string, amount: number, shareCount: number }")
        }
        const {roundId, amount, shareCount} = req.body
        
        const round = await FundingRound.findOne({roundId : roundId}).exec()
        if (!round) {
            return res.status(404).send("Funding round does not found")
        }
        const investment = await addInvestment(roundId, userId, amount, shareCount)
        if (!investment) {
            return res.status(400).send("Unable to add investment. Verify funding round and ensure that the user has sufficient funds available.")
        }
        return res.status(200).send(investment)
    } catch (e) {
        console.error(`Unable to complete addInvestment request.\n ${e}`);
    }
}