'use server'

import { CreateUserParams, RegisterUserParams } from '@/types'
import {
    BUCKET_ID,
    DATABASE_ID,
    databases,
    ENDPOINT,
    PATIENT_COLLECTION_ID,
    PROJECT_ID,
    storage,
    tablesDB,
    users,
} from '@/lib/appwrite.config'
import { ID, Query } from 'node-appwrite'
import { InputFile } from 'node-appwrite/file'
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

export const getPatient = async (userId: string) => {
    try {
        const res = await tablesDB.listRows(DATABASE_ID, PATIENT_COLLECTION_ID, [
            Query.equal("userId", userId),
            Query.limit(1),
        ]);
        return res.rows[0] ?? null;
    } catch (error) {
        console.error("getPatientByUserId error:", error);
        throw error;
    }
};

export const registerPatient = async ({
                                          identificationDocument,
                                          ...patient
                                      }: RegisterUserParams) => {
    try {
        let file: { $id: string } | undefined

        if (identificationDocument) {
            const blob = identificationDocument.get('blobFile') as Blob | null
            const fileName = identificationDocument.get('fileName') as string | null

            if (blob && fileName) {
                const inputFile = InputFile.fromBuffer(blob, fileName)
                file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
            }
        }

        const newPatient = await tablesDB.createRow(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID,
            ID.unique(),
            {
                identificationDocumentId: file?.$id ?? null,
                identificationDocumentUrl: file
                    ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
                    : null,
                ...patient,
            },
        )

        return parseStringify(newPatient)
    } catch (error) {
        console.error('registerPatient error:', error)
        throw error
    }
}