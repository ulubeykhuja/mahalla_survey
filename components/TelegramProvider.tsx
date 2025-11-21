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

            // Debug logging
            console.log('Telegram WebApp detected');
            console.log('initData:', tg.initData);
            console.log('initDataUnsafe:', tg.initDataUnsafe);
            console.log('User:', tg.initDataUnsafe?.user);

            if (tg.initDataUnsafe?.user) {
                console.log('Setting user from Telegram:', tg.initDataUnsafe.user);
                setUser(tg.initDataUnsafe.user);
            } else {
                console.log('No user data from Telegram');
            }
        } else {
            console.log('Telegram WebApp not detected');
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
