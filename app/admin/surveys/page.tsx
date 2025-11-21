import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function getSurveys() {
    return await prisma.surveyLink.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

async function addSurvey(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const koboUrl = formData.get('koboUrl') as string;

    await prisma.surveyLink.create({
        data: {
            title,
            koboUrl,
            pointsReward: 5, // Fixed as per requirement
        }
    });
    revalidatePath('/admin/surveys');
}

async function toggleStatus(id: string, currentStatus: boolean) {
    'use server';
    await prisma.surveyLink.update({
        where: { id },
        data: { isActive: !currentStatus }
    });
    revalidatePath('/admin/surveys');
}

export default async function SurveysPage() {
    const surveys = await getSurveys();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">So'rovnomalar (KoboToolbox)</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Survey Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">Yangi so'rovnoma qo'shish</h3>
                        <form action={addSurvey} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sarlavha</label>
                                <input type="text" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" placeholder="Masalan: Mahalla infratuzilmasi" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kobo Link</label>
                                <input type="url" name="koboUrl" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" placeholder="https://ee.kobotoolbox.org/..." />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                                Qo'shish
                            </button>
                        </form>
                    </div>
                </div>

                {/* Survey List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sarlavha</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {surveys.map((survey) => (
                                    <tr key={survey.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{survey.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 truncate max-w-xs">
                                            <a href={survey.koboUrl} target="_blank" rel="noopener noreferrer">{survey.koboUrl}</a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${survey.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {survey.isActive ? 'Aktiv' : 'Yopilgan'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <form action={toggleStatus.bind(null, survey.id, survey.isActive)}>
                                                <button className="text-indigo-600 hover:text-indigo-900">
                                                    {survey.isActive ? 'Yopish' : 'Ochish'}
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                                {surveys.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">So'rovnomalar yo'q</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
