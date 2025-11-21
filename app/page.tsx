import { Suspense } from 'react';
import ClientHome from '@/components/user/ClientHome';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="p-4">Yuklanmoqda...</div>}>
        <ClientHome />
      </Suspense>
    </main>
  );
}
