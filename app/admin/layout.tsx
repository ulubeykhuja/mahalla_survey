import React from 'react';
import Link from 'next/link';
import { Users, FileText, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/users" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">
                        <Users className="w-5 h-5 mr-3" />
                        Foydalanuvchilar
                    </Link>
                    <Link href="/admin/surveys" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">
                        <FileText className="w-5 h-5 mr-3" />
                        So'rovnomalar
                    </Link>
                    <Link href="/admin/settings" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">
                        <Settings className="w-5 h-5 mr-3" />
                        Sozlamalar
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <button className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <LogOut className="w-5 h-5 mr-3" />
                        Chiqish
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
