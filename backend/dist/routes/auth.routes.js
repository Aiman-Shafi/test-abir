"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* import { loginUserCheck, signupUser, generateToken } from '../services/auth.service';

THIS IS REMOVED AS THE LOGIC HAS MOCED TO AUTH0


 */
/* export async function postSignupRoute(req: Request, res: Response): Promise<void|Response> {
    if (!req.body || !req.body.email || !req.body.legalName || !req.body.pass || !req.body.phoneNumber) {
        return res.status(400).send("Expected: { email: string, legalName: string, phoneNumber: number, pass: string }");
    }

    // TODO: fields validation
    const { email, legalName, phoneNumber, pass } = req.body

    try {
        const user = await signupUser(email, legalName, phoneNumber, pass)
        if (!user) {
            res.status(500).send({error: 'Unable to create user account.'});
        }
        const token = await generateToken(user.userId, email)
        res.status(201).json({
            success: true,
            data: {
                user,
                token
            }
        })
    } catch (e) {
        console.error(`Unable to complete event post.\n${e}`);
    }
}

export async function loginRoute(req: Request, res: Response): Promise<void|Response> {
    if (!req.body || !req.body.email || !req.body.pass ) {
        console.log(req.body)
        return res.status(400).send("Expected: { email: string, pass: string }");
    }
    const {email, pass} = req.body
    const existingUser = await loginUserCheck(email, pass)
    if (!existingUser) {
        return res.status(400).send("Invalid user credentials")
    } else {
        const user = existingUser as IUser
        const token = await generateToken(user.userId, email)
        return res.status(200).send({
            success: true,
            data: {
                user,
                token
            }
        })
    }
} */ 
