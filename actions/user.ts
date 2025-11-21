'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function checkUser(telegramId: number) {
    const user = await prisma.user.findUnique({
        where: { telegramId: BigInt(telegramId) },
        include: { transactions: true }
    });

    // Convert BigInt to string for serialization
    if (user) {
        return {
            ...user,
            telegramId: user.telegramId.toString(),
            transactions: user.transactions.map(t => ({ ...t, telegramId: undefined }))
        };
    }
    return null;
}

export async function registerUser(telegramId: number, fullName: string, phone: string, registrationData: string) {
    // Check if already exists
    const existing = await prisma.user.findUnique({
        where: { telegramId: BigInt(telegramId) }
    });

    if (existing) return { success: false, error: 'User already exists' };

    // Create user and give 5 points
    const user = await prisma.user.create({
        data: {
            telegramId: BigInt(telegramId),
            fullName,
            phone,
            registrationData,
            balance: 5, // Auto bonus
            transactions: {
                create: {
                    amount: 5,
                    type: 'REGISTRATION',
                    adminId: 'SYSTEM'
                }
            }
        }
    });

    return { success: true, user: { ...user, telegramId: user.telegramId.toString() } };
}

export async function getActiveSurveys() {
    return await prisma.surveyLink.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
    });
}
