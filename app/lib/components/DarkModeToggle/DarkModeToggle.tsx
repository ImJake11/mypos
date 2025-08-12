'use client';

import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import React from 'react'
import { useTheme } from '../../utils/hooks/useTheme';

const DarkModeToggle = () => {

    const { toggleTheme, theme } = useTheme();

    const isDark = theme === "dark";

    return (
        <div className='w-[3.7rem] h-[2rem] dark:bg-[var(--main-bg-primary-dark)] rounded-full dark:border-gray-500 border-gray-300 bg-gray-100 border relative px-2 overflow-hidden transition-all duration-300 ease-in'>

            <IconSunFilled size={20} className={`fill-orange-400 absolute top-1/2 -translate-y-1/2 ${isDark ? "left-1" : "-left-5"} transition-all duration-300 ease-in`} />

            <div className={`w-[1.2rem] h-[1.2rem] bg-gray-300 dark:bg-gray-500 rounded-full absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in ${isDark ? "right-1.5 " : "right-7"}`}
                onClick={toggleTheme}
            />
            <IconMoonFilled size={20} className={`fill-gray-700 absolute top-1/2 -translate-y-1/2 ${isDark ? "-right-6" : "right-1"} transition-all duration-300 ease-in`} />
        </div>
    )
}

export default DarkModeToggle
