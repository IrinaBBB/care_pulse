'use server'

import { CreateUserParams } from '@/types'
import { users } from '@/lib/appwrite.config'
import { ID, Query } from 'node-appwrite'
import { parseStringify } from '@/lib/utils'

export const createUser = async (user: CreateUserParams) => {
    try {
        return await users.create(ID.unique(), user.email, user.phone, undefined)

    } catch (error: any) {
        if (error && error?.code === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email]),
            ])

            return documents?.users[0]
        }
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error) {
        console.log(error)
    }
}