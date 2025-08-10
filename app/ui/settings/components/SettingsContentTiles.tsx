'use client';

import { IconChevronCompactRight } from '@tabler/icons-react'
import React from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';

function SettingsContentTiles({
    title,
    icon,
    buttonRoutes,
}: {
    title: string,
    icon: React.JSX.Element,
    buttonRoutes: {
        title: string,
        route: string,
    }[]
}) {
    return (
        <div className='w-full h-fit bg-white dark:bg-[var(--main-bg-primary-dark)] rounded-[12px] flex flex-col px-3 py-4 gap-2'>

            {/** title */}
            <div className='w-full gap-2 flex items-center'>
                <React.Fragment>{icon}</React.Fragment>
                <span className='text-[.8rem]'>{title}</span>
            </div>
            {/** routes */}
            {buttonRoutes.map((r, i) => <Link key={i} href={r.route}>
                <motion.div className='flex items-center w-full justify-between pl-10 h-[2rem] rounded-[4px] bg-[var(--main-bg-primary)] dark:bg-[var(--main-bg-primary-dark)] hover:bg-gray-300/20 dark:hover:bg-gray-400/20'>
                    <span className='text-gray-400'>{r.title} </span>
                    <IconChevronCompactRight size={20} className='stroke-gray-400' />
                </motion.div>
            </Link>
            )}
        </div>
    )
}

export default SettingsContentTiles
