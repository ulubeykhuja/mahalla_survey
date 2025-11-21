import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function getFields() {
    return await prisma.registrationField.findMany({
        orderBy: { order: 'asc' }
    });
}

async function addField(formData: FormData) {
    'use server';
    const label = formData.get('label') as string;
    const type = formData.get('type') as string;
    const optionsRaw = formData.get('options') as string;

    let options = null;
    if (type === 'select' && optionsRaw) {
        // Split by comma and trim
        const optionsArray = optionsRaw.split(',').map(o => o.trim()).filter(o => o.length > 0);
        options = JSON.stringify(optionsArray);
    }

    const dependsOnFieldId = formData.get('dependsOnFieldId') as string || null;
    const dependsOnValue = formData.get('dependsOnValue') as string || null;

    await prisma.registrationField.create({
        data: {
            label,
            type,
            options,
            order: 0,
            dependsOnFieldId: dependsOnFieldId === "" ? null : dependsOnFieldId,
            dependsOnValue: dependsOnValue === "" ? null : dependsOnValue,
        }
    });
    revalidatePath('/admin/settings');
}

async function deleteField(id: string) {
    'use server';
    await prisma.registrationField.delete({ where: { id } });
    revalidatePath('/admin/settings');
}

export default async function SettingsPage() {
    const fields = await getFields();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Ro'yxatdan o'tish sozlamalari</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Field List */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Mavjud maydonlar</h3>
                    <ul className="space-y-3">
                        {fields.map((field) => (
                            <li key={field.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                                <div>
                                    <p className="font-medium">{field.label}</p>
                                    <p className="text-xs text-gray-500 uppercase">{field.type}</p>
                                    {field.options && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            {JSON.parse(field.options).join(', ')}
                                        </p>
                                    )}
                                </div>
                                <form action={deleteField.bind(null, field.id)}>
                                    <button className="text-red-500 hover:text-red-700 text-sm">O'chirish</button>
                                </form>
                            </li>
                        ))}
                        {fields.length === 0 && (
                            <p className="text-gray-500 italic">Hozircha maydonlar yo'q.</p>
                        )}
                    </ul>
                </div>

                {/* Add Field Form */}
                <div className="bg-white p-6 rounded-lg shadow h-fit">
                    <h3 className="text-lg font-semibold mb-4">Yangi maydon qo'shish</h3>
                    <form action={addField} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Savol matni (Label)</label>
                            <input type="text" name="label" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" placeholder="Masalan: Yashash manzilingiz" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Turi</label>
                            <select name="type" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2">
                                <option value="text">Matn (Text)</option>
                                <option value="number">Raqam (Number)</option>
                                <option value="select">Tanlov (Select)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Variantlar (faqat Tanlov uchun)</label>
                            <p className="text-xs text-gray-500 mb-1">Vergul bilan ajratib yozing</p>
                            <textarea
                                name="options"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                placeholder="Masalan: Toshkent, Samarqand, Buxoro"
                                rows={3}
                            ></textarea>
                        </div>

                        <div className="border-t pt-4 mt-4">
                            <h4 className="text-sm font-semibold mb-2 text-gray-900">Mantiqiy bog'liqlik (ixtiyoriy)</h4>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Qaysi savolga bog'liq?</label>
                                <select name="dependsOnFieldId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2">
                                    <option value="">Hech qaysi (Doim ko'rinsin)</option>
                                    {fields.map(f => (
                                        <option key={f.id} value={f.id}>{f.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm font-medium text-gray-700">Qaysi javob tanlanganda ko'rinsin?</label>
                                <input type="text" name="dependsOnValue" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" placeholder="Masalan: Toshkent" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                            Qo'shish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
