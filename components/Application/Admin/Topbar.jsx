'use client';

import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { RiMenu4Fill } from 'react-icons/ri';
import ThemeSwitch from './ThemeSwitch';
import UserDropdown from './UserDropdown';

const Topbar = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <div className="fixed top-0 left-0 md:left-[16rem] right-0 z-30 h-14 border-b bg-white dark:bg-card flex items-center justify-between md:px-8 px-5">
            <div className="flex items-center">
                <Button type="button" variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar} >
                    <RiMenu4Fill size={22} />
                </Button>
                
                {/* Placeholder for Search (to be added later) */}
            </div>

            <div className="flex items-center gap-2">
                <ThemeSwitch />
                <UserDropdown />
            </div>
        </div>
    );
};

export default Topbar;