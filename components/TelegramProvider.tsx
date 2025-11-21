'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
}

interface TelegramContextType {
    user: TelegramUser | null;
    isLoading: boolean;
}

const TelegramContext = createContext<TelegramContextType>({ user: null, isLoading: true });

export function TelegramProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if running in Telegram WebApp
        if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
            const tg = (window as any).Telegram.WebApp;
            tg.ready();

            if (tg.initDataUnsafe?.user) {
                setUser(tg.initDataUnsafe.user);
            } else {
                // Dev mode fallback
                console.log('Not in Telegram, using mock user');
                setUser({ id: 123456789, first_name: 'Test', last_name: 'User' });
            }
        }
        setIsLoading(false);
    }, []);

    return (
        <TelegramContext.Provider value={{ user, isLoading }}>
            {children}
        </TelegramContext.Provider>
    );
}

export const useTelegram = () => useContext(TelegramContext);
