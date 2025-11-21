'use client';

import { useState, useEffect } from 'react';
import { getActiveSurveys } from '@/actions/user';
import { ExternalLink, History, Wallet } from 'lucide-react';

export default function Dashboard({ user }: { user: any }) {
    const [surveys, setSurveys] = useState<any[]>([]);

    useEffect(() => {
        getActiveSurveys().then(setSurveys);
    }, []);

    const progress = Math.min((user.balance / 50) * 100, 100);
    const isPayoutReady = user.balance >= 50;

    return (
        <div className="p-4 max-w-md mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Salom, {user.fullName}</h1>
                    <p className="text-sm text-gray-500">ID: {user.telegramId}</p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                    {user.balance} ball
                </div>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center mb-4">
                    <Wallet className="w-6 h-6 mr-2" />
                    <span className="font-medium">Sizning hisobingiz</span>
                </div>
                <div className="text-4xl font-bold mb-2">{user.balance * 1000} so'm</div>
                <p className="text-blue-100 text-sm mb-4">Minimal yechish: 50,000 so'm (50 ball)</p>

                {/* Progress Bar */}
                <div className="w-full bg-blue-800/30 rounded-full h-2 mb-2">
                    <div
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs text-blue-100">
                    <span>0</span>
                    <span>50 ball</span>
                </div>

                {isPayoutReady && (
                    <button className="mt-4 w-full bg-white text-blue-600 py-2 rounded-lg font-bold hover:bg-blue-50 transition">
                        Pulni yechib olish
                    </button>
                )}
            </div>

            {/* Active Surveys */}
            <div>
                <h2 className="text-lg font-bold mb-3 flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
                    Aktiv so'rovnomalar
                </h2>
                <div className="space-y-3">
                    {surveys.map((survey) => (
                        <a
                            key={survey.id}
                            href={survey.koboUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                        >
                            <h3 className="font-bold text-gray-900">{survey.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">Mukofot: {survey.pointsReward} ball</p>
                            <div className="mt-3 text-blue-600 text-sm font-medium flex items-center">
                                Boshlash &rarr;
                            </div>
                        </a>
                    ))}
                    {surveys.length === 0 && (
                        <p className="text-gray-500 text-center py-4 bg-white rounded-xl border border-dashed">
                            Hozircha so'rovnomalar yo'q
                        </p>
                    )}
                </div>
            </div>

            {/* History */}
            <div>
                <h2 className="text-lg font-bold mb-3 flex items-center">
                    <History className="w-5 h-5 mr-2 text-gray-600" />
                    Tarix
                </h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y">
                    {user.transactions.map((t: any) => (
                        <div key={t.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-900">
                                    {t.type === 'REGISTRATION' ? "Ro'yxatdan o'tish" :
                                        t.type === 'MANUAL_AWARD' ? "So'rovnoma uchun" : t.type}
                                </p>
                                <p className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className="text-green-600 font-bold">+{t.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
