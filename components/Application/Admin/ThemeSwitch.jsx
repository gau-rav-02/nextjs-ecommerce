'use client';

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

const ThemeSwitch = () => {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="cursor-pointer">
                    <IoSunnyOutline className="block dark:hidden cursor-pointer" size={20} />
                    <IoMoonOutline className="hidden dark:block cursor-pointer" size={20} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-44 mr-2" align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeSwitch;