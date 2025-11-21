'use server';

import prisma from '@/lib/prisma';

export async function getRegistrationFields() {
    return await prisma.registrationField.findMany({
        orderBy: { order: 'asc' }
    });
}
