'use client';

import { useState, useEffect } from 'react';
import { registerUser } from '@/actions/user';
import { getRegistrationFields } from '@/actions/settings'; // We need to create this

export default function RegistrationForm({ telegramId, onRegister }: { telegramId: number, onRegister: (user: any) => void }) {
    const [fields, setFields] = useState<any[]>([]);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    // Fetch fields on mount
    useEffect(() => {
        getRegistrationFields().then(setFields);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Extract standard fields
        const fullName = formData['fullName'] || '';
        const phone = formData['phone'] || '';

        // Everything else goes to JSON
        const otherDataObj: Record<string, string> = {};
        fields.forEach(field => {
            if (formData[field.id]) {
                otherDataObj[field.label] = formData[field.id];
            }
        });
        const otherData = JSON.stringify(otherDataObj);

        const res = await registerUser(telegramId, fullName, phone, otherData);

        if (res.success) {
            onRegister(res.user);
        } else {
            alert('Xatolik yuz berdi');
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-2 text-center">Ro'yxatdan o'tish</h1>
            <p className="text-gray-500 text-center mb-6">Tizimdan foydalanish uchun ma'lumotlaringizni kiriting. (+5 ball)</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ism Familiya</label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-3"
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Telefon raqam</label>
                    <input
                        type="tel"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-3"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                {/* Dynamic fields */}
                {fields.filter(field => {
                    // If no dependency, show it
                    if (!field.dependsOnFieldId) return true;

                    // If dependency exists, check if parent value matches
                    const parentValue = formData[field.dependsOnFieldId];
                    return parentValue === field.dependsOnValue;
                }).map((field) => (
                    <div key={field.id}>
                        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                        {field.type === 'select' ? (
                            <select
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-3"
                                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                            >
                                <option value="">Tanlang...</option>
                                {field.options && JSON.parse(field.options).map((opt: string, idx: number) => (
                                    <option key={idx} value={opt}>{opt}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type === 'number' ? 'number' : 'text'}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-3"
                                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Saqlanmoqda...' : "Ro'yxatdan o'tish"}
                </button>
            </form>
        </div>
    );
}
