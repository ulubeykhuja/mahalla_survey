import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function getUsers() {
    return await prisma.user.findMany({
        orderBy: { joinedAt: 'desc' },
        include: { transactions: true }
    });
}

async function addPoints(userId: string, amount: number) {
    'use server';
    await prisma.transaction.create({
        data: {
            userId,
            amount,
            type: 'MANUAL_AWARD',
            adminId: 'admin', // Hardcoded for MVP
        }
    });
    await prisma.user.update({
        where: { id: userId },
        data: { balance: { increment: amount } }
    });
    revalidatePath('/admin/users');
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Foydalanuvchilar</h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ism</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balans</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.telegramId.toString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.fullName || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{user.balance} ball</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <form action={addPoints.bind(null, user.id, 5)}>
                                        <button type="submit" className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md border border-green-200">
                                            +5 Ball berish
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
