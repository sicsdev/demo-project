'use client'
import React, { useState } from 'react'
import { UsersIcon } from '@heroicons/react/24/outline';
import QuickStart from '@/app/components/Dashboard/QuickStart';
import TopBar from '@/app/components/Common/Card/TopBar';
import ChatBots from '@/app/components/Dashboard/ChatBots';

const Page = () => {
    return (
        <div style={{ whiteSpace: "normal" }}>
            <TopBar title={`Home`} icon={<UsersIcon className="h-5 w-5 text-primary" />} />
            <QuickStart />
        </div>
    );
}

export default Page