"use client";
import Modal from '@/app/Components/Modal/Modal';
import { useTasks } from '@/context/taskContext';
import React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
    const { isEditing } = useTasks();
    return (
        <div className="main-layout w-[80%] max-w-[60rem] bg-[#EDEDED] border-2 border-white rounded-[1.5rem] overflow-auto p-4">
            {isEditing && <Modal/>}
            {children}
        </div>
    );
}

export default MainLayout;
