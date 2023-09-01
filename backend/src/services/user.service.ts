import { IUser } from "../models/user.interface";
import { User } from "../models/user.schema";

export const getUserById = async (userId : string): Promise<IUser | null> => {
    return await User.findOne({userId: encodeURIComponent(userId)}).exec()
}

export const getConnectedUsers = async ( userId: string): Promise<IUser[]> => {
    // return friends and friends of friends

    const user = await User.findOne({userId: encodeURIComponent(userId)}).exec()
    //if there is no user, return null (invalid credentials)
    if (!user) {
        return []
    }
    var connections : IUser[] = []
    
    const directlyConnectedUserIds : string[] = user.connections
    const oneLevelSeparatedUserIds : string[] = []
    var processedUserIds : string[] = [user.userId]

    // populate direct connections
    for (var i = 0; i < directlyConnectedUserIds.length; i++) {
        if (!processedUserIds.includes(directlyConnectedUserIds[i])) {
            processedUserIds.push(directlyConnectedUserIds[i])
            const directlyConnectedUser = await User.findOne({userId: directlyConnectedUserIds[i]}).exec() || user
            if (directlyConnectedUser.userId != user.userId) {
                connections.push(directlyConnectedUser)
                oneLevelSeparatedUserIds.push(...directlyConnectedUser.connections)
            }
        }
    }

    // populate friends of friends
    for (var i = 0; i < oneLevelSeparatedUserIds.length; i++) {
        if (!processedUserIds.includes(oneLevelSeparatedUserIds[i])) {
            processedUserIds.push(oneLevelSeparatedUserIds[i])
            const connectedUser = await User.findOne({userId: oneLevelSeparatedUserIds[i]}).exec() || user
            if (connectedUser.userId != user.userId) {
                connections.push(connectedUser)
            }
        }
    }
    return connections
}

export const getSuggestedUsers = async (userCount: number, excludedUserIds?: string[]): Promise<IUser[]> => {
    const users: IUser[] = []
    const cursor = User.find().cursor()
    var count = 0
    for (let userDoc = await cursor.next(); userDoc!=null && count<userCount; userDoc = await cursor.next()) {
        if (!excludedUserIds || !excludedUserIds.includes(userDoc.userId)) {
            users.push(userDoc)
        }
    }
    return users
}

// user1 gets added in user2's followers. User 2 gets added in user1's connections
export const addFollower = async (userId1 : string, userId2 : string) : Promise<boolean> => {
    const user1 = await User.findOne({userId: encodeURIComponent(userId1)}).exec()
    const user2 = await User.findOne({userId: encodeURIComponent(userId2)}).exec()
    if (user1 != null && user2 != null) {
        if (!user1.connections.includes(userId2)) {
            user1.connections.push(userId2)
            await user1.save()
        }
        if (!user2.followers.includes(userId1)) {
            user2.followers.push(userId1)
            await user2.save()
        }
        return true
    } else {
        return false
    }
}

export const updateUser = async (user : IUser) : Promise<boolean> => {
    const existing = await User.findOne({userId: encodeURIComponent(user.userId)}).exec()
    if (existing != null) {
        existing.legalName = user.legalName
        existing.bio = user.bio
        existing.email = user.email
        existing.profilePic = user.profilePic
        existing.phoneNumber = user.phoneNumber
        existing.companies = user.companies
        existing.connections = user.connections
        existing.investments = user.investments
        await existing.save()
        return true
    } else {
        return false
    }
}