'use client';

import { useEffect, useState } from 'react';
import { useTelegram } from '@/components/TelegramProvider';
import RegistrationForm from './RegistrationForm';
import Dashboard from './Dashboard';
import { checkUser } from '@/actions/user';

export default function ClientHome() {
    const { user: tgUser, isLoading } = useTelegram();
    const [dbUser, setDbUser] = useState<any>(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            if (tgUser) {
                const user = await checkUser(tgUser.id);
                setDbUser(user);
            }
            setIsChecking(false);
        }

        if (!isLoading) {
            fetchUser();
        }
    }, [tgUser, isLoading]);

    if (isLoading || isChecking) {
        return <div className="flex items-center justify-center h-screen text-blue-600">Yuklanmoqda...</div>;
    }

    if (!tgUser) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-xl font-bold mb-2">Xush kelibsiz!</h1>
                <p className="text-gray-600">Iltimos, bu ilovani Telegram orqali oching.</p>
            </div>
        );
    }

    if (!dbUser) {
        return <RegistrationForm telegramId={tgUser.id} onRegister={(user) => setDbUser(user)} />;
    }

    return <Dashboard user={dbUser} />;
}
