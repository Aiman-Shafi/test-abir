import express, { Request, Response } from 'express';
import { createCompanyRoute, getCompanyRoute, getAllCompaniesRoute, getConnectedCompaniesRoute, updateCompanyRoute } from './company.routes';
import { addInvestmentRoute, createFundingRoundRoute, getFundingRoundRoute, updateFundingRoundRoute } from './investment.routes';
import { followUserRoute, getSuggestedUsersRoute, getUserConnectionsRoute, getUserRoute, getLoggedInUserRoute, updateUserRoute } from './user.routes';
const router = express.Router();

// health check route
router.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello World</h1> <hr> Express + TypeScript Server');
});

// auth related routes
/*
router.post('/signup', postSignupRoute)
router.post('/login', loginRoute)
*/

// user related routes
router.get('/user', getLoggedInUserRoute)
router.get('/user/:userId', getUserRoute)
router.get('/users/suggested', getSuggestedUsersRoute)
router.get('/users/connected', getUserConnectionsRoute)
router.put('/user', updateUserRoute)
router.post('/follow', followUserRoute)

// company related routes
router.get('/companies/all', getAllCompaniesRoute)
router.get('/companies/connected', getConnectedCompaniesRoute)
router.get('/company/:companyId', getCompanyRoute)
router.put('/company/:companyId', updateCompanyRoute)
router.post('/company', createCompanyRoute)

// investment related routes
router.get('/fundinground/:roundId', getFundingRoundRoute)
router.put('/fundinground/:roundId', updateFundingRoundRoute)
router.post('/fundinground', createFundingRoundRoute)
router.post('/investment', addInvestmentRoute)

export default router;