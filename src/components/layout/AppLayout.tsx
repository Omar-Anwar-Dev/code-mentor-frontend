import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ToastContainer } from '@/components/ui/Toast';
import { useAppSelector } from '@/app/hooks';

export const AppLayout: React.FC = () => {
    const { sidebarCollapsed } = useAppSelector((state) => state.ui);

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-dark-bg transition-colors duration-300">
            <Sidebar />
            <div
                className={`
          transition-all duration-300
          ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}
            >
                <Header />
                <main className="p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
            <ToastContainer />
        </div>
    );
};
